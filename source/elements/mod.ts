import { createElementFactory } from "./createElementFactory.ts";
import type {
  HTMLAttributes,
  ButtonAttributes,
  InputAttributes,
  AnchorAttributes,
  ImgAttributes,
  TableAttributes,
  FormAttributes,
  SelectAttributes,
  OptionAttributes,
  TextareaAttributes,
} from "../types/mod.ts";

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

// Forms
export const form = createElementFactory<FormAttributes>("form");
export const input = createElementFactory<InputAttributes>("input");
export const button = createElementFactory<ButtonAttributes>("button");
export const textarea = createElementFactory<TextareaAttributes>("textarea");
export const select = createElementFactory<SelectAttributes>("select");
export const option = createElementFactory<OptionAttributes>("option");
export const label = createElementFactory<HTMLAttributes>("label");

// Links
export const a = createElementFactory<AnchorAttributes>("a");

// Lists
export const ul = createElementFactory<HTMLAttributes>("ul");
export const ol = createElementFactory<HTMLAttributes>("ol");
export const li = createElementFactory<HTMLAttributes>("li");

// Tables
export const table = createElementFactory<TableAttributes>("table");
export const thead = createElementFactory<TableAttributes>("thead");
export const tbody = createElementFactory<TableAttributes>("tbody");
export const tr = createElementFactory<TableAttributes>("tr");
export const td = createElementFactory<TableAttributes>("td");
export const th = createElementFactory<TableAttributes>("th");

// Media
export const img = createElementFactory<ImgAttributes>("img");
export const video = createElementFactory<HTMLAttributes>("video");
export const audio = createElementFactory<HTMLAttributes>("audio");

// Void elements
export const br = createElementFactory<HTMLAttributes>("br");
export const hr = createElementFactory<HTMLAttributes>("hr");
