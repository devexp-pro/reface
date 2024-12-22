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

const renderManager: any = {};

function isBaseTemplateConfig<P>(input: any): input is BaseTemplateConfig<P> {
  return "children" in input && !("attributes" in input);
}

function isHTMLTemplateConfig<A, P>(
  input: any,
): input is HTMLTemplateConfig<A, P> {
  return "attributes" in input && "children" in input;
}

export const createTemplateFactory: CreateTemplateFactory = <
  A extends TemplateAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
>(
  config: TemplateFactoryConfig<A, P, M>,
): TemplateFactory<A, P, M> => {
  const factory: TemplateFactory<A, P, M> = ((
    input:
      | ComponentFn<A, P>
      | BaseTemplateConfig<P>
      | HTMLTemplateConfig<A, P>,
  ) => {
    // Компонент
    if (typeof input === "function") {
      const rawTemplate: RawTemplate<NormalizeAttributes<A>, P> = {
        type: config.type,
        attributes: {},
        children: [],
        payload: {} as P,
      };

      return createTemplateProxy(rawTemplate, config, input);
    }

    // HTML элемент или базовый вызов
    if (isHTMLTemplateConfig<A, P>(input)) {
      const rawTemplate: RawTemplate<NormalizeAttributes<A>, P> = {
        type: config.type,
        tag: input.tag,
        attributes: normalizeAttributes(input.attributes || {}),
        children: input.children || [],
        payload: input.payload || {} as P,
      };
      return createTemplateProxy(rawTemplate, config);
    }

    const rawTemplate: RawTemplate<NormalizeAttributes<A>, P> = {
      type: config.type,
      attributes: normalizeAttributes(
        config.create?.defaults?.attributes || {},
      ),
      children: input.children || [],
      payload: config.create?.defaults?.payload || {} as P,
    };
    return createTemplateProxy(rawTemplate, config);
  }) as TemplateFactory<A, P, M>;

  return factory;
};
