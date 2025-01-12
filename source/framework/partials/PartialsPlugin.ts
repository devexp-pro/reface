import { RecastPlugin, type RecastPluginInterface } from "@recast/plugin";
import { elementExpression } from "@recast/expressions";
import type { PartialHandler } from "./types.ts";
import type { MetaPartial } from "./types.ts";
import type { ElementNode } from "@recast";

export class PartialsPlugin extends RecastPlugin
  implements RecastPluginInterface {
  readonly name = "partials";
  private partials = new Map<string, PartialHandler<any>>();
  private apiPrefix: string;

  constructor(options: { apiPrefix?: string } = {}) {
    super();
    this.apiPrefix = options.apiPrefix || "/reface/partial";
  }

  public register(name: string, handler: PartialHandler<any>): void {
    this.partials.set(name, handler);
  }

  setup(): void {
    this.partials.clear();

    this.before<ElementNode<any>, typeof elementExpression>(
      elementExpression,
      ({ template }) => {
        const { meta, attributes } = elementExpression.getPayload(template);
        const partialMeta = meta?.partial as MetaPartial | undefined;
        if (!partialMeta?.name) {
          return template;
        }

        attributes["data-partial"] = partialMeta.name;
      },
    );
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
