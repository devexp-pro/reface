import type {
  BaseTemplateConfig,
  ComponentFn,
  CreateTemplateFactory,
  HTMLTemplateConfig,
  NormalizeAttributes,
  RawTemplate,
  TemplateAttributes,
  TemplateFactory,
  TemplateFactoryConfig,
  TemplateMethods,
  TemplatePayload,
} from "./types.ts";
import { createTemplateProxy } from "./createTemplateProxy.ts";
import { normalizeAttributes } from "./normalizeAttributes.ts";
import { isHTMLTemplateConfig } from "./utils.ts";

export const createTemplateFactory: CreateTemplateFactory = <
  A extends TemplateAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
>(
  createTemplateFactoryConfig: TemplateFactoryConfig<A, P, M>,
): TemplateFactory<A, P, M> => {
  const factory: TemplateFactory<A, P, M> = ((
    templateFactoryConfig:
      | ComponentFn<A, P>
      | BaseTemplateConfig<P>
      | HTMLTemplateConfig<A, P>,
  ) => {
    // Компонент
    if (typeof templateFactoryConfig === "function") {
      const rawTemplate: RawTemplate<NormalizeAttributes<A>, P> = {
        type: createTemplateFactoryConfig.type,
        attributes: {},
        children: [],
        payload: {} as P,
      };

      return createTemplateProxy({
        rawTemplate,
        createTemplateFactoryConfig,
        templateFactoryConfig,
      });
    }

    // HTML элемент или базовый вызов
    if (isHTMLTemplateConfig<A, P>(templateFactoryConfig)) {
      const attributes = normalizeAttributes(
        createTemplateFactoryConfig.process?.attributes?.(
          {
            oldAttrs:
              createTemplateFactoryConfig.create?.defaults?.attributes || {},
            newAttrs: templateFactoryConfig.attributes || {},
            template: templateFactoryConfig,
          },
        ) || templateFactoryConfig.attributes || {},
      );

      const rawTemplate: RawTemplate<NormalizeAttributes<A>, P> = {
        type: createTemplateFactoryConfig.type,
        tag: templateFactoryConfig.tag,
        attributes,
        children: templateFactoryConfig.children || [],
        payload: {
          ...createTemplateFactoryConfig.create?.defaults?.payload,
          ...(templateFactoryConfig.payload || {}),
        } as P,
      };
      return createTemplateProxy({
        rawTemplate,
        createTemplateFactoryConfig,
        templateFactoryConfig,
      });
    }

    const rawTemplate: RawTemplate<NormalizeAttributes<A>, P> = {
      type: createTemplateFactoryConfig.type,
      children: templateFactoryConfig.children || [],
      payload: {
        ...createTemplateFactoryConfig.create?.defaults?.payload,
        ...(templateFactoryConfig.payload || {}),
      } as P,
    };
    return createTemplateProxy({
      rawTemplate,
      createTemplateFactoryConfig,
      templateFactoryConfig,
    });
  }) as TemplateFactory<A, P, M>;

  return factory;
};
