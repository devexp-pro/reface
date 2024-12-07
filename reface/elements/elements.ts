import { createElementFactory } from "./createElementFactory.ts";
import type { HTMLAttributes } from "../core/Template.ts";

// Document Metadata
export const head = createElementFactory<HTMLAttributes>("head");
export const title = createElementFactory<HTMLAttributes>("title");
export const base = createElementFactory<HTMLAttributes>("base");
export const link = createElementFactory<HTMLAttributes>("link");
export const meta = createElementFactory<HTMLAttributes>("meta");
export const style = createElementFactory<HTMLAttributes>("style");

// Content Sectioning
export const header = createElementFactory<HTMLAttributes>("header");
export const nav = createElementFactory<HTMLAttributes>("nav");
export const main = createElementFactory<HTMLAttributes>("main");
export const article = createElementFactory<HTMLAttributes>("article");
export const section = createElementFactory<HTMLAttributes>("section");
export const aside = createElementFactory<HTMLAttributes>("aside");
export const footer = createElementFactory<HTMLAttributes>("footer");
export const address = createElementFactory<HTMLAttributes>("address");
export const h1 = createElementFactory<HTMLAttributes>("h1");
export const h2 = createElementFactory<HTMLAttributes>("h2");
export const h3 = createElementFactory<HTMLAttributes>("h3");
export const h4 = createElementFactory<HTMLAttributes>("h4");
export const h5 = createElementFactory<HTMLAttributes>("h5");
export const h6 = createElementFactory<HTMLAttributes>("h6");

// Text Content
export const div = createElementFactory<HTMLAttributes>("div");
export const p = createElementFactory<HTMLAttributes>("p");
export const hr = createElementFactory<HTMLAttributes>("hr");
export const pre = createElementFactory<HTMLAttributes>("pre");
export const blockquote = createElementFactory<HTMLAttributes>("blockquote");
export const ol = createElementFactory<HTMLAttributes>("ol");
export const ul = createElementFactory<HTMLAttributes>("ul");
export const li = createElementFactory<HTMLAttributes>("li");
export const dl = createElementFactory<HTMLAttributes>("dl");
export const dt = createElementFactory<HTMLAttributes>("dt");
export const dd = createElementFactory<HTMLAttributes>("dd");
export const figure = createElementFactory<HTMLAttributes>("figure");
export const figcaption = createElementFactory<HTMLAttributes>("figcaption");

// Inline Text Semantics
export const a = createElementFactory<HTMLAttributes>("a");
export const em = createElementFactory<HTMLAttributes>("em");
export const strong = createElementFactory<HTMLAttributes>("strong");
export const small = createElementFactory<HTMLAttributes>("small");
export const s = createElementFactory<HTMLAttributes>("s");
export const cite = createElementFactory<HTMLAttributes>("cite");
export const q = createElementFactory<HTMLAttributes>("q");
export const dfn = createElementFactory<HTMLAttributes>("dfn");
export const abbr = createElementFactory<HTMLAttributes>("abbr");
export const ruby = createElementFactory<HTMLAttributes>("ruby");
export const rt = createElementFactory<HTMLAttributes>("rt");
export const rp = createElementFactory<HTMLAttributes>("rp");
export const data = createElementFactory<HTMLAttributes>("data");
export const time = createElementFactory<HTMLAttributes>("time");
export const code = createElementFactory<HTMLAttributes>("code");
export const var_ = createElementFactory<HTMLAttributes>("var");
export const samp = createElementFactory<HTMLAttributes>("samp");
export const kbd = createElementFactory<HTMLAttributes>("kbd");
export const sub = createElementFactory<HTMLAttributes>("sub");
export const sup = createElementFactory<HTMLAttributes>("sup");
export const i = createElementFactory<HTMLAttributes>("i");
export const b = createElementFactory<HTMLAttributes>("b");
export const u = createElementFactory<HTMLAttributes>("u");
export const mark = createElementFactory<HTMLAttributes>("mark");
export const bdi = createElementFactory<HTMLAttributes>("bdi");
export const bdo = createElementFactory<HTMLAttributes>("bdo");
export const span = createElementFactory<HTMLAttributes>("span");
export const br = createElementFactory<HTMLAttributes>("br");
export const wbr = createElementFactory<HTMLAttributes>("wbr");

// Image and Multimedia
export const img = createElementFactory<HTMLAttributes>("img");
export const audio = createElementFactory<HTMLAttributes>("audio");
export const video = createElementFactory<HTMLAttributes>("video");
export const track = createElementFactory<HTMLAttributes>("track");
export const map = createElementFactory<HTMLAttributes>("map");
export const area = createElementFactory<HTMLAttributes>("area");

// Embedded Content
export const iframe = createElementFactory<HTMLAttributes>("iframe");
export const embed = createElementFactory<HTMLAttributes>("embed");
export const object = createElementFactory<HTMLAttributes>("object");
export const param = createElementFactory<HTMLAttributes>("param");
export const picture = createElementFactory<HTMLAttributes>("picture");
export const source = createElementFactory<HTMLAttributes>("source");

// Scripting
export const canvas = createElementFactory<HTMLAttributes>("canvas");
export const noscript = createElementFactory<HTMLAttributes>("noscript");
export const script = createElementFactory<HTMLAttributes>("script");

// Table Content
export const table = createElementFactory<HTMLAttributes>("table");
export const caption = createElementFactory<HTMLAttributes>("caption");
export const colgroup = createElementFactory<HTMLAttributes>("colgroup");
export const col = createElementFactory<HTMLAttributes>("col");
export const tbody = createElementFactory<HTMLAttributes>("tbody");
export const thead = createElementFactory<HTMLAttributes>("thead");
export const tfoot = createElementFactory<HTMLAttributes>("tfoot");
export const tr = createElementFactory<HTMLAttributes>("tr");
export const td = createElementFactory<HTMLAttributes>("td");
export const th = createElementFactory<HTMLAttributes>("th");

// Forms
export const form = createElementFactory<HTMLAttributes>("form");
export const label = createElementFactory<HTMLAttributes>("label");
export const input = createElementFactory<HTMLAttributes>("input");
export const button = createElementFactory<HTMLAttributes>("button");
export const select = createElementFactory<HTMLAttributes>("select");
export const datalist = createElementFactory<HTMLAttributes>("datalist");
export const optgroup = createElementFactory<HTMLAttributes>("optgroup");
export const option = createElementFactory<HTMLAttributes>("option");
export const textarea = createElementFactory<HTMLAttributes>("textarea");
export const output = createElementFactory<HTMLAttributes>("output");
export const progress = createElementFactory<HTMLAttributes>("progress");
export const meter = createElementFactory<HTMLAttributes>("meter");
export const fieldset = createElementFactory<HTMLAttributes>("fieldset");
export const legend = createElementFactory<HTMLAttributes>("legend");

// Interactive Elements
export const details = createElementFactory<HTMLAttributes>("details");
export const summary = createElementFactory<HTMLAttributes>("summary");
export const dialog = createElementFactory<HTMLAttributes>("dialog");

// Web Components
export const slot = createElementFactory<HTMLAttributes>("slot");
export const template = createElementFactory<HTMLAttributes>("template");
