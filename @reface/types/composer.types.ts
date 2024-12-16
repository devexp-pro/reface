import type { REFACE_EVENT } from "@reface/constants";
import type { RenderHandler } from "./render.types.ts";
import type { IRefaceTemplate } from "./template.types.ts";
import type { ElementChildType } from "./base.types.ts";
import type { ClassValue, HTMLAttributes, StyleValue } from "./html.types.ts";

type ExtractValues<T> = T extends object
  ? { [K in keyof T]: ExtractValues<T[K]> }[keyof T]
  : T;

export type RefaceEventType = ExtractValues<typeof REFACE_EVENT>;

export interface IRefaceComposer {
  plugins: Map<IRefaceComposerPlugin["name"], IRefaceComposerPlugin>;
  getRenderManager(): IRefaceRenderManager;
}

export interface IRefaceComposerPlugin {
  name: string;
  setup(composer: IRefaceComposer): void | Promise<void>;
}

export interface IRefaceRenderManager {
  on(event: RefaceEventType, handler: RenderHandler): void;
  off(event: RefaceEventType, handler: RenderHandler): void;

  render(template: IRefaceTemplate): string;
  renderTemplate(template: IRefaceTemplate): string;
  renderChild(child: ElementChildType): string;
  renderChildren(children: ElementChildType[]): string;
  renderAttributes(attrs: HTMLAttributes): string;
  renderClassAttribute(value: ClassValue): string;
  renderStyleAttribute(value: StyleValue): string;

  store: {
    get<T>(pluginName: string): T | undefined;
    set<T>(pluginName: string, value: T): void;
  };
}
