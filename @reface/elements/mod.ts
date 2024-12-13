import * as elements from "./elements.ts";

export * from "./elements.ts";

export function registerElements(namespace?: string): void {
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
    g[namespace] = elements;
  } else {
    for (const [key, value] of Object.entries(elements)) {
      g[key] = value;
    }
  }
}
