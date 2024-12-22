import type { NormalizeAttributes, TemplateAttributes } from "./types.ts";

export function normalizeAttributes<A extends TemplateAttributes>(
  attrs: A,
): NormalizeAttributes<A> {
  const result = { ...attrs } as NormalizeAttributes<A>;
  const classes: string[] = [];
  const styles: Record<string, string> = {};

  // Обработка classes
  if (attrs.classes) {
    if (Array.isArray(attrs.classes)) {
      classes.push(...attrs.classes.map(String));
    } else if (typeof attrs.classes === "object") {
      Object.entries(attrs.classes)
        .filter(([, enabled]) => enabled)
        .forEach(([className]) => classes.push(className));
    } else {
      classes.push(String(attrs.classes));
    }
  }

  // Обработка styles
  if (attrs.styles) {
    Object.assign(styles, attrs.styles);
  }

  result.classes = classes;
  result.styles = styles;

  return result;
}
