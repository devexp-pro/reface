import { createElementFactory } from "./createElementFactory.ts";
import type { HTMLAttributes } from "../types/base.ts";

// Document structure
export const div = createElementFactory<HTMLAttributes>("div");
export const span = createElementFactory<HTMLAttributes>("span");
export const p = createElementFactory<HTMLAttributes>("p");
export const main = createElementFactory<HTMLAttributes>("main");
export const section = createElementFactory<HTMLAttributes>("section");
export const article = createElementFactory<HTMLAttributes>("article");
export const aside = createElementFactory<HTMLAttributes>("aside");
export const nav = createElementFactory<HTMLAttributes>("nav");
export const header = createElementFactory<HTMLAttributes>("header");
export const footer = createElementFactory<HTMLAttributes>("footer");

// Headings
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

// Lists
export const ul = createElementFactory<HTMLAttributes>("ul");
export const ol = createElementFactory<HTMLAttributes>("ol");
export const li = createElementFactory<HTMLAttributes>("li");

// Links and media
export const a = createElementFactory<HTMLAttributes>("a");
export const img = createElementFactory<HTMLAttributes>("img");

// Forms
export const form = createElementFactory<HTMLAttributes>("form");
export const input = createElementFactory<HTMLAttributes>("input");
export const button = createElementFactory<HTMLAttributes>("button");
export const textarea = createElementFactory<HTMLAttributes>("textarea");
export const select = createElementFactory<HTMLAttributes>("select");
export const option = createElementFactory<HTMLAttributes>("option");
export const label = createElementFactory<HTMLAttributes>("label");
