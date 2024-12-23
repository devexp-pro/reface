import { REFACE_EVENT } from "@reface/constants";
import type { IRefaceComposerPlugin } from "@reface/types";
import type { RefaceComposer } from "../../RefaceComposer.ts";
import type { Template } from "@reface/template";
import type { PartialPayload } from "./types.ts";

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
        const partialTemplate = template as Template<any, PartialPayload>;
        if (partialTemplate.raw.type === "partial") {
          this.registerPartial(partialTemplate);
        }
      },
    );
    return Promise.resolve();
  }

  private registerPartial(template: Template<any, PartialPayload>) {
    const name = template.raw.payload.partial.name;
    if (!this.partials.has(name)) {
      this.partials.set(name, template.raw.payload.partial.handler);
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
}
