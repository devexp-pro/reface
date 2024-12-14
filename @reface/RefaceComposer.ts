import type { IRenderManager, ITemplate } from "./core/types.ts";
import { RenderManager } from "./core/render/RenderManager.ts";

export interface IPlugin {
  name: string;
  setup(composer: RefaceComposer): void | Promise<void>;
}

export class RefaceComposer {
  private plugins = new Map<string, IPlugin>();
  private renderManager: IRenderManager;

  constructor() {
    this.renderManager = new RenderManager({ composer: this });
  }

  // Регистрация плагина
  async use(plugin: IPlugin): Promise<void> {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin "${plugin.name}" is already registered`);
    }

    this.plugins.set(plugin.name, plugin);
    await plugin.setup(this);
  }

  // Получение плагина по имени
  getPlugin<T extends IPlugin>(name: string): T | undefined;
  getPlugin<T extends IPlugin>(
    plugin: { new (...args: any[]): T },
  ): T | undefined;
  getPlugin<T extends IPlugin>(
    nameOrPlugin: string | { new (...args: any[]): T },
  ): T | undefined {
    if (typeof nameOrPlugin === "string") {
      return this.plugins.get(nameOrPlugin) as T;
    } else {
      const instances = Array.from(this.plugins.values());
      return instances.find((plugin) => plugin instanceof nameOrPlugin) as T;
    }
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
