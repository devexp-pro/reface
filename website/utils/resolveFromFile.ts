/**
 * @usage
 * ```ts
 * const path = resolveFromFile("../docs", import.meta.url);
 * ```
 */
export function resolveFromFile(
  relativePath: string,
  importMetaUrl: string,
): string {
  return new URL(relativePath, importMetaUrl).pathname;
}
