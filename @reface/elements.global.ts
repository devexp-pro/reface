import type { IElementFunction } from "@reface/types";
import * as elements from "./elements.ts";
import { registerGlobal } from "./utils/registerGlobal.ts";

declare global {
  // Объявляем каждый элемент отдельно
  const div: IElementFunction;
  const span: IElementFunction;
  const p: IElementFunction;
  const section: IElementFunction;
  const article: IElementFunction;
  const main: IElementFunction;
  const header: IElementFunction;
  const footer: IElementFunction;
  const nav: IElementFunction;
  const aside: IElementFunction;
  const body: IElementFunction;
  const head: IElementFunction;
  const h1: IElementFunction;
  const h2: IElementFunction;
  const h3: IElementFunction;
  const h4: IElementFunction;
  const h5: IElementFunction;
  const h6: IElementFunction;
  const strong: IElementFunction;
  const em: IElementFunction;
  const pre: IElementFunction;
  const code: IElementFunction;
  const a: IElementFunction;
  const button: IElementFunction;
  const form: IElementFunction;
  const input: IElementFunction;
  const textarea: IElementFunction;
  const select: IElementFunction;
  const option: IElementFunction;
  const label: IElementFunction;
  const table: IElementFunction;
  const thead: IElementFunction;
  const tbody: IElementFunction;
  const tr: IElementFunction;
  const th: IElementFunction;
  const td: IElementFunction;
  const img: IElementFunction;
  const video: IElementFunction;
  const audio: IElementFunction;
  const meta: IElementFunction;
  const link: IElementFunction;
  const script: IElementFunction;
  const style: IElementFunction;
  const title: IElementFunction;
}

registerGlobal("", elements);
