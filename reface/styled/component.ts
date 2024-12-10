import { createLogger } from "@reface/core";
import { TemplateComponent } from "@reface/html";
import { component } from "@reface/component";

import { buildClassName, buildCss, createStyledTemplate } from "./template.ts";
import type { StyledComponent } from "./types.ts";

const logger = createLogger("Styled:Component");

export function createStyledComponent<Tag extends string>(
  tag: string | StyledComponent<Tag>,
  cssTemplate: TemplateStringsArray,
  cssValues: unknown[],
): StyledComponent<Tag> {
  const css = String.raw(cssTemplate, ...cssValues);
  logger.debug("Creating styled component", { tag, css });

  const template = createStyledTemplate(tag, css);

  const componentFn = component<{ class?: string }>(
    function StyledComponent(props = {}, children) {
      logger.debug("Rendering styled component", {
        tag: template.tag,
        props,
        rootClass: template.rootClass,
        childrenCount: children?.length,
      });

      const className = buildClassName(template, props.class);
      const combinedCss = buildCss(template);

      return new TemplateComponent(
        template.tag,
        { ...props, class: className },
        children,
        combinedCss,
        template.rootClass,
      );
    },
  ) as unknown as StyledComponent<Tag>;

  Object.assign(componentFn, template);
  return componentFn;
}
