import type { HTMLAttributes } from "./base.ts";
import type { EventAttributes } from "./events.ts";
import type { HtmxAttributes } from "./htmx.ts";

export * from "./base.ts";
export * from "./events.ts";
export * from "./htmx.ts";
export * from "../elements/types.ts";
export * from "./aria.ts";

// Объединяем все атрибуты
export type Attributes = HTMLAttributes & EventAttributes & HtmxAttributes;
