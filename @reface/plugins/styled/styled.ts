import type { StyledComponent, StyledFn, StyledTagFn } from "./types.ts";
import { generateClassName } from "./classGenerator.ts";
import { parseCSS } from "./cssParser.ts";
import { StyledTemplate } from "./StyledTemplate.ts";

function createStyledElement(
  tagOrComponent: string | StyledComponent,
  css: TemplateStringsArray,
  values: unknown[],
  parentComponent?: StyledComponent,
): StyledComponent {
  const rootClass = generateClassName();
  const rawCss = String.raw({ raw: css }, ...values);
  const styles = parseCSS(rawCss, rootClass);

  const tag = typeof tagOrComponent === "string"
    ? tagOrComponent
    : tagOrComponent.tag;

  const combinedStyles = parentComponent
    ? `${parentComponent.payload.styled.styles}\n${styles}`
    : styles;

  return new StyledTemplate({
    tag,
    attributes: {
      class: [parentComponent?.payload?.styled?.rootClass].filter(Boolean),
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
});
