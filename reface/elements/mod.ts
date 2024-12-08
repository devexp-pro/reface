import { createElementFactory } from "./createElementFactory.ts";
import type { HTMLAttributes } from "../html/types.ts";

// HTML Elements
export const div = createElementFactory("div");
export const span = createElementFactory("span");
export const p = createElementFactory("p");
export const a = createElementFactory("a");
export const button = createElementFactory("button");
export const input = createElementFactory("input");
export const form = createElementFactory("form");
export const h1 = createElementFactory("h1");
export const h2 = createElementFactory("h2");
export const h3 = createElementFactory("h3");
export const h4 = createElementFactory("h4");
export const h5 = createElementFactory("h5");
export const h6 = createElementFactory("h6");
export const ul = createElementFactory("ul");
export const ol = createElementFactory("ol");
export const li = createElementFactory("li");
export const img = createElementFactory("img");
export const nav = createElementFactory("nav");
export const header = createElementFactory("header");
export const footer = createElementFactory("footer");
export const main = createElementFactory("main");
export const section = createElementFactory("section");
export const article = createElementFactory("article");
export const aside = createElementFactory("aside");

// Re-export styled and component
export { styled } from "./styled.ts";
export { component } from "./component.ts";
