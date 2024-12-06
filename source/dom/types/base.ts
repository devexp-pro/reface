import type { Template } from "../../types.ts";
import type { Attributes } from "./mod.ts";

// Базовые типы для стилей
export type StyleValue = string | number | undefined;
export type StyleInput = string | Record<string, StyleValue>;

// Базовые типы для классов
export type ClassValue = string | Record<string, boolean | undefined | null>;
export type ClassInput = ClassValue | ClassValue[] | undefined | null | boolean;

// Базовые типы для элементов
export type ElementChild =
  | string
  | number
  | boolean
  | null
  | undefined
  | Template;
export type ElementChildren = ElementChild[];

// Типы для фабрик элементов
export type ElementFactory<A extends Attributes = Attributes> = {
  (attributes?: A): (
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ) => Template;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
};

// Тип для styled-components
export type StyledComponent<A extends Attributes = Attributes> =
  ElementFactory<A> & {
    className: string;
    css: string;
  };
