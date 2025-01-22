import {
  ComponentAttributes,
  type ComponentRenderFn,
  RecastPlugin,
  type RecastPluginInterface,
} from "@recast";
import { PartialHandler } from "@reface/plugins/partials";

export class PartialsPlugin extends RecastPlugin
  implements RecastPluginInterface {
  readonly name = "partials";
  private partials = new Map<string, PartialHandler>();
  private apiPrefix: string;

  constructor(options: { apiPrefix?: string } = {}) {
    super();
    this.apiPrefix = options.apiPrefix || "/reface/partial";
  }

  public register(name: string, handler: PartialHandler): void {
    if (this.partials.has(name)) {
      throw new Error(`Partial ${name} already registered`);
    }
    this.partials.set(name, handler);
  }

  setup(): void {
    this.partials.clear();
  }

  getHandler(name: string): PartialHandler | undefined {
    return this.partials.get(name);
  }

  getPartials(): Map<string, PartialHandler> {
    return new Map(this.partials);
  }

  getPartialUrl(name: string): string {
    return `${this.apiPrefix}/${name}`;
  }
}
