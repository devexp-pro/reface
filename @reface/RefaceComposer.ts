import { RefaceRenderManager } from "@reface";
import type {
  IRefaceComposer,
  IRefaceComposerPlugin,
  IRefaceRenderManager,
  IRefaceTemplate,
} from "@reface/types";

export class RefaceComposer implements IRefaceComposer {
  plugins = new Map<string, IRefaceComposerPlugin>();
  private renderManager: IRefaceRenderManager;

  constructor() {
    this.renderManager = new RefaceRenderManager({ composer: this });
  }

  // Регистрация плагина
  async use(plugin: IRefaceComposerPlugin): Promise<void> {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin "${plugin.name}" is already registered`);
    }

    this.plugins.set(plugin.name, plugin);
    await plugin.setup(this);
  }

  // Получение плагина по имени
  getPlugin<T extends IRefaceComposerPlugin>(name: string): T | undefined;
  getPlugin<T extends IRefaceComposerPlugin>(
    plugin: { new (...args: any[]): T },
  ): T | undefined;
  getPlugin<T extends IRefaceComposerPlugin>(
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
  render(template: IRefaceTemplate): string {
    return this.renderManager.render(template);
  }

  // Доступ к менеджеру рендеринга для плагинов
  getRenderManager(): IRefaceRenderManager {
    return this.renderManager;
  }
}
