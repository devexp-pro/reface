import { assertEquals } from "@std/assert";

/**
 * Compares rendered HTML with expected result.
 * Normalizes whitespace and formatting for consistent comparison.
 *
 * @param actual - Rendered HTML string
 * @param expected - Expected HTML string
 * @param message - Optional assertion message
 *
 * @example
 * assertHtml(
 *   manager.render(template),
 *   '<div class="container">content</div>'
 * );
 */
export function assertHtml(
  actual: string,
  expected: string,
  message?: string,
): void {
  // Нормализуем пробелы и переносы строк
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
