import type {
  BaseTemplateConfig,
  ComponentFn,
  HTMLTemplateConfig,
  RawTemplate,
  Template,
} from "./types.ts";
import { REFACE_TEMPLATE } from "./types.ts";

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
