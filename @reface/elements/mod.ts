import * as elements from "./elements.ts";
import { registerGlobal } from "../core/utils/registerGlobal.ts";

export * from "./elements.ts";

export function registerElements(namespace?: string): void {
  registerGlobal(namespace, elements);
}
