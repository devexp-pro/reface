import type { Template } from "../types.ts";
import type {
  Attributes,
  InputAttributes,
  ImageAttributes,
  AnchorAttributes,
  FormAttributes,
  SVGAttributes,
  MediaAttributes,
  TableCellAttributes,
  CanvasAttributes,
  DialogAttributes,
  TimeAttributes,
  MetaAttributes,
  LinkAttributes,
  StyleAttributes,
  ScriptAttributes,
  BaseAttributes,
  NoscriptAttributes,
} from "./types/mod.ts";
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

// Элементы с типизированными атрибутами
export const input = createElementFactory<InputAttributes>("input");
export const img = createElementFactory<ImageAttributes>("img");
export const a = createElementFactory<AnchorAttributes>("a");
export const form = createElementFactory<FormAttributes>("form");
export const svg = createElementFactory<SVGAttributes>("svg");
export const video = createElementFactory<MediaAttributes>("video");
export const audio = createElementFactory<MediaAttributes>("audio");
export const td = createElementFactory<TableCellAttributes>("td");
export const th = createElementFactory<TableCellAttributes>("th");
export const canvas = createElementFactory<CanvasAttributes>("canvas");
export const dialog = createElementFactory<DialogAttributes>("dialog");
export const time = createElementFactory<TimeAttributes>("time");

// Элементы для <head>
export const meta = createElementFactory<MetaAttributes>("meta");
export const link = createElementFactory<LinkAttributes>("link");
export const style = createElementFactory<StyleAttributes>("style");
export const script = createElementFactory<ScriptAttributes>("script");
export const base = createElementFactory<BaseAttributes>("base");
export const noscript = createElementFactory<NoscriptAttributes>("noscript");

// Обычные HTML элементы
export const div = createElementFactory<Attributes>("div");
export const span = createElementFactory<Attributes>("span");
export const p = createElementFactory<Attributes>("p");
export const button = createElementFactory<Attributes>("button");
export const h1 = createElementFactory<Attributes>("h1");
export const h2 = createElementFactory<Attributes>("h2");
export const h3 = createElementFactory<Attributes>("h3");
export const h4 = createElementFactory<Attributes>("h4");
export const h5 = createElementFactory<Attributes>("h5");
export const h6 = createElementFactory<Attributes>("h6");
export const ul = createElementFactory<Attributes>("ul");
export const ol = createElementFactory<Attributes>("ol");
export const li = createElementFactory<Attributes>("li");
export const table = createElementFactory<Attributes>("table");
export const tr = createElementFactory<Attributes>("tr");
export const thead = createElementFactory<Attributes>("thead");
export const tbody = createElementFactory<Attributes>("tbody");
export const tfoot = createElementFactory<Attributes>("tfoot");
export const section = createElementFactory<Attributes>("section");
export const article = createElementFactory<Attributes>("article");
export const aside = createElementFactory<Attributes>("aside");
export const nav = createElementFactory<Attributes>("nav");
export const header = createElementFactory<Attributes>("header");
export const footer = createElementFactory<Attributes>("footer");
export const main = createElementFactory<Attributes>("main");
export const label = createElementFactory<Attributes>("label");
export const select = createElementFactory<Attributes>("select");
export const option = createElementFactory<Attributes>("option");
export const textarea = createElementFactory<Attributes>("textarea");
export const pre = createElementFactory<Attributes>("pre");
export const code = createElementFactory<Attributes>("code");
export const small = createElementFactory<Attributes>("small");
export const strong = createElementFactory<Attributes>("strong");
export const em = createElementFactory<Attributes>("em");
