import { type ElementChildType, RefaceTemplateElement } from "@reface";
import { generateClassName } from "./classGenerator.ts";
import { parseCSS } from "./cssParser.ts";
import type { IStyled, IStyledComponent, IStyledTagFunction } from "./types.ts";

function createStyledElement<Tag extends string>(
  tagOrComponent: Tag | IStyledComponent<Tag>,
  css: TemplateStringsArray,
  values: unknown[],
  parentComponent?: IStyledComponent<Tag>,
): IStyledComponent<Tag> {
  const rootClass = generateClassName();
  const rawCss = String.raw({ raw: css }, ...values);
  const styles = parseCSS(rawCss, rootClass);

  const tag = typeof tagOrComponent === "string"
    ? tagOrComponent
    : (tagOrComponent as IStyledComponent<Tag>).tag;

  const combinedStyles = parentComponent
    ? `${parentComponent.payload?.styled?.styles}\n${styles}`
    : styles;

  const componentFn =
    ((props: Record<string, unknown> = {}, children?: unknown[]) => {
      if (children) {
        return new RefaceTemplateElement({
          tag,
          attributes: {
            ...props,
            class: [
              rootClass,
              parentComponent?.payload?.styled?.rootClass,
              props.class,
            ].filter(Boolean).join(" "),
          },
          children: children as ElementChildType[],
          payload: {
            styled: {
              styles: combinedStyles,
              rootClass,
              tag,
            },
          },
        });
      }

      return (
        strings: TemplateStringsArray = Object.assign([], { raw: [] }), // FIXME: magi
        ...values: unknown[]
      ) => {
        const templateChildren = [];
        for (let i = 0; i < strings.length; i++) {
          if (strings[i].trim()) {
            templateChildren.push(strings[i]);
          }
          if (i < values.length) {
            templateChildren.push(values[i]);
          }
        }

        return new RefaceTemplateElement({
          tag,
          attributes: {
            ...props,
            class: [
              rootClass,
              parentComponent?.payload?.styled?.rootClass,
              props.class,
            ].filter(Boolean).join(" "),
          },
          children: templateChildren as ElementChildType[],
          payload: {
            styled: {
              styles: combinedStyles,
              rootClass,
              tag,
            },
          },
        });
      };
    }) as IStyledComponent<Tag>;

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
  baseComponent: IStyledComponent<Tag>,
) => {
  return ((strings: TemplateStringsArray, ...values: unknown[]) =>
    createStyledElement<Tag>(
      baseComponent,
      strings,
      values,
      baseComponent,
    )) as unknown as IStyledTagFunction<Tag>;
};

// @ts-ignore: Proxy is not supported in TypeScript
export const styled: IStyled = new Proxy(styledFunction, {
  // @ts-ignore: Proxy is not supported in TypeScript
  get<Tag extends string>(_target: IStyledType, tag: string) {
    return ((strings: TemplateStringsArray, ...values: unknown[]) =>
      createStyledElement<string>(
        tag,
        strings,
        values,
        undefined,
      )) as unknown as IStyledTagFunction<Tag>;
  },
});

export default styled;
