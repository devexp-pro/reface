import { REFACE_EVENT } from "@reface/constants";
import type { IRefaceComposer, IRefaceComposerPlugin } from "@reface/types";
import type { LiveReloadOptions } from "./types.ts";

const DEFAULT_PORT = 35729;
const DEFAULT_HOST = "localhost";

export class LiveReloadPlugin implements IRefaceComposerPlugin {
  name = "liveReload" as const;
  private abortController: AbortController | null = null;
  private clients: Set<WebSocket> = new Set();
  private clientScript: string;
  private watchers: Deno.FsWatcher[] = [];

  constructor(private options: LiveReloadOptions = {}) {
    this.options.port = options.port || DEFAULT_PORT;
    this.options.host = options.host || DEFAULT_HOST;

    console.log(
      `[LiveReload] Initializing on ${this.options.host}:${this.options.port}`,
    );

    // Read client script
    this.clientScript = Deno.readTextFileSync(
      new URL("./client/liveReload.js", import.meta.url),
    );
  }

  async setup(composer: IRefaceComposer): Promise<void> {
    const manager = composer.getRenderManager();

    const self = this;
    // Inject client script
    manager.on(
      REFACE_EVENT.RENDER.RENDER.END,
      function liveReloadPluginInjectScript({ html }) {
        console.log("[LiveReload] Injecting client script");
        return self.injectScript(html as string);
      },
    );

    this.abortController = new AbortController();

    console.log("[LiveReload] Starting server...");

    Deno.serve({
      port: this.options.port,
      hostname: this.options.host,
      signal: this.abortController.signal,
      onError: (error) => {
        console.error("[LiveReload] Server error:", error);
        return new Response("Internal Server Error", { status: 500 });
      },
    }, async (req) => {
      if (req.headers.get("upgrade") === "websocket") {
        const { socket, response } = Deno.upgradeWebSocket(req);

        socket.onopen = () => {
          this.clients.add(socket);
          console.log(
            `[LiveReload] Client connected (total: ${this.clients.size})`,
          );
        };

        socket.onclose = () => {
          this.clients.delete(socket);
          console.log(
            `[LiveReload] Client disconnected (total: ${this.clients.size})`,
          );
        };

        return response;
      }
      return new Response("Not found", { status: 404 });
    });

    console.log("[LiveReload] Server started successfully");

    // Watch for file changes
    if (this.options.watchPaths?.length) {
      console.log("[LiveReload] Starting file watchers...");
      for (const path of this.options.watchPaths) {
        console.log(`[LiveReload] Watching path: ${path}`);
        await this.watchPath(path);
      }
    }
  }

  private async watchPath(path: string) {
    try {
      const watcher = Deno.watchFs(path);
      this.watchers.push(watcher);

      for await (const event of watcher) {
        if (event.kind === "modify") {
          console.log(`[LiveReload] File changed: ${event.paths.join(", ")}`);
          this.reload();
        }
      }
    } catch (error) {
      console.error(`[LiveReload] Error watching ${path}:`, error);
    }
  }

  private reload() {
    const clientCount = this.clients.size;
    console.log(
      `[LiveReload] Sending reload signal to ${clientCount} client(s)`,
    );

    for (const client of this.clients) {
      try {
        client.send("reload");
      } catch (error) {
        console.error("[LiveReload] Error sending reload signal:", error);
        this.clients.delete(client);
      }
    }
  }

  private injectScript(html: string): string {
    console.log("[LiveReload] Injecting client script");
    const script = `
      <script>
        const REFACE_LIVE_RELOAD_PORT = ${this.options.port};
        const REFACE_LIVE_RELOAD_HOST = "${this.options.host}";
        ${this.clientScript}
      </script>
    `;

    return html.replace("</body>", `${script}</body>`);
  }

  // Cleanup method
  async destroy() {
    console.log("[LiveReload] Shutting down...");

    this.abortController?.abort();

    // Close all watchers
    console.log("[LiveReload] Closing file watchers...");
    for (const watcher of this.watchers) {
      try {
        await watcher.close();
      } catch (error) {
        console.error("[LiveReload] Error closing watcher:", error);
      }
    }
    this.watchers = [];

    // Close all WebSocket connections
    console.log(
      `[LiveReload] Closing ${this.clients.size} client connection(s)...`,
    );
    for (const client of this.clients) {
      try {
        client.close();
      } catch (error) {
        console.error("[LiveReload] Error closing client:", error);
      }
    }
    this.clients.clear();

    console.log("[LiveReload] Shutdown complete");
  }
}
