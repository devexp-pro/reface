import type { ElementChildType, ITemplate } from "../templates/types.ts";

export type RenderPhase =
  | "render:start"
  | "render:end"
  | "renderTemplate:start"
  | "renderTemplate:end"
  | "renderChild:start"
  | "renderChild:end"
  | "renderChildren:start"
  | "renderChildren:end";

export interface IRenderManager {
  on(
    phase: RenderPhase,
    handler: (params: {
      template?: ITemplate;
      html?: string;
      manager: IRenderManager;
    }) => void | ITemplate | string,
  ): void;

  off(phase: RenderPhase, handler: Function): void;

  render(template: ITemplate): string;
  renderTemplate(template: ITemplate): string;
  renderChild(child: ElementChildType): string;
  renderChildren(children: ElementChildType[]): string;

  store: {
    get<T>(pluginName: string): T | undefined;
    set<T>(pluginName: string, value: T): void;
  };
}
