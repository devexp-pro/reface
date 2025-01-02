import { assertEquals } from "@std/assert";
import type { Template } from "../mod.ts";
import { RefaceComposer } from "../RefaceComposer.ts";
import { LoggerPlugin } from "../plugins/LoggerPlugin.ts";
import type { TestUtilsOptions } from "./types.ts";

export class TestUtils {
  public composer: RefaceComposer;
  private logger: LoggerPlugin;

  constructor(options: TestUtilsOptions = {}) {
    this.composer = new RefaceComposer();
    this.logger = new LoggerPlugin();
    this.composer.use(this.logger);
    options.plugins?.forEach((plugin) => this.composer.use(plugin));
  }

  private assertHtml(actual: string, expected: string, message?: string): void {
    const normalizeHtml = (html: string): string =>
      html.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();

    assertEquals(normalizeHtml(actual), normalizeHtml(expected), message);
  }

  assertRender(template: Template<any, any>, expected: string): void {
    const actual = this.composer.render(template);

    try {
      this.assertHtml(actual, expected);
    } catch (error) {
      if (this.logger) {
        const messages = [
          "Render assertion failed:",
          `Expected: ${expected}`,
          `Received: ${actual}`,
          "",
          "Render log:",
          this.logger.toText(),
        ].filter(Boolean);

        console.log(messages.join("\n"));
      }
      throw error;
    }
  }
}
