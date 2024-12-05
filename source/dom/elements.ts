import type { Template } from "../types.ts";
import type {
  Attributes,
  ElementChildren,
  InputAttributes,
  ImageAttributes,
  AnchorAttributes,
  FormAttributes,
  SVGAttributes,
} from "./types.ts";
import { attrs } from "./attributes.ts";

export function createElementFactory<T extends Attributes = Attributes>(
  tag: string
): (
  attrs?: T
) => (...args: [TemplateStringsArray, ...ElementChildren]) => Template {
  return (attrsObj: T = {} as T) => {
    const attributes = attrs(attrsObj);
    return (strings: TemplateStringsArray, ...values: ElementChildren) => {
      const result: (string | Template)[] = [];

      for (let i = 0; i < strings.length; i++) {
        const str = strings[i];
        if (str.trim()) result.push(str);

        if (i < values.length) {
          const value = values[i];
          if (value === null || value === undefined) {
            continue;
          } else if (typeof value === "string" || typeof value === "number") {
            const strValue = String(value).trim();
            if (strValue) result.push(strValue);
          } else if (typeof value === "object" && "isTemplate" in value) {
            result.push(value);
          } else {
            const strValue = String(value).trim();
            if (strValue) result.push(strValue);
          }
        }
      }

      return {
        isTemplate: true,
        str: strings,
        args: result,
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

// Табличные элементы
export const table = createElementFactory<Attributes>("table");
export const thead = createElementFactory<Attributes>("thead");
export const tbody = createElementFactory<Attributes>("tbody");
export const tr = createElementFactory<Attributes>("tr");
export const th = createElementFactory<Attributes>("th");
export const td = createElementFactory<Attributes>("td");

// Списки
export const ul = createElementFactory<Attributes>("ul");
export const ol = createElementFactory<Attributes>("ol");
export const li = createElementFactory<Attributes>("li");

// Медиа элементы
export const video = createElementFactory<Attributes>("video");
export const audio = createElementFactory<Attributes>("audio");
export const source = createElementFactory<Attributes>("source");
