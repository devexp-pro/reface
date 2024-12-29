import { RecastPlugin } from "@recast/plugin";
import type { MetaIsland, RpcToHtmx } from "./types.ts";

export class IslandPlugin extends RecastPlugin {
  readonly name = "island";
  private islands = new Map<string, unknown>();

  setup(): void {
    this.islands.clear();
  }

  renderTemplateBefore(template: TemplateData): TemplateData {
    const meta = template.node.meta?.island as MetaIsland | undefined;
    if (!meta?.name) return template;

    if (meta.state) {
      this.islands.set(meta.name, meta.state);
    }

    template.node.attributes["data-island"] = meta.name;
    template.node.attributes.id = `island-${meta.name}`;

    return template;
  }

  renderAfter(_, html: string): string {
    const states = Object.fromEntries(this.islands.entries());
    if (Object.keys(states).length === 0) return html;

    const script = `
      <script>
        window.__ISLAND_STATES__ = ${JSON.stringify(states)};
      </script>
    `;

    return html + script;
  }

  createRpcProxy<R>(name: string): RpcToHtmx<R> {
    return new Proxy({} as RpcToHtmx<R>, {
      get: (_, method: string) => {
        return (args?: unknown) => ({
          "hx-post": `/rpc/${name}/${method}`,
          "hx-target": `#island-${name}`,
          "hx-ext": "json-enc",
          "hx-swap": "outerHTML",
          ...(args ? { "hx-vals": JSON.stringify(args) } : {}),
        });
      },
    });
  }

  getIslandState<T>(name: string): T | undefined {
    return this.islands.get(name) as T;
  }

  setIslandState(name: string, state: unknown): void {
    this.islands.set(name, state);
  }
}
