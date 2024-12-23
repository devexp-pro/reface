import type { Template } from "@reface/template";

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
  template?: Template;
  html?: string;
  attributes?: Record<string, any>;
  class?: string[] | Record<string, boolean>;
  style?: Record<string, string | number>;
  manager: RenderManager;
};

export type RenderHandler = (
  context: RenderContext,
) => void | Template | string;

export interface RenderManager {
  on(event: RenderPhase, handler: RenderHandler): void;
  off(event: RenderPhase, handler: RenderHandler): void;
  emit(event: RenderPhase, context: RenderContext): void;
  render(template: Template): string;
}
