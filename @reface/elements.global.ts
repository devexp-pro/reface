import * as elements from "./elements.ts";
import type {
  ComponentProps,
  ComponentWithProps,
  IRefaceTemplateElement,
} from "@reface/types";
import { registerGlobal } from "./utils/registerGlobal.ts";

type El = ComponentWithProps<ComponentProps, IRefaceTemplateElement>;

declare global {
  // Объявляем каждый элемент отдельно
  const div: El;
  const span: El;
  const p: El;
  const section: El;
  const article: El;
  const main: El;
  const header: El;
  const footer: El;
  const nav: El;
  const aside: El;
  const body: El;
  const head: El;
  const h1: El;
  const h2: El;
  const h3: El;
  const h4: El;
  const h5: El;
  const h6: El;
  const strong: El;
  const em: El;
  const pre: El;
  const code: El;
  const a: El;
  const button: El;
  const form: El;
  const input: El;
  const textarea: El;
  const select: El;
  const option: El;
  const label: El;
  const table: El;
  const thead: El;
  const tbody: El;
  const tr: El;
  const th: El;
  const td: El;
  const img: El;
  const video: El;
  const audio: El;
  const meta: El;
  const link: El;
  const script: El;
  const style: El;
  const title: El;
}

registerGlobal("", elements);
