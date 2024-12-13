import type { ElementChildType, ITemplate } from "../templates/types.ts";

export type RenderPhase =
  | "start" // Начало всего рендеринга
  | "beforeRender" // Перед рендерингом каждого шаблона
  | "afterRender" // После рендеринга каждого шаблона
  | "end"; // Конец всего рендеринга

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
