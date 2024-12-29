import { RecastPlugin } from "@recast/plugin";
import type { Element } from "@recast/expressions";
import type { PartialHandler } from "./types.ts";
import type { MetaPartial } from "./types.ts";

export class PartialsPlugin extends RecastPlugin {
  readonly name = "partials";
  private partials = new Map<string, PartialHandler<any>>();
  private apiPrefix: string;

  constructor(options: { apiPrefix?: string } = {}) {
    super();
    this.apiPrefix = options.apiPrefix || "/reface/partial";
  }

  setup(): void {
    this.partials.clear();
  }

  renderTemplateBefore(template: TemplateData): TemplateData {
    const meta = template.node.meta?.partial as MetaPartial | undefined;
    if (!meta?.name) {
      return template;
    }

    if (!this.partials.has(meta.name)) {
      this.partials.set(meta.name, meta.handler);
    }

    template.node.attributes["data-partial"] = meta.name;

    return template;
  }

  getHandler<C = any>(name: string): PartialHandler<C> | undefined {
    return this.partials.get(name);
  }

  getPartials(): Map<string, PartialHandler<any>> {
    return new Map(this.partials);
  }

  getPartialUrl(name: string): string {
    return `${this.apiPrefix}/${name}`;
  }
}
