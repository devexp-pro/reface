import { default as pretty } from "https://esm.sh/pretty@2.0.0";
import { assertEquals } from "@std/assert";

export function assertHtml(actual: string, expected: string) {
  return assertEquals(formatHtml(actual), formatHtml(expected));
}

export function formatHtml(html: string): string {
  return pretty(html, { ocd: true });
}
