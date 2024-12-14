import { assertEquals } from "@std/assert";
import type { IPlugin, ITemplate } from "../core/types.ts";
import { Reface } from "../Reface.ts";
import { LoggerPlugin, type RenderLogEntry } from "../plugins/LoggerPlugin.ts";

export interface TestUtilsOptions {
  plugins?: IPlugin[];
}

export class TestUtils {
  public reface: Reface;
  private logger: LoggerPlugin;

  constructor(options: TestUtilsOptions = {}) {
    this.reface = new Reface();
    this.logger = new LoggerPlugin();

    // Добавляем логгер первым
    this.reface.use(this.logger);

    // Добавляем остальные плагины
    options.plugins?.forEach((plugin) => this.reface.use(plugin));
  }

  private formatRenderLog(logs: RenderLogEntry[]): string {
    return logs
      .map((log) => {
        const time = new Date(log.timestamp).toISOString();
        return `[${time}] ${log.phase}\nInput: ${
          JSON.stringify(log.input, null, 2)
        }\n${log.output ? `Output: ${log.output}` : ""}`.trim();
      })
      .join("\n\n");
  }

  private assertHtml(actual: string, expected: string, message?: string): void {
    const normalizeHtml = (html: string): string =>
      html.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();

    assertEquals(normalizeHtml(actual), normalizeHtml(expected), message);
  }

  assertRender(template: ITemplate, expected: string): void {
    const actual = this.reface.render(template);

    try {
      this.assertHtml(actual, expected);
    } catch (error) {
      if (this.logger) {
        const logs = this.logger.getLogs();
        const messages = [
          "Render assertion failed:",
          `Expected: ${expected}`,
          `Received: ${actual}`,
          "",
          "Render log:",
          this.formatRenderLog(logs),
        ].filter(Boolean);

        console.log(messages.join("\n"));
      }
      throw error;
    }
  }
}
