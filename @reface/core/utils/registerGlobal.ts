export function registerGlobal(
  namespace: string | undefined,
  exports: Record<string, unknown>,
): void {
  const g: { [key: string]: any } | undefined =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : undefined;

  if (!g) return;

  if (namespace) {
    g[namespace] = exports;
  } else {
    for (const [key, value] of Object.entries(exports)) {
      g[key] = value;
    }
  }
}
