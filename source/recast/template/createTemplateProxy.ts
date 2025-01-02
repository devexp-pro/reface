import type {
  BaseAttributes,
  BaseTemplateConfig,
  ComponentFn,
  HTMLTemplateConfig,
  NormalizeAttributes,
  RawTemplate,
  Template,
  TemplateFactoryConfig,
  TemplateMethods,
  TemplatePayload,
} from "./types.ts";
import { REFACE_TEMPLATE } from "./constants.ts";
import { processTemplateTagChildren } from "./processTemplateTagChildren.ts";
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

const defaultProcessChildren = ({
  oldChildren,
  newChildren,
}: {
  oldChildren: JSX.Element[];
  newChildren: JSX.Element[];
}) => [...oldChildren, ...newChildren];

const defaultProcessAttributes = ({
  oldAttrs,
  newAttrs,
}: {
  oldAttrs: NormalizeAttributes<A>;
  newAttrs: NormalizeAttributes<A>;
}) => ({ ...oldAttrs, ...newAttrs });

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
    | ComponentFn<A>
    | BaseTemplateConfig<P>
    | HTMLTemplateConfig<A, P>;
}): Template<A, P, M> {
  const handler: ProxyHandler<A, P, M> = {
    apply(_target, _thisArg, args) {
      const [first, ...rest] = args;

      const processChildren = createTemplateFactoryConfig.process?.children ||
        defaultProcessChildren;
      const processAttributes =
        createTemplateFactoryConfig.process?.attributes ||
        defaultProcessAttributes;

      if (first?.raw) {
        return createTemplateProxy({
          rawTemplate: {
            ...rawTemplate,
            children: processChildren({
              oldChildren: rawTemplate.children,
              newChildren: processTemplateTagChildren(
                first as TemplateStringsArray,
                rest,
              ),
              template: rawTemplate,
            }),
          },
          createTemplateFactoryConfig,
          templateFactoryConfig,
        });
      }

      return createTemplateProxy({
        rawTemplate: {
          ...rawTemplate,
          attributes: normalizeAttributes(
            processAttributes({
              oldAttrs: rawTemplate.attributes,
              newAttrs: normalizeAttributes(first as A),
              template: rawTemplate,
            }),
          ),
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
