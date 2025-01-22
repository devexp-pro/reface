import {
  arrayExpression,
  componentExpression,
  type ComponentNode,
  elementExpression,
  type ElementNode,
  fragmentExpression,
  PROXY_COPY,
  PROXY_PAYLOAD,
} from "@recast/expressions/mod.ts";
import { parseCSS } from "./cssParser.ts";
import type { MetaStyled } from "./types.ts";

function createStyledElement<T extends ElementNode | ComponentNode>(
  template: T,
) {
  return (css: TemplateStringsArray, ...values: any[]) => {
    const className = `styled-${Math.random().toString(36).slice(2)}`;
    const styleContent = parseCSS(
      String.raw({ raw: css }, ...values),
      className,
    );

    const methods = {
      getStyledClass: () => className,
    };

    const existingMeta = template[PROXY_PAYLOAD]?.meta?.styled as
      | MetaStyled
      | undefined;
    const styledMeta: MetaStyled = {
      styledClass: className,
      styles: [
        ...(existingMeta?.styles || []),
        {
          class: className,
          css: styleContent,
        },
      ],
    };

    if (elementExpression.is(template)) {
      return template[PROXY_COPY]((payload) => ({
        ...payload,
        methods: {
          ...payload.methods,
          ...methods,
        },
        meta: {
          ...payload.meta,
          styled: styledMeta,
        },
      }));
    }

    if (componentExpression.is(template)) {
      return componentExpression.copy(template, {
        meta: {
          styled: styledMeta,
        },
        methods,
      });
    }

    if (fragmentExpression.is(template)) {
      return elementExpression.create({
        tag: "div",
        // @ts-expect-error FIXME: what is never ?
        children: template[PROXY_PAYLOAD].children,
        meta: {
          styled: styledMeta,
        },
        methods: {
          ...methods,
        },
      });
    }

    if (arrayExpression.is(template)) {
      return elementExpression.create({
        tag: "div",
        children: template,
        meta: {
          styled: styledMeta,
        },
        methods: {
          ...methods,
        },
      });
    }

    throw new Error("Invalid template type");
  };
}

export const styled = new Proxy(createStyledElement, {
  get(_, prop: string) {
    if (typeof prop === "string") {
      const element = elementExpression.create({
        tag: prop,
      });
      return createStyledElement(element);
    }
    return createStyledElement;
  },
}) as any;
