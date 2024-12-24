import { createTemplateFactory } from "./template/createTemplateFactory.ts";
import type { TemplateFactory, TemplateHtmlAttributes } from "@reface/template";
import type { Template, TemplateAttributes } from "./template/types.ts";

export const createElementTemplate: TemplateFactory = createTemplateFactory({
  type: "element",
  create: {
    defaults: {
      attributes: {} as TemplateAttributes,
    },
  },
});

// Document Metadata
export const head: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "head",
  });
export const title: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "title",
  });
export const base: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "base",
    void: true,
  });
export const link: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "link",
    void: true,
  });
export const meta: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "meta",
    void: true,
  });
export const style: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "style",
  });
export const body: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "body",
  });

// Content Sectioning
export const header: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "header" },
  );
export const nav: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "nav",
  });
export const main: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "main",
  });
export const article: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "article" });
export const section: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "section" });
export const aside: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "aside",
  });
export const footer: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "footer" },
  );
export const address: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "address" });
export const h1: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "h1",
  });
export const h2: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "h2",
  });
export const h3: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "h3",
  });
export const h4: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "h4",
  });
export const h5: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "h5",
  });
export const h6: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "h6",
  });

// Text Content
export const div: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "div",
  });
export const p: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "p",
  });
export const hr: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "hr",
    void: true,
  });
export const pre: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "pre",
  });
export const blockquote: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "blockquote" });
export const ol: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "ol",
  });
export const ul: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "ul",
  });
export const li: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "li",
  });
export const dl: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "dl",
  });
export const dt: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "dt",
  });
export const dd: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "dd",
  });
export const figure: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "figure" },
  );
export const figcaption: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "figcaption" });

// Inline Text Semantics
export const a: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "a",
  });
export const em: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "em",
  });
export const strong: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "strong" },
  );
export const small: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "small",
  });
export const s: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "s",
  });
export const cite: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "cite",
  });
export const q: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "q",
  });
export const dfn: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "dfn",
  });
export const abbr: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "abbr",
  });
export const ruby: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "ruby",
  });
export const rt: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "rt",
  });
export const rp: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "rp",
  });
export const data: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "data",
  });
export const time: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "time",
  });
export const code: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "code",
  });
export const var_: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "var",
  });
export const samp: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "samp",
  });
export const kbd: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "kbd",
  });
export const sub: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "sub",
  });
export const sup: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "sup",
  });
export const i: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "i",
  });
export const b: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "b",
  });
export const u: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "u",
  });
export const mark: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "mark",
  });
export const bdi: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "bdi",
  });
export const bdo: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "bdo",
  });
export const span: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "span",
  });
export const br: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "br",
    void: true,
  });
export const wbr: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "wbr",
    void: true,
  });

// Image and Multimedia
export const img: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "img",
    void: true,
  });
export const audio: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "audio",
  });
export const video: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "video",
  });
export const track: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "track",
    void: true,
  });
export const map: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "map",
  });
export const area: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "area",
    void: true,
  });

// Embedded Content
export const iframe: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "iframe" },
  );
export const embed: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "embed",
    void: true,
  });
export const object: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "object" },
  );
export const param: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "param",
    void: true,
  });
export const picture: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "picture" });
export const source: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "source", void: true },
  );

// Scripting
export const canvas: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "canvas" },
  );
export const noscript: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "noscript" });
export const script: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "script" },
  );

// Table Content
export const table: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "table",
  });
export const caption: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "caption" });
export const colgroup: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "colgroup" });
export const col: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "col",
    void: true,
  });
export const tbody: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "tbody",
  });
export const thead: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "thead",
  });
export const tfoot: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "tfoot",
  });
export const tr: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "tr",
  });
export const td: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "td",
  });
export const th: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "th",
  });

// Forms
export const form: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "form",
  });
export const label: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "label",
  });
export const input: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "input",
    void: true,
  });
export const button: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "button" },
  );
export const select: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "select" },
  );
export const datalist: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "datalist" });
export const optgroup: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "optgroup" });
export const option: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "option" },
  );
export const textarea: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "textarea" });
export const output: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "output" },
  );
export const progress: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "progress" });
export const meter: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "meter",
  });
export const fieldset: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "fieldset" });
export const legend: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "legend" },
  );

// Interactive Elements
export const details: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "details" });
export const summary: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "summary" });
export const dialog: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate(
    { tag: "dialog" },
  );

// Web Components
export const slot: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({
    tag: "slot",
  });
export const template: Template<TemplateHtmlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "template" });
