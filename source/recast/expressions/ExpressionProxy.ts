import type { EmptyRecord } from "@common/utility.types.ts";

import {
  type Child,
  type Children,
  PROXY_COPY,
  PROXY_PAYLOAD,
  type ProxyNode,
  type ProxyNodePayload,
} from "./types.ts";

export function isAttributesCall<T extends unknown>(
  args: unknown[],
): args is [T] {
  return args.length === 1 && !Array.isArray(args[0]);
}

export function isTemplateLiteralCall(
  args: unknown[],
): args is [TemplateStringsArray, Children[]] {
  return args.length > 0 && Array.isArray(args[0]) && "raw" in args[0];
}

export class ExpressionProxy<
  T extends ProxyNodePayload,
  Props extends Record<string, unknown> = Record<string, unknown>,
  Methods extends Record<string, any> = EmptyRecord,
> {
  proccessAttributes(
    payload: T,
    attrs: Props,
  ): Record<string, unknown> {
    return {
      ...payload.attributes,
      ...attrs,
    };
  }

  proccessTemplateLiteralCall(
    strings: TemplateStringsArray,
    values: unknown[],
  ): Children {
    const result: Children = [];

    for (let i = 0; i < values.length; i++) {
      const isEmpty = /^[\s\n\r]*$/.test(strings[i]);

      if (i === 0) {
        if (!isEmpty && strings[i] !== "") {
          result.push(strings[i]);
        }
      } else if (!isEmpty) {
        result.push(strings[i]);
      }

      const value = values[i];
      if (Array.isArray(value)) {
        // FIXME: check each element of array
        result.push(...value.flat());
      } else {
        result.push(value as Child);
      }
    }

    if (strings[values.length] !== "") {
      result.push(strings[values.length]);
    }

    return result;
  }

  proccessChildren(payload: T, children: Children) {
    return [
      ...payload.children,
      ...children,
    ];
  }

  proxyify(template: T): ProxyNode<T, Props, Methods> {
    const nodeProxy = function () {};
    (nodeProxy as any)[PROXY_PAYLOAD] = { ...template };
    (nodeProxy as any)[PROXY_COPY] = (
      fn: (payload: T) => T,
    ): ProxyNode<T, Props, Methods> => this.proxyify(fn(template));

    const handler = {
      apply: (
        targetFn: typeof nodeProxy,
        __: any,
        args: [Props] | [TemplateStringsArray, ...Children[]],
      ) => {
        const payload = (targetFn as any)[PROXY_PAYLOAD] as T;

        if (isAttributesCall<Props>(args)) {
          const attrs = this.proccessAttributes(payload, args[0]);
          const newPayload: T = {
            ...payload,
            attributes: attrs,
          };
          return this.proxyify(newPayload);
        }

        if (isTemplateLiteralCall(args)) {
          const [strings, ...values] = args;
          const newPayload: T = {
            ...payload,
            children: this.proccessChildren(
              payload,
              this.proccessTemplateLiteralCall(strings, values),
            ),
          };
          return this.proxyify(newPayload);
        }
      },
      get(targetFn: typeof nodeProxy, prop: keyof Methods) {
        const payload = (targetFn as any)[PROXY_PAYLOAD] as T;
        if (payload.methods && prop in payload.methods) {
          return payload.methods[prop as any];
        }
        // @ts-expect-error FIXME: TS doesn't know that the proxy is created by us
        return targetFn[prop];
      },
    };

    return new Proxy(nodeProxy, handler as any) as ProxyNode<T, Props, Methods>;
  }

  getPayload(node: ProxyNode<T, any, any>) {
    return (node as any)[PROXY_PAYLOAD] as T;
  }
}
