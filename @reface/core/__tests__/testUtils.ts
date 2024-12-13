import { assertEquals, AssertionError } from "@std/assert";
import type { ITemplate } from "../types.ts";
import { RenderManager } from "../render/RenderManager.ts";
import { LoggerPlugin, type RenderLogEntry } from "../plugins/LoggerPlugin.ts";

function formatRenderLog(logs: RenderLogEntry[]): string {
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

export function assertRender(
  template: ITemplate,
  expected: string,
): void {
  const logger = new LoggerPlugin();
  const manager = new RenderManager();

  logger.install(manager);

  const actual = manager.render(template);

  try {
    assertHtml(actual, expected);
  } catch (error) {
    const logs = logger.getLogs();
    const messages = [
      "Render assertion failed:",
      `Expected: ${expected}`,
      `Received: ${actual}`,
      "",
      "Render log:",
      formatRenderLog(logs),
    ].filter(Boolean);

    console.log(messages.join("\n"));

    throw error;
  }
}

export function assertHtml(
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
