import type {
  ClassValue,
  ElementChildType,
  HTMLAttributes,
  ITemplate,
  StyleValue,
} from "../templates/types.ts";

export type RenderPhase =
  | "render:start"
  | "render:end"
  | "renderTemplate:start"
  | "renderTemplate:end"
  | "renderChild:start"
  | "renderChild:end"
  | "renderChildren:start"
  | "renderChildren:end"
  | "renderAttributes:start"
  | "renderAttributes:end"
  | "renderClassAttribute:start"
  | "renderClassAttribute:end"
  | "renderStyleAttribute:start"
  | "renderStyleAttribute:end";

export interface IRenderManager {
  on(
    phase: RenderPhase,
    handler: (params: {
      template?: ITemplate;
      html?: string;
      attributes?: HTMLAttributes;
      class?: ClassValue;
      style?: StyleValue;
      manager: IRenderManager;
    }) => void | ITemplate | string,
  ): void;

  off(phase: RenderPhase, handler: Function): void;

  render(template: ITemplate): string;
  renderTemplate(template: ITemplate): string;
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
