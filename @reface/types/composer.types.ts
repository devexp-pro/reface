import type { REFACE_EVENT } from "@reface/constants";
import type { ElementChildType, Template } from "@reface/template";
import type { RenderHandler } from "./render.types.ts";

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

  render(template: Template): string;
  renderTemplate(template: Template): string;
  renderChild(child: ElementChildType): string;
  renderChildren(children: ElementChildType[]): string;
  renderAttributes(attrs: Record<string, any>): string;
  renderClassAttribute(value: string[] | Record<string, boolean>): string;
  renderStyleAttribute(value: Record<string, string | number>): string;

  store: {
    get<T>(pluginName: string): T | undefined;
    set<T>(pluginName: string, value: T): void;
  };
}
