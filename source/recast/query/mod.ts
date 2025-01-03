export * from "./types.ts";
export * from "./Query.ts";
export * from "./Traverser.ts";

import { Query } from "./Query.ts";

export const $ = Query.from;
