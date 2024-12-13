import { TemplateElement } from "../../core/templates/TemplateElement.ts";
import { generateClassName } from "./classGenerator.ts";
import { parseCSS } from "./cssParser.ts";
import type { Styled, StyledComponent, StyledTagFunction } from "./types.ts";

function createStyledElement<Tag extends string>(
  tagOrComponent: Tag | StyledComponent<Tag>,
  css: TemplateStringsArray,
  values: unknown[],
  parentComponent?: StyledComponent<Tag>,
): StyledComponent<Tag> {
  const rootClass = generateClassName();
  const rawCss = String.raw({ raw: css }, ...values);
  const styles = parseCSS(rawCss, rootClass);

  const tag = typeof tagOrComponent === "string"
    ? tagOrComponent
    : (tagOrComponent as StyledComponent<Tag>).tag;

  const combinedStyles = parentComponent
    ? `${parentComponent.payload.styled.styles}\n${styles}`
    : styles;

  const componentFn =
    ((props: Record<string, unknown> = {}, children?: unknown[]) => {
      if (children) {
        return new TemplateElement({
          tag,
          attributes: {
            ...props,
            class: [
              rootClass,
              parentComponent?.payload?.styled?.rootClass,
              props.class,
            ].filter(Boolean).join(" "),
          },
          children,
          payload: {
            styled: {
              styles: combinedStyles,
              rootClass,
              tag,
            },
          },
        });
      }

      return (strings: TemplateStringsArray = [], ...values: unknown[]) => {
        const templateChildren = [];
        for (let i = 0; i < strings.length; i++) {
          if (strings[i].trim()) {
            templateChildren.push(strings[i]);
          }
          if (i < values.length) {
            templateChildren.push(values[i]);
          }
        }

        return new TemplateElement({
          tag,
          attributes: {
            ...props,
            class: [
              rootClass,
              parentComponent?.payload?.styled?.rootClass,
              props.class,
            ].filter(Boolean).join(" "),
          },
          children: templateChildren,
          payload: {
            styled: {
              styles: combinedStyles,
              rootClass,
              tag,
            },
          },
        });
      };
    }) as StyledComponent<Tag>;

  Object.assign(componentFn, {
    tag,
    payload: {
      styled: {
        styles: combinedStyles,
        rootClass,
        tag,
      },
    },
  });

  return componentFn;
}

const styledFunction = <Tag extends string>(
  baseComponent: StyledComponent<Tag>,
) => {
  return ((strings: TemplateStringsArray, ...values: unknown[]) =>
    createStyledElement<Tag>(
      baseComponent,
      strings,
      values,
      baseComponent,
    )) as unknown as StyledTagFunction<Tag>;
};

export const styled = new Proxy(styledFunction, {
  get<Tag extends string>(_target: Styled, tag: PropertyKey) {
    return ((strings: TemplateStringsArray, ...values: unknown[]) =>
      createStyledElement<Tag>(
        String(tag),
        strings,
        values,
        undefined,
      )) as unknown as StyledTagFunction<Tag>;
  },
});

export default styled;
