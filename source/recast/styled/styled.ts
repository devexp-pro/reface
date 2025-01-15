import type { StyledComponent, StyledFn, StyledTagFn } from "./types.ts";
import { generateClassName } from "./classGenerator.ts";
import { parseCSS } from "./cssParser.ts";
import {
  createTemplateFactory,
  type NormalizeAttributes,
  type RawTemplate,
  type TemplateAttributes,
  VOID_ELEMENTS,
} from "@reface/template";

interface StyledPayload {
  styled: {
    styles: string;
    rootClass: string;
    tag: string;
  };
}

const styledTemplate = createTemplateFactory<TemplateAttributes, StyledPayload>(
  {
    type: "styled",
    create: {
      defaults: {
        attributes: {},
      },
    },
    process: {
      attributes: ({
        oldAttrs,
        newAttrs,
      }: {
        oldAttrs: NormalizeAttributes<TemplateAttributes>;
        newAttrs: NormalizeAttributes<TemplateAttributes>;
      }) => {
        const currentClasses = (oldAttrs.class || []) as string[];
        const newClasses = (newAttrs.class || []) as string[];

        return {
          ...oldAttrs,
          ...newAttrs,
          class: [...currentClasses, ...newClasses].filter(Boolean),
        };
      },
    },
    methods: {
      getRootClass: ({ template }: { template: RawTemplate }) =>
        template.payload.styled.rootClass,
    },
  },
);

function createStyledElement(
  tagOrComponent: string | StyledComponent,
  css: TemplateStringsArray,
  values: unknown[],
  parentComponent?: StyledComponent,
): StyledComponent {
  const rootClass = generateClassName();
  const rawCss = String.raw({ raw: css }, ...values);
  const styles = parseCSS(rawCss, rootClass);

  const tag: string | undefined = typeof tagOrComponent === "string"
    ? tagOrComponent
    : tagOrComponent.raw.tag;

  const combinedStyles = parentComponent
    ? `${parentComponent.raw.payload.styled.styles}\n${styles}`
    : styles;

  if (!tag) {
    throw new Error("Tag is required");
  }

  return styledTemplate({
    tag,
    void: VOID_ELEMENTS.has(tag),
    attributes: {
      class: [
        parentComponent?.raw.payload.styled.rootClass,
        rootClass,
      ].filter(Boolean),
    },
    payload: {
      styled: { styles: combinedStyles, rootClass, tag },
    },
  });
}

const styledFunction = (baseComponent: StyledComponent): StyledTagFn => {
  return (strings, ...values) =>
    createStyledElement(baseComponent, strings, values, baseComponent);
};

export const styled: StyledFn = new Proxy(styledFunction, {
  get(_target, tag: string) {
    return (strings: TemplateStringsArray, ...values: unknown[]) =>
      createStyledElement(tag, strings, values);
  },
}) as StyledFn;
