import type { IPlugin, ITemplate } from "../../core/types.ts";
import type { IslandPluginOptions } from "./types.ts";
import { hx, type HxBuilder, type HxTrigger } from "@reface/htmx";
import { TemplateIsland } from "./TemplateIsland.ts";
import { REFACE_EVENT } from "../../core/constants.ts";
import { Reface } from "../../Reface.ts";
export class IslandPlugin implements IPlugin {
  readonly name = "island";
  private islands = new Map<string, () => Promise<unknown>>();
  private apiPrefix: string;

  constructor(options: IslandPluginOptions = {}) {
    this.apiPrefix = options.apiPrefix || "/reface-island";
  }

  setup(reface: Reface) {
    const manager = reface.getRenderManager();

    manager.on(
      REFACE_EVENT.RENDER.TEMPLATE.START,
      ({ template }: { template: ITemplate }) => {
        if (template instanceof TemplateIsland) {
          this.registerIsland(template);
        }
      },
    );
    return Promise.resolve();
  }

  private registerIsland(island: TemplateIsland<unknown>) {
    const name = island.attributes["data-island"] as string;
    if (!this.islands.has(name)) {
      this.islands.set(name, island.handler);
    }
  }

  getHandler(name: string) {
    return this.islands.get(name);
  }

  getIslands() {
    return new Map(this.islands);
  }

  getIslandUrl(name: string): string {
    return `${this.apiPrefix}/${name}`;
  }

  getTrigger(name: string, trigger?: HxTrigger): HxBuilder {
    return hx()
      .get(this.getIslandUrl(name))
      .target(`[data-island="${name}"]`)
      .trigger(trigger || "click");
  }
}
