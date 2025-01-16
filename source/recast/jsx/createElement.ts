import {
  arrayExpression,
  type Children,
  componentExpression,
  type ComponentNode,
  type Element,
  elementExpression,
  type ElementNode,
} from "@recast/expressions";

export function createElement<
  P extends Record<string, any>,
>(
  type: string | ComponentNode<P> | ElementNode<P>,
  props: P,
  ...children: Children
): Element<P> {
  if (typeof type === "string") {
    return elementExpression.create({
      tag: type,
      attributes: props || {},
      children,
    });
  }

  if (componentExpression.is(type) || elementExpression.is(type)) {
    return type(props ?? {} as P)`${children}`;
  }

  if (arrayExpression.is(type)) {
    return children;
  }

  if (typeof type === "function") {
    return type((props ?? {}) as any, children);
  }

  throw new Error(`Unsupported element type: ${typeof type}`);
}
