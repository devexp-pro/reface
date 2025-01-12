import { RecastPlugin, type RecastPluginInterface } from "@recast/plugin";
import { ComponentRenderFn } from "@recast/expressions";
import { RefaceError } from "../RefaceError.ts";

export class PartialsPlugin extends RecastPlugin
  implements RecastPluginInterface {
  readonly name = "partials";
  private partials = new Map<string, ComponentRenderFn<any>>();
  private apiPrefix: string;

  constructor(options: { apiPrefix?: string } = {}) {
    super();
    this.apiPrefix = options.apiPrefix || "/reface/partial";
  }

  public register(name: string, handler: ComponentRenderFn<any>): void {
    if (this.partials.has(name)) {
      throw new RefaceError(`Partial ${name} already registered`);
    }
    this.partials.set(name, handler);
  }

  setup(): void {
    this.partials.clear();
  }

  getHandler<C = any>(name: string): ComponentRenderFn<C> | undefined {
    return this.partials.get(name);
  }

  getPartials(): Map<string, ComponentRenderFn<any>> {
    return new Map(this.partials);
  }

  getPartialUrl(name: string): string {
    return `${this.apiPrefix}/${name}`;
  }
}
