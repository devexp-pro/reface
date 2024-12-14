import { createElement } from "./createElement.ts";
import { Fragment } from "./Fragment.ts";
import { registerGlobal } from "../utils/registerGlobal.ts";

// Экспортируем функции
export { createElement, Fragment };

// Регистрируем глобально
export function registerJSX(namespace?: string): void {
  registerGlobal(namespace, { createElement, Fragment });
}
