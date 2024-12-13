import { HxBuilder } from "./builder.ts";
export type * from "./types.ts";

export function hx(): HxBuilder {
  return new HxBuilder();
}

export { HxBuilder };
