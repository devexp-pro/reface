import { createElementFactory } from "./createElementFactory.ts";
import type { ElementFactory } from "../dom/types/base.ts";
import type {
  HTMLAttributes,
  FormAttributes,
  TableAttributes,
  MediaAttributes,
  SVGAttributes,
  HeadAttributes,
  AnchorAttributes,
  ButtonAttributes,
  InputAttributes,
  TextareaAttributes,
  SelectAttributes,
  OptionAttributes,
  ImgAttributes,
  VideoAttributes,
} from "./types.ts";

// HTML Elements
export const div: ElementFactory<HTMLAttributes> = createElementFactory("div");
export const span: ElementFactory<HTMLAttributes> =
  createElementFactory("span");
export const p: ElementFactory<HTMLAttributes> = createElementFactory("p");
export const a: ElementFactory<AnchorAttributes> = createElementFactory("a");
export const button: ElementFactory<ButtonAttributes> =
  createElementFactory("button");

// Form Elements
export const form: ElementFactory<FormAttributes> =
  createElementFactory("form");
export const label: ElementFactory<FormAttributes> =
  createElementFactory("label");
export const select: ElementFactory<SelectAttributes> =
  createElementFactory("select");
export const option: ElementFactory<OptionAttributes> =
  createElementFactory("option");
export const textarea: ElementFactory<TextareaAttributes> =
  createElementFactory("textarea");
export const input: ElementFactory<InputAttributes> =
  createElementFactory("input");

// Heading Elements
export const h1: ElementFactory<HTMLAttributes> = createElementFactory("h1");
export const h2: ElementFactory<HTMLAttributes> = createElementFactory("h2");
export const h3: ElementFactory<HTMLAttributes> = createElementFactory("h3");
export const h4: ElementFactory<HTMLAttributes> = createElementFactory("h4");
export const h5: ElementFactory<HTMLAttributes> = createElementFactory("h5");
export const h6: ElementFactory<HTMLAttributes> = createElementFactory("h6");

// List Elements
export const ul: ElementFactory<HTMLAttributes> = createElementFactory("ul");
export const ol: ElementFactory<HTMLAttributes> = createElementFactory("ol");
export const li: ElementFactory<HTMLAttributes> = createElementFactory("li");

// Table Elements
export const table: ElementFactory<TableAttributes> =
  createElementFactory("table");
export const thead: ElementFactory<TableAttributes> =
  createElementFactory("thead");
export const tbody: ElementFactory<TableAttributes> =
  createElementFactory("tbody");
export const tfoot: ElementFactory<TableAttributes> =
  createElementFactory("tfoot");
export const tr: ElementFactory<TableAttributes> = createElementFactory("tr");
export const td: ElementFactory<TableAttributes> = createElementFactory("td");
export const th: ElementFactory<TableAttributes> = createElementFactory("th");

// Semantic Elements
export const article: ElementFactory<HTMLAttributes> =
  createElementFactory("article");
export const section: ElementFactory<HTMLAttributes> =
  createElementFactory("section");
export const nav: ElementFactory<HTMLAttributes> = createElementFactory("nav");
export const aside: ElementFactory<HTMLAttributes> =
  createElementFactory("aside");
export const header: ElementFactory<HTMLAttributes> =
  createElementFactory("header");
export const footer: ElementFactory<HTMLAttributes> =
  createElementFactory("footer");
export const main: ElementFactory<HTMLAttributes> =
  createElementFactory("main");

// Inline Elements
export const strong: ElementFactory<HTMLAttributes> =
  createElementFactory("strong");
export const em: ElementFactory<HTMLAttributes> = createElementFactory("em");
export const small: ElementFactory<HTMLAttributes> =
  createElementFactory("small");
export const code: ElementFactory<HTMLAttributes> =
  createElementFactory("code");
export const pre: ElementFactory<HTMLAttributes> = createElementFactory("pre");

// Media Elements
export const img: ElementFactory<ImgAttributes> = createElementFactory("img");
export const video: ElementFactory<VideoAttributes> =
  createElementFactory("video");
export const audio: ElementFactory<MediaAttributes> =
  createElementFactory("audio");
export const canvas: ElementFactory<MediaAttributes> =
  createElementFactory("canvas");

// Other Elements
export const dialog: ElementFactory<HTMLAttributes> =
  createElementFactory("dialog");
export const time: ElementFactory<HTMLAttributes> =
  createElementFactory("time");

// Head Elements
export const meta: ElementFactory<HeadAttributes> =
  createElementFactory("meta");
export const link: ElementFactory<HeadAttributes> =
  createElementFactory("link");
export const style: ElementFactory<HeadAttributes> =
  createElementFactory("style");
export const script: ElementFactory<HeadAttributes> =
  createElementFactory("script");
export const noscript: ElementFactory<HeadAttributes> =
  createElementFactory("noscript");

// SVG Elements
export const svg: ElementFactory<SVGAttributes> = createElementFactory("svg");
export const path: ElementFactory<SVGAttributes> = createElementFactory("path");
export const circle: ElementFactory<SVGAttributes> =
  createElementFactory("circle");
export const rect: ElementFactory<SVGAttributes> = createElementFactory("rect");
export const line: ElementFactory<SVGAttributes> = createElementFactory("line");
export const polyline: ElementFactory<SVGAttributes> =
  createElementFactory("polyline");
export const polygon: ElementFactory<SVGAttributes> =
  createElementFactory("polygon");

// Void Elements
export const br: ElementFactory<HTMLAttributes> = createElementFactory("br");
export const hr: ElementFactory<HTMLAttributes> = createElementFactory("hr");
export const area: ElementFactory<HTMLAttributes> =
  createElementFactory("area");
export const col: ElementFactory<HTMLAttributes> = createElementFactory("col");
export const embed: ElementFactory<HTMLAttributes> =
  createElementFactory("embed");
export const source: ElementFactory<HTMLAttributes> =
  createElementFactory("source");
export const track: ElementFactory<HTMLAttributes> =
  createElementFactory("track");
export const wbr: ElementFactory<HTMLAttributes> = createElementFactory("wbr");
