import { TemplateBase } from "../TemplateBase.ts";
import { TemplateText } from "../TemplateText.ts";

export function formatTemplate(template: TemplateBase, indent = ""): string {
  const attrs = formatAttributes(template.attributes);
  const children = formatChildren(template.children, indent);
  let meta = [`[${template.constructor.name}]`];

  if (template.css) meta.push("styles");
  if (template.script) meta.push("script");
  if (template.scriptFile) meta.push(`script:${template.scriptFile}`);
  if (template.rootClass) meta.push(`root:${template.rootClass}`);

  const metaStr = ` // ${meta.join(", ")}`;

  if (!children) {
    return `<${template.tag}${attrs} />${metaStr}`;
  }

  return `<${template.tag}${attrs}>${children}</${template.tag}>${metaStr}`;
}

function formatAttributes(attributes: Record<string, unknown>): string {
  const attrs = Object.entries(attributes)
    .filter(([_, value]) =>
      value !== undefined && value !== null && value !== ""
    )
    .map(([key, value]) => {
      if (value === true) return key;
      if (Array.isArray(value)) value = value.join(" ");
      if (typeof value === "object") value = JSON.stringify(value);
      return `${key}="${value}"`;
    })
    .join(" ");
  return attrs ? ` ${attrs}` : "";
}

function formatChildren(children: unknown[], indent = ""): string {
  if (!children.length) return "";

  const childIndent = `${indent}  `;
  const formattedChildren = children
    .map((child) => {
      if (child === null || child === undefined) return "";
      if (typeof child === "string") {
        return `${childIndent}"${child}"`;
      }
      if (child instanceof TemplateText) {
        return `${childIndent}"${child.getContent()}"`;
      }
      if (child instanceof TemplateBase) {
        return `${childIndent}${formatTemplate(child, childIndent)}`;
      }
      return `${childIndent}${String(child)}`;
    })
    .filter(Boolean)
    .join("\n");

  return formattedChildren ? `\n${formattedChildren}\n${indent}` : "";
}
