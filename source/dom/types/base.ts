import type { Template } from "../../types.ts";
import type { Attributes } from "./mod.ts";

type StyledComponent<T> = {
  (props?: T): Template & {
    (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  };
};

export type StyleInput = string | Record<string, string | number | undefined>;

// Базовые типы для значений классов
export type ClassValue = {
  [key: string]: boolean;
};

export type ClassInput =
  | string
  | Record<string, boolean | undefined | null>
  | null
  | undefined
  | boolean;

// HTML атрибуты
export interface HTMLAttributes {
  class?: string | ClassValue;
  style?: string | StyleInput;
  id?: string;
  title?: string;
  role?: string;
  tabindex?: number;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  [key: `data-${string}`]: string | number | boolean | undefined;
  [key: string]: unknown;
}

// Типы для детей элементов
export type ElementChild =
  | string
  | number
  | boolean
  | null
  | undefined
  | Template
  | StyledComponent<Attributes>;
export type ElementChildren = ElementChild[];

// Фабрика элементов
export type ElementFactory = (
  strings: TemplateStringsArray,
  ...values: ElementChildren
) => Template;
