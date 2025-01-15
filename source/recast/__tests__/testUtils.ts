import { assertEquals } from "@std/assert";
import type { Template } from "@reface/template";
import { RefaceComposer } from "../RefaceComposer.ts";
import type { IRefaceComposerPlugin } from "@reface/types";
import { LoggerPlugin } from "@framework";

export interface TestUtilsOptions {
  plugins?: IRefaceComposerPlugin[];
}

export class TestUtils {
  public reface: RefaceComposer;
  private logger: LoggerPlugin;

  constructor(options: TestUtilsOptions = {}) {
    this.reface = new RefaceComposer();
    this.logger = new LoggerPlugin();
    this.reface.use(this.logger);
    options.plugins?.forEach((plugin) => this.reface.use(plugin));
  }

  private assertHtml(actual: string, expected: string, message?: string): void {
    const normalizeHtml = (html: string): string =>
      html.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();

    assertEquals(normalizeHtml(actual), normalizeHtml(expected), message);
  }

  assertRender(template: Template<any, any>, expected: string): void {
    const actual = this.reface.render(template);

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
