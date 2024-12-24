import type {
  BaseAttributes,
  BaseTemplateConfig,
  HTMLTemplateConfig,
  NormalizeAttributes,
  RawTemplate,
  Template,
  TemplateFactoryConfig,
  TemplateMethods,
  TemplatePayload,
} from "./types.ts";
import { REFACE_TEMPLATE } from "./constants.ts";
import { processChildren } from "./processChildren.ts";
import { isComponentFn } from "./utils.ts";
import { normalizeAttributes } from "./normalizeAttributes.ts";

type ProxyHandler<
  A extends BaseAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
> = {
  apply: (
    target: Template<A, P, M>,
    thisArg: any,
    args: [A] | [TemplateStringsArray, ...any[]],
  ) => Template<A, P, M>;

  get: (
    target: Template<A, P, M>,
    prop: string | symbol,
    receiver: any,
  ) =>
    | ((...args: any[]) => Template<A, P, M>)
    | boolean
    | RawTemplate<NormalizeAttributes<A>, P>
    | undefined;
};

export function createTemplateProxy<
  A extends BaseAttributes,
  P extends TemplatePayload,
  M extends TemplateMethods<A, P>,
>({
  rawTemplate,
  createTemplateFactoryConfig,
  templateFactoryConfig,
}: {
  rawTemplate: RawTemplate<NormalizeAttributes<A>, P>;
  createTemplateFactoryConfig: TemplateFactoryConfig<A, P, M>;
  templateFactoryConfig:
    | BaseTemplateConfig<P>
    | HTMLTemplateConfig<A, P>;
}): Template<A, P, M> {
  const handler: ProxyHandler<A, P, M> = {
    apply(_target, _thisArg, args) {
      const [first, ...rest] = args;

      if (first?.raw) {
        return createTemplateProxy({
          rawTemplate: {
            ...rawTemplate,
            children: processChildren(first as TemplateStringsArray, rest),
          },
          createTemplateFactoryConfig,
          templateFactoryConfig,
        });
      }

      const attributes = normalizeAttributes(
        createTemplateFactoryConfig.process?.attributes?.({
          oldAttrs: rawTemplate.attributes,
          newAttrs: normalizeAttributes(first as A),
          template: rawTemplate,
        }) || {
          ...rawTemplate.attributes,
          ...(first as A),
        },
      );

      return createTemplateProxy({
        rawTemplate: {
          ...rawTemplate,
          attributes,
        },
        createTemplateFactoryConfig,
        templateFactoryConfig,
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
        return function (this: any, ...args: any[]) {
          return method({ template: rawTemplate }, ...args);
        };
      }
      return undefined;
    },
  };

  // FIXME: how to fix this?
  return new Proxy(
    function () {} as unknown as Template<A, P, M>,
    handler,
  ) as Template<A, P, M>;
}
