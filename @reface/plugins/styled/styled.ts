import { getChildren } from "../../utils/getChildren.ts";
import { RefaceTemplateElement } from "@reface";
import type { StyledComponent, StyledFn, StyledTagFn } from "./types.ts";
import { generateClassName } from "./classGenerator.ts";
import { parseCSS } from "./cssParser.ts";

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

  const styledComponent = ((props = {}) => {
    return (strings = Object.assign([], { raw: [] }), ...values) => {
      return new RefaceTemplateElement({
        tag,
        attributes: {
          ...props,
          class: [
            rootClass,
            parentComponent?.payload.styled.rootClass,
            props.class,
          ].filter(Boolean).join(" "),
        },
        children: getChildren(strings, values),
        payload: {
          styled: { styles: combinedStyles, rootClass, tag },
        },
      });
    };
  }) as StyledComponent;

  Object.assign(styledComponent, {
    tag,
    payload: {
      styled: { styles: combinedStyles, rootClass, tag },
    },
  });

  return styledComponent;
}

const styledFunction = (baseComponent: StyledComponent): StyledTagFn => {
  return (strings, ...values) =>
    createStyledElement(baseComponent, strings, values, baseComponent);
};

export const styled: StyledFn = new Proxy(styledFunction, {
  get(_target, tag: string) {
    return (strings, ...values) => createStyledElement(tag, strings, values);
  },
});
