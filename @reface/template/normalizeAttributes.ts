import type { NormalizeAttributes, TemplateAttributes } from "./types.ts";

export const normalizeClassAttribute = (
  classess: TemplateAttributes["class"],
) => {
  if (Array.isArray(classess)) {
    return classess.map(String);
  } else if (typeof classess === "object") {
    return Object.entries(classess)
      .filter(([, enabled]) => enabled)
      .map(([className]) => className);
  } else {
    return [String(classess)];
  }
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
