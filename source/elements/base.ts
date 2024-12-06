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

// Media elements
export const img = createElementFactory<
  HTMLAttributes & {
    src?: string;
    alt?: string;
  }
>("img");

// Typography
export const h1 = createElementFactory<HTMLAttributes>("h1");
export const h2 = createElementFactory<HTMLAttributes>("h2");
export const h3 = createElementFactory<HTMLAttributes>("h3");
export const h4 = createElementFactory<HTMLAttributes>("h4");

// Lists
export const ul = createElementFactory<HTMLAttributes>("ul");
export const ol = createElementFactory<HTMLAttributes>("ol");
export const li = createElementFactory<HTMLAttributes>("li");

// Links
export const a = createElementFactory<
  HTMLAttributes & {
    href?: string;
  }
>("a");
