import { IRenderManager } from "../render/types.ts";

export interface ITemplate {
  children?: ElementChildType[];
  toHtml(manager: IRenderManager): string;
}

export interface ITemplateElement extends ITemplate {
  tag: string;
  attributes: HTMLAttributes;
}

export type ElementChildType =
  | string
  | number
  | boolean
  | ITemplate
  | null
  | undefined;

export interface TemplateFn extends ITemplate {
  (strings: TemplateStringsArray, ...values: ElementChildType[]): ITemplate;
  [Symbol.iterator](): Iterator<unknown>;
}

// Базовые типы для значений
type ClassObject = Record<string, boolean>;
type StyleObject = Record<string, string | number>;

// Типы для одиночных значений
type SingleClassValue = string | ClassObject;
type SingleStyleValue = string | StyleObject;

// Итоговые типы для атрибутов
export type ClassValue = SingleClassValue | SingleClassValue[];
export type StyleValue = SingleStyleValue | SingleStyleValue[];

// HTML атрибуты
export interface HTMLAttributes {
  class?: ClassValue;
  style?: StyleValue;
  [key: string]: unknown;
}
