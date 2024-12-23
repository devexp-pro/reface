import type { NormalizeAttributes, TemplateAttributes } from "./types.ts";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function processValue<T>(value: T): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

export const normalizeClassAttribute = (
  classess: TemplateAttributes["class"],
) => {
  if (!classess) return [];

  const classes = new Set<string>();

  function addClass(value: string) {
    value.split(/\s+/).forEach((c) => c && classes.add(c));
  }

  function processClassValue(val: unknown) {
    if (!val) return;

    if (typeof val === "string") {
      addClass(val);
    } else if (Array.isArray(val)) {
      val.forEach(processClassValue);
    } else if (isObject(val)) {
      for (const [key, condition] of Object.entries(val)) {
        if (condition && key) {
          addClass(key);
        }
      }
    }
  }

  processValue(classess).forEach(processClassValue);
  return Array.from(classes);
};

export function normalizeAttributes<A extends TemplateAttributes>(
  attrs: A = {} as A,
): NormalizeAttributes<A> {
  const result = { ...attrs } as NormalizeAttributes<A>;
  const newClassess: string[] = [];
  const newStyles: Record<string, string> = {};

  // Обработка classes
  if (attrs.class) {
    newClassess.push(...normalizeClassAttribute(attrs.class));
  }

  // Обработка styles
  if (attrs.style) {
    Object.assign(newStyles, attrs.style);
  }

  result.class = newClassess;
  result.style = newStyles;

  return result;
}
