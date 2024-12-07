import type { HTMLAttributes } from "../core/Template.ts";
import { createElementFactory } from "./factory.ts";

// Document structure
export const div = createElementFactory<HTMLAttributes>("div");
export const span = createElementFactory<HTMLAttributes>("span");
export const p = createElementFactory<HTMLAttributes>("p");
export const main = createElementFactory<HTMLAttributes>("main");
export const section = createElementFactory<HTMLAttributes>("section");
export const article = createElementFactory<HTMLAttributes>("article");
export const header = createElementFactory<HTMLAttributes>("header");
export const nav = createElementFactory<HTMLAttributes>("nav");
export const footer = createElementFactory<HTMLAttributes>("footer");

// Typography
export const h1 = createElementFactory<HTMLAttributes>("h1");
export const h2 = createElementFactory<HTMLAttributes>("h2");
export const h3 = createElementFactory<HTMLAttributes>("h3");
export const h4 = createElementFactory<HTMLAttributes>("h4");
export const h5 = createElementFactory<HTMLAttributes>("h5");
export const h6 = createElementFactory<HTMLAttributes>("h6");

// Text formatting
export const pre = createElementFactory<HTMLAttributes>("pre");
export const code = createElementFactory<HTMLAttributes>("code");
export const strong = createElementFactory<HTMLAttributes>("strong");
export const em = createElementFactory<HTMLAttributes>("em");
export const blockquote = createElementFactory<HTMLAttributes>("blockquote");

// Lists
export const ul = createElementFactory<HTMLAttributes>("ul");
export const ol = createElementFactory<HTMLAttributes>("ol");
export const li = createElementFactory<HTMLAttributes>("li");

// Table elements
export const table = createElementFactory<HTMLAttributes>("table");
export const thead = createElementFactory<HTMLAttributes>("thead");
export const tbody = createElementFactory<HTMLAttributes>("tbody");
export const tr = createElementFactory<HTMLAttributes>("tr");
export const th = createElementFactory<HTMLAttributes>("th");
export const td = createElementFactory<HTMLAttributes>("td");

// Form elements
export const input = createElementFactory<
  HTMLAttributes & {
    type?: string;
    checked?: boolean;
    disabled?: boolean;
  }
>("input");

// Links
export const a = createElementFactory<
  HTMLAttributes & {
    href?: string;
  }
>("a");

// Media
export const img = createElementFactory<
  HTMLAttributes & {
    src?: string;
    alt?: string;
    title?: string;
  }
>("img");

// Other
export const hr = createElementFactory<HTMLAttributes>("hr");
