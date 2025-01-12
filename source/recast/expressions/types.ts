import type { EmptyRecord, Promiseable } from "@common/utility.types.ts";

import type { PrimitiveValue } from "./primitives/PrimitiveExpression.ts";
import type { TextContent } from "./textContent/TextContentExpression.ts";
import type { HtmlContent } from "./htmlContent/HtmlContentExpression.ts";
import type { FragmentNode } from "./fragment/FragmentExpression.ts";
import type { FunctionNode } from "./function/FunctionExpression.ts";
import type { ComponentNode } from "./component/mod.ts";
import type { ElementNode, HTMLAttributes } from "./element/mod.ts";
import type { ArrayNode } from "./array/mod.ts";
import type { AsyncNode } from "./async/AsyncExpression.ts";

export const PROXY_PAYLOAD = Symbol("proxyPayload");
export const PROXY_COPY = Symbol("proxyCopy");

interface ObjectNode {
  type: ExpressionType;
  children: Children;
  meta: Record<string, unknown>;
}

export interface ProxyNodePayload extends ObjectNode {
  attributes: Record<string, unknown>;
  methods: Record<string, any>;
}

export type ProxyNode<
  T extends ProxyNodePayload,
  Props extends Record<string, unknown> = Record<string, unknown>,
  Methods extends Record<string, any> = EmptyRecord,
> = {
  (props?: Props): ProxyNode<T, Props, Methods>;
  (
    template: TemplateStringsArray,
    ...values:
      (Exclude<Child, ProxyNode<any, any, any>> | ProxyNode<any, any, any>)[] // HACK: to avoid circle types depens on ElementNode and ComponentNode
  ): ProxyNode<T, Props, Methods>;
} & {
  [PROXY_COPY]: (
    copyFn: (payload: T) => T,
  ) => ProxyNode<T, Props, Methods>;
  [PROXY_PAYLOAD]: T;
} & Methods;

export type ExpressionType =
  | "component"
  | "element"
  | "fragment"
  | "function"
  | "array"
  | "primitive"
  | "text"
  | "html"
  | "async";

export type Element<T extends Record<string, any> = any> =
  | ComponentNode<T, any>
  | ElementNode<T, any>;

export type Children = Child[];
export type Child =
  | Element
  | PrimitiveValue
  | ComponentNode
  | HtmlContent
  | FragmentNode
  | FunctionNode
  | ArrayNode
  | AsyncNode;
