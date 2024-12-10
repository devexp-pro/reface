import { type ElementChildType, Template } from "@reface/html";

// TODO: move to core
export function createTemplateFunction(tag: string) {
  return (
    attributes: Record<string, unknown> = {},
    css?: string,
    rootClass?: string,
  ) => {
    return (
      strings: TemplateStringsArray,
      ...values: ElementChildType[]
    ): Template => {
      const children = strings.map((str, i) => {
        if (i < values.length) {
          return [str, values[i]];
        }
        return [str];
      }).flat();

      return new Template({
        tag,
        attributes,
        children,
        css,
        rootClass,
      });
    };
  };
}

// Document Metadata
export const head = createTemplateFunction("head");
export const title = createTemplateFunction("title");
export const base = createTemplateFunction("base");
export const link = createTemplateFunction("link");
export const meta = createTemplateFunction("meta");
export const style = createTemplateFunction("style");

// Content Sectioning
export const header = createTemplateFunction("header");
export const nav = createTemplateFunction("nav");
export const main = createTemplateFunction("main");
export const article = createTemplateFunction("article");
export const section = createTemplateFunction("section");
export const aside = createTemplateFunction("aside");
export const footer = createTemplateFunction("footer");
export const address = createTemplateFunction("address");
export const h1 = createTemplateFunction("h1");
export const h2 = createTemplateFunction("h2");
export const h3 = createTemplateFunction("h3");
export const h4 = createTemplateFunction("h4");
export const h5 = createTemplateFunction("h5");
export const h6 = createTemplateFunction("h6");

// Text Content
export const div = createTemplateFunction("div");
export const p = createTemplateFunction("p");
export const hr = createTemplateFunction("hr");
export const pre = createTemplateFunction("pre");
export const blockquote = createTemplateFunction("blockquote");
export const ol = createTemplateFunction("ol");
export const ul = createTemplateFunction("ul");
export const li = createTemplateFunction("li");
export const dl = createTemplateFunction("dl");
export const dt = createTemplateFunction("dt");
export const dd = createTemplateFunction("dd");
export const figure = createTemplateFunction("figure");
export const figcaption = createTemplateFunction("figcaption");

// Inline Text Semantics
export const a = createTemplateFunction("a");
export const em = createTemplateFunction("em");
export const strong = createTemplateFunction("strong");
export const small = createTemplateFunction("small");
export const s = createTemplateFunction("s");
export const cite = createTemplateFunction("cite");
export const q = createTemplateFunction("q");
export const dfn = createTemplateFunction("dfn");
export const abbr = createTemplateFunction("abbr");
export const ruby = createTemplateFunction("ruby");
export const rt = createTemplateFunction("rt");
export const rp = createTemplateFunction("rp");
export const data = createTemplateFunction("data");
export const time = createTemplateFunction("time");
export const code = createTemplateFunction("code");
export const var_ = createTemplateFunction("var");
export const samp = createTemplateFunction("samp");
export const kbd = createTemplateFunction("kbd");
export const sub = createTemplateFunction("sub");
export const sup = createTemplateFunction("sup");
export const i = createTemplateFunction("i");
export const b = createTemplateFunction("b");
export const u = createTemplateFunction("u");
export const mark = createTemplateFunction("mark");
export const bdi = createTemplateFunction("bdi");
export const bdo = createTemplateFunction("bdo");
export const span = createTemplateFunction("span");
export const br = createTemplateFunction("br");
export const wbr = createTemplateFunction("wbr");

// Image and Multimedia
export const img = createTemplateFunction("img");
export const audio = createTemplateFunction("audio");
export const video = createTemplateFunction("video");
export const track = createTemplateFunction("track");
export const map = createTemplateFunction("map");
export const area = createTemplateFunction("area");

// Embedded Content
export const iframe = createTemplateFunction("iframe");
export const embed = createTemplateFunction("embed");
export const object = createTemplateFunction("object");
export const param = createTemplateFunction("param");
export const picture = createTemplateFunction("picture");
export const source = createTemplateFunction("source");

// Scripting
export const canvas = createTemplateFunction("canvas");
export const noscript = createTemplateFunction("noscript");
export const script = createTemplateFunction("script");

// Table Content
export const table = createTemplateFunction("table");
export const caption = createTemplateFunction("caption");
export const colgroup = createTemplateFunction("colgroup");
export const col = createTemplateFunction("col");
export const tbody = createTemplateFunction("tbody");
export const thead = createTemplateFunction("thead");
export const tfoot = createTemplateFunction("tfoot");
export const tr = createTemplateFunction("tr");
export const td = createTemplateFunction("td");
export const th = createTemplateFunction("th");

// Forms
export const form = createTemplateFunction("form");
export const label = createTemplateFunction("label");
export const input = createTemplateFunction("input");
export const button = createTemplateFunction("button");
export const select = createTemplateFunction("select");
export const datalist = createTemplateFunction("datalist");
export const optgroup = createTemplateFunction("optgroup");
export const option = createTemplateFunction("option");
export const textarea = createTemplateFunction("textarea");
export const output = createTemplateFunction("output");
export const progress = createTemplateFunction("progress");
export const meter = createTemplateFunction("meter");
export const fieldset = createTemplateFunction("fieldset");
export const legend = createTemplateFunction("legend");

// Interactive Elements
export const details = createTemplateFunction("details");
export const summary = createTemplateFunction("summary");
export const dialog = createTemplateFunction("dialog");

// Web Components
export const slot = createTemplateFunction("slot");
export const template = createTemplateFunction("template");
