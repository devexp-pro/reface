import { IPlugin } from "../core/types.ts";
import { RefaceComposer } from "../RefaceComposer.ts";
import { REFACE_EVENT } from "../core/constants.ts";
import { TemplateIsland } from "./TemplateIsland.ts";

export class IslandPlugin implements IPlugin {
  name = "island";
  private islands = new Map<string, unknown>();

  setup(composer: RefaceComposer): void {
    composer.getRenderManager().on(
      REFACE_EVENT.RENDER.TEMPLATE.START,
      ({ template }) => {
        if (template instanceof TemplateIsland) {
          if (template.state) {
            this.islands.set(template.name, template.state);
          }
        }
      },
    );

    composer.getRenderManager().on(
      REFACE_EVENT.RENDER.RENDER.END,
      ({ html }) => {
        const states = Object.fromEntries(this.islands.entries());
        const script = `
        <script>
          window.__ISLAND_STATES__ = ${JSON.stringify(states)};
        </script>
      `;
        return html + script;
      },
    );
  }

  createRpcProxy<R>(name: string): RpcToHtmx<R> {
    return new Proxy({} as RpcToHtmx<R>, {
      get: (_, method: string) => {
        return (args?: unknown) => ({
          "hx-post": `/rpc/${name}/${method}`,
          "hx-target": `#island-${name}`,
          "hx-ext": "json-enc",
          "hx-swap": "outerHTML",
          ...(args && { "hx-vals": JSON.stringify(args) }),
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

  clearIslandState(name: string): void {
    this.islands.delete(name);
  }
}
