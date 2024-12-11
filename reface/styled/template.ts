import { createLogger } from "@reface/core";

const logger = createLogger("Styled:Template");

export interface StyledTemplate {
  rootClass: string;
  css: string;
  baseComponent?: StyledTemplate;
  tag: string;
}

export function createStyledTemplate(
  tag: string | StyledTemplate,
  css: string,
): StyledTemplate {
  logger.debug("Creating styled template", {
    tag: typeof tag === "string" ? tag : tag.tag,
    hasBaseComponent: typeof tag !== "string",
  });

  return {
    rootClass: `styled-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    css,
    baseComponent: typeof tag !== "string" ? tag : undefined,
    tag: typeof tag === "string" ? tag : tag.tag,
  };
}

export function buildClassName(
  template: StyledTemplate,
  extraClass?: string,
): string {
  const baseClass = template.baseComponent
    ? template.baseComponent.rootClass
    : "";
  return (extraClass
    ? `${template.rootClass} ${baseClass} ${extraClass}`
    : `${template.rootClass} ${baseClass}`).trim();
}

export function buildCss(template: StyledTemplate): string {
  const baseCss = template.baseComponent
    ? template.baseComponent.css?.replace(
      /&/g,
      `.${template.baseComponent.rootClass}`,
    )
    : "";
  const newCss = template.css.replace(/&/g, `.${template.rootClass}`);
  return `${baseCss}\n${newCss}`;
}
