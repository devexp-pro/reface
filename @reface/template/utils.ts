import type {
  BaseTemplateConfig,
  ComponentFn,
  HTMLTemplateConfig,
  RawTemplate,
  Template,
  TemplateAttributes,
  TemplateMethods,
  TemplatePayload,
} from "./types.ts";
import { HTML_ENTITIES, REFACE_TEMPLATE } from "./constants.ts";

export function isBaseTemplateConfig<P extends TemplatePayload>(
  input: any,
): input is BaseTemplateConfig<P> {
  return "children" in input && !("attributes" in input);
}

export function isHTMLTemplateConfig<
  A extends TemplateAttributes,
  P extends TemplatePayload,
>(input: any): input is HTMLTemplateConfig<A, P> {
  return "tag" in input;
}

export function isComponentFn<
  A extends TemplateAttributes,
>(input: any): input is ComponentFn<A> {
  return typeof input === "function";
}

export function isTemplate<
  A extends TemplateAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
>(value: unknown): value is Template<A, P, M> {
  return typeof value === "function" &&
    (value as any)[REFACE_TEMPLATE] === true;
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

export const toKebabCase = (str: string): string =>
  str.replace(/([A-Z])/g, "-$1").toLowerCase();
