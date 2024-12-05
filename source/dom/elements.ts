import type { Template } from "../types.ts";
import type { Attributes } from "./types/mod.ts";
import type { ElementChild } from "./types/base.ts";
import { generateUniqueClass } from "../utils.ts";

export function createElementFactory<T extends Attributes>(tag: string) {
  return (attrsObj: T = {} as T) => {
    const attributes = Object.entries(attrsObj)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    return (
      strings: TemplateStringsArray,
      ...values: ElementChild[]
    ): Template => {
      const args = values.map((value) => {
        if (value === null || value === undefined) {
          return "";
        }
        if (typeof value === "object" && "isTemplate" in value) {
          return value;
        }
        return String(value);
      });

      const children: unknown[] = [];
      if (strings[0]) {
        children.push(strings[0]);
      }

      for (let i = 0; i < values.length; i++) {
        const value = args[i];
        if (value !== "") {
          children.push(value);
        }

        if (strings[i + 1]) {
          children.push(strings[i + 1]);
        }
      }

      const filteredChildren = children
        .filter(Boolean)
        .map((child) => {
          if (typeof child === "string") {
            return child.trim();
          }
          return child;
        })
        .filter(Boolean);

      return {
        tag,
        attributes: attributes || "",
        children: filteredChildren,
        css: "",
        isTemplate: true,
        str: strings,
        args,
        rootClass: generateUniqueClass(),
      };
    };
  };
}

export const div = createElementFactory<Attributes>("div");
export const button = createElementFactory<Attributes>("button");
export const input = createElementFactory<Attributes>("input");
// ... другие элементы
