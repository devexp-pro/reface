// Rendering API
export { Recast, type RenderResult } from "./recast/mod.ts";
export { RecastPlugin, type RecastPluginInterface } from "./plugin/mod.ts";

export type {
  ArrayNode,
  AsyncNode,
  Child,
  Children,
  ComponentNode,
  Element,
  ElementNode,
  FragmentNode,
  FunctionNode,
} from "./expressions/mod.ts";

export {
  arrayExpression,
  asyncExpression,
  componentExpression,
  elementExpression,
  fragmentExpression,
  functionExpression,
  htmlContentExpression,
  primitiveExpression,
  textContentExpression,
} from "./expressions/mod.ts";

// Template API
export { html } from "./html/mod.ts";
export { element } from "./element/mod.ts";
export { component } from "./component/mod.ts";
export { RecastStyledPlugin, styled } from "./styled/mod.ts";
export {
  BodyEndSlot,
  createSlot,
  HeadSlot,
  SlotsPlugin,
  Template,
  TitleSlot,
} from "./slots/mod.ts";

// Plugins
export { LoggerPlugin } from "./plugins/LoggerPlugin.ts";
