function isTemplate(value: unknown): value is Template {
  return typeof value === "function" && "type" in value;
}

function isEmptyValue(value: unknown): boolean {
  return value === null || value === undefined || value === false ||
    value === "";
}

export function processChildren(
  strings: TemplateStringsArray,
  values: any[],
): ElementChildType[] {
  const children: ElementChildType[] = [];

  for (let i = 0; i < strings.length; i++) {
    const trimmed = strings[i].trim();
    if (trimmed) {
      children.push(trimmed);
    }

    if (i < values.length) {
      const value = values[i];
      if (Array.isArray(value)) {
        children.push(...value);
      } else if (isTemplate(value)) {
        children.push(value);
      } else if (!isEmptyValue(value)) {
        children.push(escapeHTML(String(value)));
      }
    }
  }

  return children;
}
