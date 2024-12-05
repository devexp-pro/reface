import type { Template } from "$/types.ts";

export type ClassValue = {
  [key: string]: boolean;
};

export function classNames(...args: (string | ClassValue | undefined)[]) {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === "string") {
      classes.push(arg);
    } else {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) classes.push(key);
      });
    }
  });

  return classes.filter(Boolean).join(" ");
}

export type Attributes = {
  [key: string]: string | number | boolean | undefined;
};

export function attrs(attributes: Attributes): string {
  return Object.entries(attributes)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      if (value === true) return key;
      if (value === false) return "";
      return `${key}="${value}"`;
    })
    .filter(Boolean)
    .join(" ");
}

type ElementChildren = string | Template | null | undefined;

function createElementFactory(tag: string) {
  return (attrs: Attributes = {}) => {
    return (strings: TemplateStringsArray, ...values: ElementChildren[]) => {
      const children = values.map((value) => {
        if (value === null || value === undefined) return "";
        if (typeof value === "string") return value;
        if (value && typeof value === "object" && "isTemplate" in value) {
          return value;
        }
        return String(value);
      });

      const attributes = attrs(attrs);

      return {
        isTemplate: true,
        str: strings,
        args: children,
        tag,
        attributes: attributes ? ` ${attributes}` : "",
      };
    };
  };
}

// HTML элементы
export const div = createElementFactory("div");
export const span = createElementFactory("span");
export const p = createElementFactory("p");
export const a = createElementFactory("a");
export const button = createElementFactory("button");
export const input = createElementFactory("input");
export const form = createElementFactory("form");
export const label = createElementFactory("label");
export const select = createElementFactory("select");
export const option = createElementFactory("option");
export const textarea = createElementFactory("textarea");
export const img = createElementFactory("img");
export const pre = createElementFactory("pre");
export const code = createElementFactory("code");

// Семантические элементы
export const header = createElementFactory("header");
export const nav = createElementFactory("nav");
export const main = createElementFactory("main");
export const footer = createElementFactory("footer");
export const section = createElementFactory("section");
export const article = createElementFactory("article");
export const aside = createElementFactory("aside");

// SVG элементы
export const svg = createElementFactory("svg");
export const path = createElementFactory("path");
export const circle = createElementFactory("circle");
export const rect = createElementFactory("rect");
export const line = createElementFactory("line");
