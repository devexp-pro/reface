import type {
  Attributes,
  ClassInput,
  ElementChildren,
  ElementFactory,
  InputAttributes,
  ImageAttributes,
  AnchorAttributes,
  FormAttributes,
  SVGAttributes,
} from "./types.ts";

export function classNames(...args: ClassInput[]): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === "string") {
      classes.push(...arg.split(" ").filter(Boolean));
    } else if (typeof arg === "object") {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) classes.push(key);
      });
    }
  });

  return classes.filter(Boolean).join(" ");
}

export function attrs(attributes: Attributes): string {
  return Object.entries(attributes)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      if (key === "class") {
        value = classNames(value);
      }
      if (value === true) return key;
      if (value === false) return "";
      return `${key}="${value}"`;
    })
    .filter(Boolean)
    .join(" ");
}

function createElementFactory<T extends Attributes = Attributes>(
  tag: string
): (
  attrs?: T
) => (...args: [TemplateStringsArray, ...ElementChildren]) => Template {
  return (attrsObj: T = {} as T) => {
    const attributes = attrs(attrsObj);
    return (strings: TemplateStringsArray, ...values: ElementChildren) => {
      const children = values.map((value) => {
        if (value === null || value === undefined) return "";
        if (typeof value === "string") return value;
        if (value && typeof value === "object" && "isTemplate" in value) {
          return value;
        }
        return String(value);
      });

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

// HTML элементы с типизированными атрибутами
export const input = createElementFactory<InputAttributes>("input");
export const img = createElementFactory<ImageAttributes>("img");
export const a = createElementFactory<AnchorAttributes>("a");
export const form = createElementFactory<FormAttributes>("form");

// Обычные HTML элементы
export const div = createElementFactory<Attributes>("div");
export const span = createElementFactory<Attributes>("span");
export const p = createElementFactory<Attributes>("p");
export const button = createElementFactory<Attributes>("button");
export const label = createElementFactory<Attributes>("label");
export const select = createElementFactory<Attributes>("select");
export const option = createElementFactory<Attributes>("option");
export const textarea = createElementFactory<Attributes>("textarea");
export const pre = createElementFactory<Attributes>("pre");
export const code = createElementFactory<Attributes>("code");

// Семантические элементы
export const header = createElementFactory<Attributes>("header");
export const nav = createElementFactory<Attributes>("nav");
export const main = createElementFactory<Attributes>("main");
export const footer = createElementFactory<Attributes>("footer");
export const section = createElementFactory<Attributes>("section");
export const article = createElementFactory<Attributes>("article");
export const aside = createElementFactory<Attributes>("aside");

// SVG элементы
export const svg = createElementFactory<SVGAttributes>("svg");
export const path = createElementFactory<SVGAttributes>("path");
export const circle = createElementFactory<SVGAttributes>("circle");
export const rect = createElementFactory<SVGAttributes>("rect");
export const line = createElementFactory<SVGAttributes>("line");

// Реэкспорт типов
export * from "./types.ts";
