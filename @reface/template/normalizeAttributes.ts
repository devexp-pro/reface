import type {
  BaseAttributes,
  NormalizeAttributes,
  TemplateAttributes,
} from "./types.ts";

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
): string[] => {
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

export const normalizeStyleAttribute = (
  styles: TemplateAttributes["style"],
): string[] => {
  if (!styles) return [];

  const newStyles = new Map<string, string>();

  function addStyle(
    prop: string,
    value: string | number | boolean | null | undefined,
  ) {
    if (!prop || value == null || value === false) return;
    newStyles.set(
      prop.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
      String(value),
    );
  }

  function processStyleValue(val: unknown) {
    if (!val) return;

    if (typeof val === "string") {
      val.split(";").forEach((style) => {
        const [prop, value] = style.split(":").map((s) => s.trim());
        if (prop && value) {
          addStyle(prop, value as string);
        }
      });
    } else if (Array.isArray(val)) {
      val.forEach(processStyleValue);
    } else if (isObject(val)) {
      for (const [prop, value] of Object.entries(val)) {
        addStyle(prop, value as string);
      }
    }
  }

  processValue(styles).forEach(processStyleValue);
  return Array.from(newStyles.entries())
    .map(([prop, value]) => `${prop}: ${value}`);
};

export function normalizeAttributes<A extends BaseAttributes>(
  attrs: A = {} as A,
): NormalizeAttributes<A> {
  const result = { ...attrs } as NormalizeAttributes<A>;
  const newClassess: string[] = [];
  const newStyles: string[] = [];

  // Обработка classes
  if (attrs.class) {
    newClassess.push(...normalizeClassAttribute(attrs.class));
  }

  // Обработка styles
  if (attrs.style) {
    newStyles.push(...normalizeStyleAttribute(attrs.style));
  }

  result.class = newClassess;
  result.style = newStyles;

  return result;
}
