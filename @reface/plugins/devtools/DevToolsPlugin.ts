import { REFACE_EVENT } from "@reface/constants";
import type { IRefaceComposer, IRefaceComposerPlugin } from "@reface/types";
import type { DevToolsOptions } from "./types.ts";
import type { RawTemplate } from "@reface/template";

function normalize(template: RawTemplate) {
  if (!template) return;
  return {
    ...template,
    type: template.type || "Anonymous",
    children: template.children
      ? template.children.filter(Boolean).map((child) => normalize(child.raw))
        .filter(Boolean)
      : [],
  };
}

export class DevToolsPlugin implements IRefaceComposerPlugin {
  name = "devtools" as const;
  private components: Omit<RawTemplate, "children"> & {
    children: (Omit<RawTemplate, "children"> & { raw: RawTemplate })[];
  }[] = [];

  constructor(private options: DevToolsOptions = {}) {
    console.log("[DevTools] Initializing...");
  }

  async setup(composer: IRefaceComposer): Promise<void> {
    const manager = composer.getRenderManager();

    // Собираем информацию о компонентах во время рендера
    manager.on(
      REFACE_EVENT.RENDER.RENDER.START,
      ({ template }) => {
        console.log("[DevTools] Rendering template...", template.raw);
        if (!template) return;

        this.components.push(normalize(template.raw));
      },
    );

    // Инжектируем данные и клиентский скрипт в конце рендера
    manager.on(
      REFACE_EVENT.RENDER.RENDER.END,
      ({ html }) => this.injectDevTools(html as string),
    );
  }

  private injectDevTools(html: string): string {
    const clientScript = Deno.readTextFileSync(
      new URL("./client/devtools.module.js", import.meta.url),
    );

    const devToolsData = JSON.stringify(this.components);
    this.components = []; // Очищаем для следующего рендера

    const script = /* HTML */ `
      <script id="__REFACE_DEVTOOLS_DATA__" type="application/json">
        ${devToolsData}
      </script>
      <script type="module">
        ${clientScript}
      </script>
    `;

    return html.replace("</body>", `${script}</body>`);
  }

  async destroy() {
    console.log("[DevTools] Shutting down...");
    this.components = [];
  }
}
