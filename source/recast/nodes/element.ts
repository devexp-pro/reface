import type { ElementAttributes, ElementNode, Node } from "./types.ts";

const ATTRIBUTE_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  '"': "&quot;",
};

function camelToKebab(str: string): string {
  if (str.startsWith("--") || str.startsWith("data-")) return str;
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function escapeAttribute(str: string): string {
  return str.replace(/["&]/g, (char) => ATTRIBUTE_ENTITIES[char]);
}

export function normalizeAttributes(attrs: unknown): ElementAttributes {
  const result: ElementAttributes = {};

  if (!attrs || typeof attrs !== "object") {
    return result;
  }

  const source = attrs as Record<string, unknown>;

  // Handle class
  if (source.className != null || source.class != null) {
    const classes = new Set<string>();
    const classValue = source.className ?? source.class;

    if (Array.isArray(classValue)) {
      classValue.forEach((c) => {
        if (typeof c === "string") {
          c.split(/\s+/).forEach((cls) => cls && classes.add(cls));
        }
      });
    } else if (typeof classValue === "object") {
      Object.entries(classValue).forEach(([key, value]) => {
        if (value && typeof key === "string") classes.add(key);
      });
    } else if (typeof classValue === "string") {
      classValue.split(/\s+/).forEach((c) => c && classes.add(c));
    }

    result.class = Array.from(classes);
  }

  // Handle style
  if (source.style != null) {
    const styles: Record<string, string> = {};

    function processStyleString(styleStr: string) {
      styleStr.split(";").forEach((style) => {
        const [prop, value] = style.split(":").map((s) => s.trim());
        if (prop && value) {
          styles[camelToKebab(prop)] = value;
        }
      });
    }

    if (Array.isArray(source.style)) {
      source.style.forEach((style) => {
        if (typeof style === "string") {
          processStyleString(style);
        } else if (typeof style === "object" && style) {
          Object.entries(style).forEach(([prop, value]) => {
            if (typeof value === "string") {
              styles[camelToKebab(prop)] = value;
            }
          });
        }
      });
    } else if (typeof source.style === "string") {
      processStyleString(source.style);
    } else if (typeof source.style === "object") {
      Object.entries(source.style).forEach(([prop, value]) => {
        if (typeof value === "string") {
          styles[camelToKebab(prop)] = value;
        }
      });
    }

    result.style = styles;
  }

  // Handle other attributes
  for (const [key, value] of Object.entries(source)) {
    if (key === "class" || key === "className" || key === "style") continue;

    const normalizedKey = camelToKebab(key);

    if (value === true) {
      result[normalizedKey] = true;
    } else if (typeof value === "string") {
      result[normalizedKey] = value;
    }
  }

  return result;
}

export function createElement(
  tag: string,
  attributes: unknown = {},
  children: Node[] = [],
): ElementNode {
  return {
    type: "element",
    tag,
    attributes: normalizeAttributes(attributes),
    children,
    meta: {},
  };
}

export function isElement(node: any): node is ElementNode {
  return node?.type === "element";
}
