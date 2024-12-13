import type { IRenderManager, ITemplate } from "./core/types.ts";
import { RenderManager } from "./core/render/RenderManager.ts";
import { LoggerPlugin } from "./plugins/LoggerPlugin.ts";
import { StyledPlugin } from "./plugins/styled/StyledPlugin.ts";

export interface IPlugin {
  name: string;
  setup(reface: Reface): void | Promise<void>;
}

export class Reface {
  private plugins = new Map<string, IPlugin>();
  private renderManager: IRenderManager;

  constructor() {
    this.renderManager = new RenderManager();
    // Включаем логгер по умолчанию
    this.use(new StyledPlugin());
  }

  // Регистрация плагина
  async use(plugin: IPlugin): Promise<void> {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin "${plugin.name}" is already registered`);
    }

    await plugin.setup(this);
    this.plugins.set(plugin.name, plugin);
  }

  // Получение плагина по имени
  getPlugin<T extends IPlugin>(name: string): T | undefined {
    return this.plugins.get(name) as T;
  }

  // Рендеринг шаблона
  render(template: ITemplate): string {
    return this.renderManager.render(template);
  }

  // Доступ к менеджеру рендеринга для плагинов
  getRenderManager(): IRenderManager {
    return this.renderManager;
  }
}
