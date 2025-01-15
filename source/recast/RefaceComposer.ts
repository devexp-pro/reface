import { RefaceRenderManager } from "@recast";
import type {
  IRefaceComposer,
  IRefaceComposerPlugin,
  IRefaceRenderManager,
} from "@reface/types";
import type { Template } from "@reface/template";

export class RefaceComposer implements IRefaceComposer {
  plugins: Map<string, IRefaceComposerPlugin> = new Map();
  private renderManager: RefaceRenderManager;

  constructor() {
    this.renderManager = new RefaceRenderManager({ composer: this });
  }
  async use(plugin: IRefaceComposerPlugin): Promise<void> {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin "${plugin.name}" is already registered`);
    }
    this.plugins.set(plugin.name, plugin);
    await plugin.setup(this);
  }
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
  render(template: Template<any, any, any>): string {
    return this.renderManager.render(template);
  }
  getRenderManager(): IRefaceRenderManager {
    return this.renderManager;
  }
}
