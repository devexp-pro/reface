import type {
  NormalizeAttributes,
  RawTemplate,
  Template,
  TemplateAttributes,
  TemplateFactoryConfig,
  TemplateMethods,
  TemplatePayload,
} from "./types.ts";
import { REFACE_TEMPLATE } from "./types.ts";
import { processChildren } from "./processChildren.ts";

type ProxyTarget<
  A extends TemplateAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
> = {
  (attributes: A): Template<A, P, M>;
  (strings: TemplateStringsArray, ...values: any[]): Template<A, P, M>;
} & M;

type ProxyHandler<
  A extends TemplateAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
> = {
  apply: (
    target: ProxyTarget<A, P, M>,
    thisArg: any,
    args: [A] | [TemplateStringsArray, ...any[]],
  ) => Template<A, P, M>;

  get: (
    target: ProxyTarget<A, P, M>,
    prop: string | symbol,
    receiver: any,
  ) => ((...args: any[]) => Template<A, P, M>) | undefined;
};

export function createTemplateProxy<
  A extends TemplateAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
>(
  rawTemplate: RawTemplate<NormalizeAttributes<A>, P>,
  config: TemplateFactoryConfig<A, P, M>,
): Template<A, P, M> {
  const target: ProxyTarget<A, P, M> = Object.assign(
    function () {} as ProxyTarget<A, P, M>,
    config.methods || {},
  );

  const handler: ProxyHandler<A, P, M> = {
    apply(_target, _thisArg, args) {
      const [first, ...rest] = args;

      if (first?.raw) {
        return createTemplateProxy(
          {
            ...rawTemplate,
            children: processChildren(first, rest),
          },
          config,
        );
      }

      return createTemplateProxy(
        {
          ...rawTemplate,
          attributes: { ...rawTemplate.attributes, ...first },
        },
        config,
      );
    },

    get(_target, prop) {
      if (prop === REFACE_TEMPLATE) {
        return true;
      }

      if (
        typeof prop === "string" &&
        typeof config.methods === "object" &&
        prop in config.methods
      ) {
        const method = config.methods[prop];
        return (...args: any[]) => method({ template: rawTemplate, ...args });
      }
      return undefined;
    },
  };

  return new Proxy(target, handler);
}
