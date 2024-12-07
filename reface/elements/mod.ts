import { createElementFactory } from "./factory.ts";
import type { HTMLAttributes } from "../core/Template.ts";

// Создаем и экспортируем фабрики для каждого тега
export const div = createElementFactory<HTMLAttributes>("div");
export const span = createElementFactory<HTMLAttributes>("span");
export const p = createElementFactory<HTMLAttributes>("p");
export const a = createElementFactory<HTMLAttributes>("a");
export const button = createElementFactory<HTMLAttributes>("button");
export const input = createElementFactory<HTMLAttributes>("input");
export const form = createElementFactory<HTMLAttributes>("form");
export const h1 = createElementFactory<HTMLAttributes>("h1");
export const h2 = createElementFactory<HTMLAttributes>("h2");
export const h3 = createElementFactory<HTMLAttributes>("h3");
export const h4 = createElementFactory<HTMLAttributes>("h4");
export const h5 = createElementFactory<HTMLAttributes>("h5");
export const h6 = createElementFactory<HTMLAttributes>("h6");
export const header = createElementFactory<HTMLAttributes>("header");
export const footer = createElementFactory<HTMLAttributes>("footer");
export const nav = createElementFactory<HTMLAttributes>("nav");
export const main = createElementFactory<HTMLAttributes>("main");
export const section = createElementFactory<HTMLAttributes>("section");
export const article = createElementFactory<HTMLAttributes>("article");
export const ul = createElementFactory<HTMLAttributes>("ul");
export const ol = createElementFactory<HTMLAttributes>("ol");
export const li = createElementFactory<HTMLAttributes>("li");
export const table = createElementFactory<HTMLAttributes>("table");
export const tr = createElementFactory<HTMLAttributes>("tr");
export const td = createElementFactory<HTMLAttributes>("td");
export const th = createElementFactory<HTMLAttributes>("th");
export const img = createElementFactory<HTMLAttributes>("img");
export const video = createElementFactory<HTMLAttributes>("video");
export const audio = createElementFactory<HTMLAttributes>("audio");
export const label = createElementFactory<HTMLAttributes>("label");
export const select = createElementFactory<HTMLAttributes>("select");
export const option = createElementFactory<HTMLAttributes>("option");

// Реэкспортируем styled
export { styled } from "./styled.ts";
export type { StyledComponent, StyledFactory } from "./styled.types.ts";
