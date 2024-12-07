import { assertEquals } from "@std/assert";
import pretty from "npm:pretty@2.0.0";

/**
 * Compares two HTML strings after formatting
 */
export function compareHTML(actual: string, expected: string) {
  assertEquals(pretty(actual, { ocd: true }), pretty(expected, { ocd: true }));
}
