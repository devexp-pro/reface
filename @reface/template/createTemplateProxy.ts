import type {
  NormalizeAttributes,
  RawTemplate,
  Template,
  TemplateAttributes,
  TemplateFactoryConfig,
  TemplateMethods,
  TemplatePayload,
} from "./types.ts";
import { REFACE_TEMPLATE } from "./constants.ts";
import { processChildren } from "./processChildren.ts";
import { isComponentFn } from "./utils.ts";
import { normalizeAttributes } from "./normalizeAttributes.ts";

type ProxyTarget<
  A extends TemplateAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
> = {
  (attributes: A): Template<A, P, M>;
  (strings: TemplateStringsArray, ...values: any[]): Template<A, P, M>;
} & M;

type ProxyHandler<
  A extends TemplateAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
> = {
  apply: (
    target: ProxyTarget<A, P, M>,
    thisArg: any,
    args: [A] | [TemplateStringsArray, ...any[]],
  ) => Template<A, P, M>;

  get: (
    target: ProxyTarget<A, P, M>,
    prop: string | symbol,
    receiver: any,
  ) => ((...args: any[]) => Template<A, P, M>) | undefined;
};

export function createTemplateProxy<
  A extends TemplateAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
>(
  {
    rawTemplate,
    createTemplateFactoryConfig,
    templateFactoryConfig,
  }: {
    rawTemplate: RawTemplate<NormalizeAttributes<A>, P>;
    createTemplateFactoryConfig: TemplateFactoryConfig<A, P, M>;
    templateFactoryConfig: TemplateFactoryConfig<A, P, M>;
  },
): Template<A, P, M> {
  const target: ProxyTarget<A, P, M> = Object.assign(
    function () {} as ProxyTarget<A, P, M>,
    createTemplateFactoryConfig.methods || {},
  );

  const handler: ProxyHandler<A, P, M> = {
    apply(_target, _thisArg, args) {
      const [first, ...rest] = args;

      if (first?.raw) {
        return createTemplateProxy({
          rawTemplate: {
            ...rawTemplate,
            children: processChildren(first, rest),
          },
          templateFactoryConfig,
          createTemplateFactoryConfig,
        });
      }

      const attributes = normalizeAttributes(
        createTemplateFactoryConfig.process?.attributes?.(
          {
            oldAttrs: rawTemplate.attributes,
            newAttrs: normalizeAttributes(first),
            template: templateFactoryConfig,
          },
        ) || {
          ...rawTemplate.attributes,
          ...first,
        },
      );
      return createTemplateProxy({
        rawTemplate: {
          ...rawTemplate,
          attributes,
        },
        templateFactoryConfig,
        createTemplateFactoryConfig,
      });
    },

    get(_target, prop) {
      if (prop === REFACE_TEMPLATE) {
        return true;
      }
      if (prop === "raw") {
        if (isComponentFn(templateFactoryConfig)) {
          return {
            ...rawTemplate,
            children: [
              templateFactoryConfig(
                rawTemplate.attributes,
                rawTemplate.children,
              ),
            ],
          };
        }

        return rawTemplate;
      }

      if (
        typeof prop === "string" &&
        typeof createTemplateFactoryConfig.methods === "object" &&
        prop in createTemplateFactoryConfig.methods
      ) {
        const method = createTemplateFactoryConfig.methods[prop];
        return (...args: any[]) => method({ template: rawTemplate, ...args });
      }
      return undefined;
    },
  };

  return new Proxy(target, handler);
}
