import { createTemplateFactory } from "./template/createTemplateFactory.ts";
import type { TemplateAttributes } from "./template/types.ts";

export const createElementTemplate = createTemplateFactory({
  type: "element",
  create: {
    defaults: {
      attributes: {} as TemplateAttributes,
    },
  },
});

// Document Metadata
export const head = createElementTemplate({ tag: "head" });
export const title = createElementTemplate({ tag: "title" });
export const base = createElementTemplate({ tag: "base", void: true });
export const link = createElementTemplate({ tag: "link", void: true });
export const meta = createElementTemplate({ tag: "meta", void: true });
export const style = createElementTemplate({ tag: "style" });
export const body = createElementTemplate({ tag: "body" });

// Content Sectioning
export const header = createElementTemplate({ tag: "header" });
export const nav = createElementTemplate({ tag: "nav" });
export const main = createElementTemplate({ tag: "main" });
export const article = createElementTemplate({ tag: "article" });
export const section = createElementTemplate({ tag: "section" });
export const aside = createElementTemplate({ tag: "aside" });
export const footer = createElementTemplate({ tag: "footer" });
export const address = createElementTemplate({ tag: "address" });
export const h1 = createElementTemplate({ tag: "h1" });
export const h2 = createElementTemplate({ tag: "h2" });
export const h3 = createElementTemplate({ tag: "h3" });
export const h4 = createElementTemplate({ tag: "h4" });
export const h5 = createElementTemplate({ tag: "h5" });
export const h6 = createElementTemplate({ tag: "h6" });

// Text Content
export const div = createElementTemplate({ tag: "div" });
export const p = createElementTemplate({ tag: "p" });
export const hr = createElementTemplate({ tag: "hr", void: true });
export const pre = createElementTemplate({ tag: "pre" });
export const blockquote = createElementTemplate({ tag: "blockquote" });
export const ol = createElementTemplate({ tag: "ol" });
export const ul = createElementTemplate({ tag: "ul" });
export const li = createElementTemplate({ tag: "li" });
export const dl = createElementTemplate({ tag: "dl" });
export const dt = createElementTemplate({ tag: "dt" });
export const dd = createElementTemplate({ tag: "dd" });
export const figure = createElementTemplate({ tag: "figure" });
export const figcaption = createElementTemplate({ tag: "figcaption" });

// Inline Text Semantics
export const a = createElementTemplate({ tag: "a" });
export const em = createElementTemplate({ tag: "em" });
export const strong = createElementTemplate({ tag: "strong" });
export const small = createElementTemplate({ tag: "small" });
export const s = createElementTemplate({ tag: "s" });
export const cite = createElementTemplate({ tag: "cite" });
export const q = createElementTemplate({ tag: "q" });
export const dfn = createElementTemplate({ tag: "dfn" });
export const abbr = createElementTemplate({ tag: "abbr" });
export const ruby = createElementTemplate({ tag: "ruby" });
export const rt = createElementTemplate({ tag: "rt" });
export const rp = createElementTemplate({ tag: "rp" });
export const data = createElementTemplate({ tag: "data" });
export const time = createElementTemplate({ tag: "time" });
export const code = createElementTemplate({ tag: "code" });
export const var_ = createElementTemplate({ tag: "var" });
export const samp = createElementTemplate({ tag: "samp" });
export const kbd = createElementTemplate({ tag: "kbd" });
export const sub = createElementTemplate({ tag: "sub" });
export const sup = createElementTemplate({ tag: "sup" });
export const i = createElementTemplate({ tag: "i" });
export const b = createElementTemplate({ tag: "b" });
export const u = createElementTemplate({ tag: "u" });
export const mark = createElementTemplate({ tag: "mark" });
export const bdi = createElementTemplate({ tag: "bdi" });
export const bdo = createElementTemplate({ tag: "bdo" });
export const span = createElementTemplate({ tag: "span" });
export const br = createElementTemplate({ tag: "br", void: true });
export const wbr = createElementTemplate({ tag: "wbr", void: true });

// Image and Multimedia
export const img = createElementTemplate({ tag: "img", void: true });
export const audio = createElementTemplate({ tag: "audio" });
export const video = createElementTemplate({ tag: "video" });
export const track = createElementTemplate({ tag: "track", void: true });
export const map = createElementTemplate({ tag: "map" });
export const area = createElementTemplate({ tag: "area", void: true });

// Embedded Content
export const iframe = createElementTemplate({ tag: "iframe" });
export const embed = createElementTemplate({ tag: "embed", void: true });
export const object = createElementTemplate({ tag: "object" });
export const param = createElementTemplate({ tag: "param", void: true });
export const picture = createElementTemplate({ tag: "picture" });
export const source = createElementTemplate({ tag: "source", void: true });

// Scripting
export const canvas = createElementTemplate({ tag: "canvas" });
export const noscript = createElementTemplate({ tag: "noscript" });
export const script = createElementTemplate({ tag: "script" });

// Table Content
export const table = createElementTemplate({ tag: "table" });
export const caption = createElementTemplate({ tag: "caption" });
export const colgroup = createElementTemplate({ tag: "colgroup" });
export const col = createElementTemplate({ tag: "col", void: true });
export const tbody = createElementTemplate({ tag: "tbody" });
export const thead = createElementTemplate({ tag: "thead" });
export const tfoot = createElementTemplate({ tag: "tfoot" });
export const tr = createElementTemplate({ tag: "tr" });
export const td = createElementTemplate({ tag: "td" });
export const th = createElementTemplate({ tag: "th" });

// Forms
export const form = createElementTemplate({ tag: "form" });
export const label = createElementTemplate({ tag: "label" });
export const input = createElementTemplate({ tag: "input", void: true });
export const button = createElementTemplate({ tag: "button" });
export const select = createElementTemplate({ tag: "select" });
export const datalist = createElementTemplate({ tag: "datalist" });
export const optgroup = createElementTemplate({ tag: "optgroup" });
export const option = createElementTemplate({ tag: "option" });
export const textarea = createElementTemplate({ tag: "textarea" });
export const output = createElementTemplate({ tag: "output" });
export const progress = createElementTemplate({ tag: "progress" });
export const meter = createElementTemplate({ tag: "meter" });
export const fieldset = createElementTemplate({ tag: "fieldset" });
export const legend = createElementTemplate({ tag: "legend" });

// Interactive Elements
export const details = createElementTemplate({ tag: "details" });
export const summary = createElementTemplate({ tag: "summary" });
export const dialog = createElementTemplate({ tag: "dialog" });

// Web Components
export const slot = createElementTemplate({ tag: "slot" });
export const template = createElementTemplate({ tag: "template" });
