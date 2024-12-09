import { assertEquals } from "@std/assert";
import pretty from "npm:pretty@2.0.0";
import type { CompareHTMLOptions } from "./types.ts";

/**
 * Compares two HTML strings after formatting
 */
export function compareHTML(
  actual: string,
  expected: string,
  options: CompareHTMLOptions = {},
) {
  const { ignoreWhitespace = true } = options;

  const formatOptions = {
    ocd: true,
    ...(ignoreWhitespace ? { preserveWhitespace: false } : {}),
  };
  assertEquals(pretty(actual, formatOptions), pretty(expected, formatOptions));
}
