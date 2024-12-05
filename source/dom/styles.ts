import type { StyleInput } from "./types/mod.ts";

export function styles(...args: StyleInput[]): string {
  const result: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === "string") {
      result.push(arg);
    } else {
      Object.entries(arg).forEach(([key, value]) => {
        if (value !== undefined) {
          result.push(`${key}: ${value};`);
        }
      });
    }
  });

  return result.join(" ");
}
