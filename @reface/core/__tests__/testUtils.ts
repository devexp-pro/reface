import { assertEquals } from "@std/assert";
import type { ITemplate } from "../types.ts";
import { Reface } from "../../Reface.ts";
import {
  LoggerPlugin,
  type RenderLogEntry,
} from "../../plugins/LoggerPlugin.ts";

export class TestUtils {
  private reface: Reface;
  private logger: LoggerPlugin | undefined;

  constructor() {
    this.reface = new Reface();
    this.logger = this.reface.getPlugin<LoggerPlugin>("logger");
  }

  private formatRenderLog(logs: RenderLogEntry[]): string {
    return logs
      .map((log) => {
        const time = new Date(log.timestamp).toISOString();
        return `
[${time}] ${log.phase}
Input: ${JSON.stringify(log.input, null, 2)}
${log.output ? `Output: ${log.output}` : ""}
`.trim();
      })
      .join("\n\n");
  }

  private assertHtml(
    actual: string,
    expected: string,
    message?: string,
  ): void {
    const normalizeHtml = (html: string): string =>
      html
        .replace(/\s+/g, " ")
        .replace(/>\s+</g, "><")
        .trim();

    assertEquals(
      normalizeHtml(actual),
      normalizeHtml(expected),
      message,
    );
  }

  assertRender(
    template: ITemplate,
    expected: string,
  ): void {
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

  static instance = new TestUtils();
}

export const assertRender = TestUtils.instance.assertRender.bind(
  TestUtils.instance,
);
