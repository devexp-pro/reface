export function normalizeAttributes<A extends HTMLAttributes>(attrs: A): A {
  const result = { ...attrs };

  if ("class" in result) {
    const classes = new Set<string>();
    const value = result.class;

    if (Array.isArray(value)) {
      value.forEach((v) => v && classes.add(String(v)));
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value)
        .filter(([, enabled]) => enabled)
        .forEach(([className]) => className && classes.add(className));
    } else if (value) {
      String(value)
        .split(/\s+/)
        .filter(Boolean)
        .forEach((className) => classes.add(className));
    }

    result.class = Array.from(classes).join(" ");
  }

  return result;
}
