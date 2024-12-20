import { createTemplateProxy } from "./createTemplateProxy.ts";
import { normalizeAttributes } from "./normalizeAttributes.ts";
import { processChildren } from "./processChildren.ts";
import type {
  ElementChildType,
  Template,
  TemplateConfig,
  TemplateConfigAttributes,
  TemplateFactoryConfig,
  TemplateInstance,
  TemplatePayload,
} from "./types.ts";

const defaultFactoryConfig = {
  toHtml: renderTemplate,
};

export const createTemplateFactory =<
  A extends TemplateConfigAttributes,
  P extends TemplatePayload,
>(factoryConfig: TemplateFactoryConfig<A, P>) => {
  function createTemplate(
    templateConfig: TemplateConfig<A, P>,
  ): Template<A, P> {
    const template: TemplateInstance<A, P> = {
      type: factoryConfig.type,
      tag: templateConfig.tag,
      attributes: templateConfig.attributes,
      children: templateConfig.children,
      toHtml: factoryConfig.toHtml??
        (manager) => manager.renderTemplate(template),
    };

    return createTemplateProxy(template, createTemplate);
  }

  createTemplate.type = factoryConfig.type;
  return createTemplate;
}

