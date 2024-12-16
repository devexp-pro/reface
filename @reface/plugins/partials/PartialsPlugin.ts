import { hx, type HxBuilder, type HxTrigger } from "@reface/htmx";
import { TemplatePartial } from "./TemplatePartial.ts";
import { REFACE_EVENT } from "@reface/constants";
import type { RefaceComposer } from "../../RefaceComposer.ts";
import type { IRefaceComposerPlugin } from "@reface/types";

export class PartialsPlugin implements IRefaceComposerPlugin {
  readonly name = "partials";
  private partials = new Map<string, () => Promise<unknown>>();
  private apiPrefix: string;

  constructor(options: { apiPrefix?: string } = {}) {
    this.apiPrefix = options.apiPrefix || "/reface-partial";
  }

  setup(composer: RefaceComposer) {
    const manager = composer.getRenderManager();

    manager.on(
      REFACE_EVENT.RENDER.TEMPLATE.START,
      ({ template }) => {
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