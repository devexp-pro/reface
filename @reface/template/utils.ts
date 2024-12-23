import type {
  BaseTemplateConfig,
  ComponentFn,
  HTMLTemplateConfig,
  RawTemplate,
  Template,
} from "./types.ts";
import { HTML_ENTITIES, REFACE_TEMPLATE } from "./constants.ts";

export function isBaseTemplateConfig<P>(
  input: any,
): input is BaseTemplateConfig<P> {
  return "children" in input && !("attributes" in input);
}

export function isHTMLTemplateConfig<A, P>(
  input: any,
): input is HTMLTemplateConfig<A, P> {
  return "tag" in input;
}

export function isComponentFn<A, P>(input: any): input is ComponentFn<A, P> {
  return typeof input === "function";
}

export function isTemplate(value: unknown): value is Template {
  return typeof value === "function" && value[REFACE_TEMPLATE] === true;
}

export function isRawTemplate(value: unknown): value is RawTemplate {
  return typeof value === "object" && value !== null && "type" in value;
}

export function isEmptyValue(value: unknown): boolean {
  return value === null || value === undefined || typeof value === "boolean" ||
    value === "";
}

export function escapeHTML(str: string): string {
  return str.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);
}

export function escapeAttribute(str: string): string {
  return str.replace(/["&]/g, (char) => HTML_ENTITIES[char]);
}
