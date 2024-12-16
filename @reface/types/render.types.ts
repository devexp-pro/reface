import type { IRefaceRenderManager } from "./composer.types.ts";
import type { ClassValue, HTMLAttributes, StyleValue } from "./html.types.ts";
import type { IRefaceTemplate } from "./template.types.ts";

export type RenderPhaseBase =
  | "render"
  | "renderTemplate"
  | "renderChild"
  | "renderChildren"
  | "renderAttributes"
  | "renderClassAttribute"
  | "renderStyleAttribute";

export type RenderPhase = `${RenderPhaseBase}:start` | `${RenderPhaseBase}:end`;

export type RenderContext = {
  template?: IRefaceTemplate;
  html?: string;
  attributes?: HTMLAttributes;
  class?: ClassValue;
  style?: StyleValue;
  manager: IRefaceRenderManager;
};

export type RenderHandler = (
  context: RenderContext,
) => void | IRefaceTemplate | string;
