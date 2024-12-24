import { walk } from "https://deno.land/std@0.210.0/fs/walk.ts";

interface Client {
  socket: WebSocket;
}

export class LiveReload {
  private clients: Set<Client> = new Set();
  private watchDirs: string[];
  private debounceTimer: number | null = null;

  constructor(watchDirs: string[]) {
    this.watchDirs = watchDirs;
    this.startWatching();
  }

  handleSocket(socket: WebSocket) {
    const client = { socket };
    this.clients.add(client);

    socket.onclose = () => {
      this.clients.delete(client);
    };
  }

  getScript() {
    return `
      <script>
        (function() {
          const socket = new WebSocket('ws://' + location.host + '/_live');
          
          socket.onmessage = () => {
            console.log('[LiveReload] Reloading page...');
            location.reload();
          };

          socket.onclose = () => {
            console.log('[LiveReload] Connection closed, reconnecting...');
            setTimeout(() => {
              location.reload();
            }, 1000);
          };
        })();
      </script>
    `;
  }

  private startWatching() {
    const watcher = Deno.watchFs(this.watchDirs);

    (async () => {
      for await (const event of watcher) {
        if (event.kind === "modify" || event.kind === "create") {
          if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
          }

          this.debounceTimer = setTimeout(() => {
            this.notifyClients();
            this.debounceTimer = null;
          }, 100);
        }
      }
    })();
  }

  private notifyClients() {
    console.log("[LiveReload] Changes detected, notifying clients...");
    for (const client of this.clients) {
      try {
        client.socket.send("reload");
      } catch {
        this.clients.delete(client);
      }
    }
  }
}
