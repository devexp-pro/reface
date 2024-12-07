import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
  Template,
} from "../core/Template.ts";
import { attributes } from "../html/mod.ts";
import type { TemplateFragment } from "../html/types.ts";
import { isTemplateFragment } from "../html/types.ts";
import { escapeHTML } from "../html/escape.ts";

/**
 * Creates an element factory function for a given tag
 */
export function createElementFactory<A extends HTMLAttributes = HTMLAttributes>(
  tag: string
): ElementFactory<A> {
  const factory = {
    [tag]: function (
      attributesOrStrings?: A | TemplateStringsArray,
      ...values: (
        | string
        | number
        | boolean
        | Template
        | TemplateFragment
        | null
        | undefined
      )[]
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
          children: values.map((v) => {
            if (v === null || v === undefined) return "";
            if (isTemplateFragment(v)) return v.content;
            if (typeof v === "object" && "isTemplate" in v) return v;
            return escapeHTML(String(v));
          }),
          css: "",
          isTemplate: true,
          str: attributesOrStrings,
          args: values.map(String),
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
        children: templateValues.map((v) => {
          if (v === null || v === undefined) return "";
          if (isTemplateFragment(v)) return v.content;
          if (typeof v === "object" && "isTemplate" in v) return v;
          return escapeHTML(String(v));
        }),
        css: "",
        isTemplate: true,
        str: strings,
        args: templateValues.map(String),
        rootClass: "",
      });
    },
  }[tag];

  return factory as ElementFactory<A>;
}
