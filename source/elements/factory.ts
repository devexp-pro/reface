import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
  Template,
} from "../core/Template.ts";
import { attributes } from "../html/mod.ts";

/**
 * Creates an element factory function for a given tag
 */
export function createElementFactory<A extends HTMLAttributes = HTMLAttributes>(
  tag: string
): ElementFactory<A> {
  const factory = {
    [tag]: function (
      attributesOrStrings?: A | TemplateStringsArray,
      ...values: ElementChild[]
    ):
      | Template
      | ((
          strings: TemplateStringsArray,
          ...values: ElementChild[]
        ) => Template) {
      // Handle template literal call
      if (attributesOrStrings instanceof Array) {
        return {
          tag,
          attributes: "",
          children: values,
          css: "",
          isTemplate: true,
          str: attributesOrStrings,
          args: values.map((v) =>
            v === null || v === undefined
              ? ""
              : typeof v === "string" ||
                (typeof v === "object" && "isTemplate" in v)
              ? v
              : String(v)
          ),
          rootClass: "",
        };
      }

      // Handle attributes call
      return (
        strings: TemplateStringsArray,
        ...templateValues: ElementChild[]
      ): Template => ({
        tag,
        attributes: attributesOrStrings ? attributes(attributesOrStrings) : "",
        children: templateValues,
        css: "",
        isTemplate: true,
        str: strings,
        args: templateValues,
        rootClass: "",
      });
    },
  }[tag];

  return factory as ElementFactory<A>;
}
