import { type Recast, RecastPlugin } from "@recast";
import type { LiveReloadOptions } from "./types.ts";

const DEFAULT_PORT = 35729;
const DEFAULT_HOST = "localhost";

export class LiveReloadPlugin extends RecastPlugin {
  readonly name = "liveReload";
  private abortController: AbortController | null = null;
  private clients: Set<WebSocket> = new Set();
  private clientScript: string;
  private watchers: Deno.FsWatcher[] = [];
  private port: number;
  private host: string;
  private watchPaths: string[];

  constructor(options: LiveReloadOptions = {}) {
    super();
    this.port = options.port || DEFAULT_PORT;
    this.host = options.host || DEFAULT_HOST;
    this.watchPaths = options.watchPaths || [];

    console.log(
      `[LiveReload] Initializing on ${this.host}:${this.port}`,
    );

    this.clientScript = Deno.readTextFileSync(
      new URL("./client/liveReload.js", import.meta.url),
    );
  }

  async setup(recast: Recast): Promise<void> {
    this.abortController = new AbortController();

    console.log("[LiveReload] Starting server...", this.port);

    Deno.serve({
      port: this.port,
      hostname: this.host,
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
        };

        socket.onclose = () => {
          this.clients.delete(socket);
        };

        return response;
      }
      return new Response("Not found", { status: 404 });
    });

    if (this?.watchPaths?.length) {
      for (const path of this.watchPaths) {
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
    for (const client of this.clients) {
      try {
        client.send("reload");
      } catch (error) {
        console.error("[LiveReload] Error sending reload signal:", error);
        this.clients.delete(client);
      }
    }
  }

  renderAfter(_: unknown, html: string): string {
    const script = `
      <script>
        const REFACE_LIVE_RELOAD_PORT = ${this.port};
        const REFACE_LIVE_RELOAD_HOST = "${this.host}";
        ${this.clientScript}
      </script>
    `;

    return html.replace("</body>", `${script}</body>`);
  }

  async destroy() {
    this.abortController?.abort();

    for (const watcher of this.watchers) {
      try {
        await watcher.close();
      } catch (error) {
        console.error("[LiveReload] Error closing watcher:", error);
      }
    }
    this.watchers = [];

    for (const client of this.clients) {
      try {
        client.close();
      } catch (error) {
        console.error("[LiveReload] Error closing client:", error);
      }
    }
    this.clients.clear();
  }
}
