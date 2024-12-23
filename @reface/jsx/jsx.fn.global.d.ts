// @reface/jsx/jsx.fn.global.d.ts
import type {
  ElementChildType,
  Template,
  TemplateAttributes,
} from "@reface/template";

declare global {
  const createElement: <P extends TemplateAttributes = TemplateAttributes>(
    type: string | ((props: P) => Template),
    props: P | null,
    ...children: ElementChildType[]
  ) => Template;

  const Fragment: (props: any, children: ElementChildType[]) => Template;
}

export {};
