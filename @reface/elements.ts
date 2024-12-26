import { createTemplateFactory } from "./template/createTemplateFactory.ts";
import type { Template, TemplateFactory } from "@reface/template";
import type * as HTML from "./types/elements.types.ts";

export const createElementTemplate: TemplateFactory = createTemplateFactory({
  type: "element",
  create: {
    defaults: {
      attributes: {} as HTML.HTMLAttributes,
    },
  },
});

// Document Metadata
export const head: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "head" });

export const title: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "title" });

export const base: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "base", void: true });

export const link: Template<HTML.HTMLLinkAttributes, Record<string, any>> =
  createElementTemplate({ tag: "link", void: true });

export const meta: Template<HTML.HTMLMetaAttributes, Record<string, any>> =
  createElementTemplate({ tag: "meta", void: true });

export const style: Template<HTML.HTMLStyleAttributes, Record<string, any>> =
  createElementTemplate({ tag: "style" });

export const body: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "body" });

// Content Sectioning
export const header: Template<HTML.HTMLHeaderAttributes, Record<string, any>> =
  createElementTemplate({ tag: "header" });

export const nav: Template<HTML.HTMLSectioningAttributes, Record<string, any>> =
  createElementTemplate({ tag: "nav" });

export const main: Template<
  HTML.HTMLSectioningAttributes,
  Record<string, any>
> = createElementTemplate({ tag: "main" });

export const article: Template<
  HTML.HTMLSectioningAttributes,
  Record<string, any>
> = createElementTemplate({ tag: "article" });

export const section: Template<
  HTML.HTMLSectioningAttributes,
  Record<string, any>
> = createElementTemplate({ tag: "section" });

// Forms
export const form: Template<HTML.HTMLFormAttributes, Record<string, any>> =
  createElementTemplate({ tag: "form" });

export const label: Template<HTML.HTMLLabelAttributes, Record<string, any>> =
  createElementTemplate({ tag: "label" });

export const input: Template<HTML.HTMLInputAttributes, Record<string, any>> =
  createElementTemplate({ tag: "input", void: true });

export const button: Template<HTML.HTMLButtonAttributes, Record<string, any>> =
  createElementTemplate({ tag: "button" });

export const select: Template<HTML.HTMLSelectAttributes, Record<string, any>> =
  createElementTemplate({ tag: "select" });

export const textarea: Template<
  HTML.HTMLTextareaAttributes,
  Record<string, any>
> = createElementTemplate({ tag: "textarea" });

// Tables
export const table: Template<HTML.HTMLTableAttributes, Record<string, any>> =
  createElementTemplate({ tag: "table" });

export const th: Template<HTML.HTMLThAttributes, Record<string, any>> =
  createElementTemplate({ tag: "th" });

export const td: Template<HTML.HTMLTdAttributes, Record<string, any>> =
  createElementTemplate({ tag: "td" });

// Multimedia
export const img: Template<HTML.HTMLImgAttributes, Record<string, any>> =
  createElementTemplate({ tag: "img", void: true });

export const video: Template<HTML.HTMLVideoAttributes, Record<string, any>> =
  createElementTemplate({ tag: "video" });

export const audio: Template<HTML.HTMLAudioAttributes, Record<string, any>> =
  createElementTemplate({ tag: "audio" });

// Embedded Content
export const iframe: Template<HTML.HTMLIframeAttributes, Record<string, any>> =
  createElementTemplate({ tag: "iframe" });

export const embed: Template<HTML.HTMLEmbedAttributes, Record<string, any>> =
  createElementTemplate({ tag: "embed", void: true });

export const object: Template<HTML.HTMLObjectAttributes, Record<string, any>> =
  createElementTemplate({ tag: "object" });

export const source: Template<HTML.HTMLSourceAttributes, Record<string, any>> =
  createElementTemplate({ tag: "source", void: true });

// Interactive Elements
export const details: Template<
  HTML.HTMLDetailsAttributes,
  Record<string, any>
> = createElementTemplate({ tag: "details" });

export const dialog: Template<HTML.HTMLDialogAttributes, Record<string, any>> =
  createElementTemplate({ tag: "dialog" });

// Text Content
export const p: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "p" });

export const pre: Template<HTML.HTMLPreAttributes, Record<string, any>> =
  createElementTemplate({ tag: "pre" });

export const blockquote: Template<
  HTML.HTMLBlockquoteAttributes,
  Record<string, any>
> = createElementTemplate({ tag: "blockquote" });

export const ol: Template<HTML.HTMLListAttributes, Record<string, any>> =
  createElementTemplate({ tag: "ol" });

export const ul: Template<HTML.HTMLListAttributes, Record<string, any>> =
  createElementTemplate({ tag: "ul" });

export const li: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "li" });

export const dl: Template<HTML.HTMLDlAttributes, Record<string, any>> =
  createElementTemplate({ tag: "dl" });

export const dt: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "dt" });

export const dd: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "dd" });

export const figure: Template<HTML.HTMLFigureAttributes, Record<string, any>> =
  createElementTemplate({ tag: "figure" });

export const figcaption: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "figcaption" });

// Inline Text Semantics
export const a: Template<HTML.HTMLAnchorAttributes, Record<string, any>> =
  createElementTemplate({ tag: "a" });

export const code: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "code" });

export const em: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "em" });

export const strong: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "strong" });

export const small: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "small" });

export const s: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "s" });

export const cite: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "cite" });

export const q: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "q" });

export const time: Template<HTML.HTMLTimeAttributes, Record<string, any>> =
  createElementTemplate({ tag: "time" });

// Table Content
export const caption: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "caption" });

export const thead: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "thead" });

export const tbody: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "tbody" });

export const tfoot: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "tfoot" });

export const tr: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "tr" });

// Forms Additional Elements
export const fieldset: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "fieldset" });

export const legend: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "legend" });

export const optgroup: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "optgroup" });

export const option: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "option" });

// Progress & Meter
export const progress: Template<
  HTML.HTMLProgressAttributes,
  Record<string, any>
> = createElementTemplate({ tag: "progress" });

// Canvas & Scripting
export const canvas: Template<HTML.HTMLCanvasAttributes, Record<string, any>> =
  createElementTemplate({ tag: "canvas" });

export const script: Template<HTML.HTMLScriptAttributes, Record<string, any>> =
  createElementTemplate({ tag: "script" });

// Template
export const template: Template<
  HTML.HTMLTemplateAttributes,
  Record<string, any>
> = createElementTemplate({ tag: "template" });

// SVG Elements
export const svg: Template<HTML.HTMLSVGAttributes, Record<string, any>> =
  createElementTemplate({ tag: "svg" });

export const path: Template<HTML.HTMLPathAttributes, Record<string, any>> =
  createElementTemplate({ tag: "path" });

// Semantic Structure
export const aside: Template<
  HTML.HTMLSectioningAttributes,
  Record<string, any>
> = createElementTemplate({ tag: "aside" });

export const footer: Template<HTML.HTMLFooterAttributes, Record<string, any>> =
  createElementTemplate({ tag: "footer" });

// Generic Containers
export const div: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "div" });

export const span: Template<HTML.HTMLAttributes, Record<string, any>> =
  createElementTemplate({ tag: "span" });
