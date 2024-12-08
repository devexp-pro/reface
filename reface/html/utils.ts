/**
 * Check if element is void (self-closing)
 */
export function isVoidElement(tag: string): boolean {
  return VOID_ELEMENTS.has(tag.toLowerCase());
}

/**
 * Check if element is self-closing
 */
export function isSelfClosing(tag: string): boolean {
  return isVoidElement(tag) || tag.endsWith("/");
}

// Список void элементов
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);
