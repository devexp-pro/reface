import type { ElementChildType, HTMLAttributes } from "@reface/types";
import type { Template, TemplateInstance } from "./types.ts";

export function createTemplateProxy<A extends HTMLAttributes, P>(
  instance: TemplateInstance<A, P>,
  factory: (attrs: A, children: ElementChildType[]) => Template<A, P>,
): Template<A, P> {
  return new Proxy(function () {}, {
    apply(_target, _thisArg, args) {
      const [stringsOrAttrs, ...values] = args;

      // Вызов с template literal
      if (stringsOrAttrs?.raw) {
        return factory(
          instance.attributes,
          processChildren(stringsOrAttrs, values),
        );
      }

      // Вызов с атрибутами
      return factory(
        normalizeAttributes({ ...instance.attributes, ...stringsOrAttrs }),
        instance.children,
      );
    },
    get(_target, prop) {
      if (prop in instance) {
        const value = instance[prop];
        return typeof value === "function" ? value.bind(instance) : value;
      }
      return undefined;
    },
  }) as Template<A, P>;
}
