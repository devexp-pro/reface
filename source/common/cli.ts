import * as path from "jsr:@std/path";
import { findAvailablePort } from "./port.ts";

export interface CLIConfig {
  name: string;
  childEnvKey: string;
  port: number;
  rootPath: string;
  watchPaths: string[];
  watchExtensions: string[];
  isDev?: boolean;
}

export function createCLI(config: CLIConfig) {
  const IS_CHILD = Deno.env.get(config.childEnvKey) === "true";
  const IS_DEV = config.isDev ?? true;
  let port: number;

  async function initialize() {
    port = await findAvailablePort(config.port);
  }

  async function watchAndRestart(onStart: () => Promise<void>) {
    if (IS_CHILD) {
      await initialize();
      await onStart();
      return;
    }

    let process: Deno.Process | null = null;
    let restarting = false;

    const restart = async () => {
      if (restarting) return;
      restarting = true;

      console.clear();
      console.log(`Restarting ${config.name} server...`);

      if (process) {
        try {
          process.kill("SIGTERM");
          await process.status();
        } catch (e) {
        }
      }

      process = new Deno.Command("deno", {
        args: ["run", "-A", Deno.mainModule, ...Deno.args],
        stdout: "inherit",
        stderr: "inherit",
        env: {
          [config.childEnvKey]: "true",
        },
      }).spawn();

      restarting = false;
    };

    await restart();

    let timeout: number | null = null;
    const watcher = Deno.watchFs(config.watchPaths, { recursive: true });

    for await (const event of watcher) {
      if (event.kind === "modify") {
        const isRelevant = event.paths.some((path) =>
          config.watchExtensions.some((ext) => path.endsWith(ext))
        );

        if (isRelevant) {
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => restart(), 100);
        }
      }
    }
  }

  function printInfo(messages: string[]) {
    console.clear();
    messages.forEach((message) => {
      console.log(message);
    });
    console.log();
  }

  function validateRootPath() {
    try {
      const rootPath = path.resolve(Deno.cwd(), config.rootPath);
      const stat = Deno.statSync(rootPath);
      if (!stat.isDirectory) {
        throw new Error("Not a directory");
      }
      return rootPath;
    } catch (e) {
      console.error(`Error: Directory '${config.rootPath}' does not exist`);
      Deno.exit(1);
    }
  }

  return {
    IS_CHILD,
    IS_DEV,
    initialize,
    get port() {
      return port;
    },
    watchAndRestart,
    printInfo,
    validateRootPath,
  };
}
