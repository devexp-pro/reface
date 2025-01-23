export function isTemplateLiteralCall(
  strings: unknown,
  ...values: unknown[]
): strings is TemplateStringsArray {
  return Array.isArray(strings) && "raw" in strings;
}
