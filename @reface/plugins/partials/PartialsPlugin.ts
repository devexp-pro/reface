import type { IPlugin, ITemplate } from "../../core/types.ts";
import type { PartialPluginOptions } from "./types.ts";
import { hx, type HxBuilder, type HxTrigger } from "@reface/htmx";
import { TemplatePartial } from "./TemplatePartial.ts";
import { REFACE_EVENT } from "../../core/constants.ts";
import { Reface } from "../../Reface.ts";
export class PartialsPlugin implements IPlugin {
  readonly name = "partials";
  private partials = new Map<string, () => Promise<unknown>>();
  private apiPrefix: string;

  constructor(options: PartialPluginOptions = {}) {
    this.apiPrefix = options.apiPrefix || "/reface-partial";
  }

  setup(reface: Reface) {
    const manager = reface.getRenderManager();

    manager.on(
      REFACE_EVENT.RENDER.TEMPLATE.START,
      ({ template }: { template: ITemplate }) => {
        if (template instanceof TemplatePartial) {
          this.registerPartial(template);
        }
      },
    );
    return Promise.resolve();
  }

  private registerPartial(partial: TemplatePartial<unknown>) {
    const name = partial.attributes["data-partial"] as string;
    if (!this.partials.has(name)) {
      this.partials.set(name, partial.handler);
    }
  }

  getHandler(name: string) {
    return this.partials.get(name);
  }

  getPartials() {
    return new Map(this.partials);
  }

  getPartialUrl(name: string): string {
    return `${this.apiPrefix}/${name}`;
  }

  getTrigger(name: string, trigger?: HxTrigger): HxBuilder {
    return hx()
      .get(this.getPartialUrl(name))
      .target(`[data-partial='${name}']`)
      .trigger(trigger || "click");
  }
}
