import type {
  Component,
  ComponentFunction,
  ComponentProps,
  ElementChildType,
  IRefaceTemplate,
} from "./types.ts";

export const component: ComponentFunction = <P extends ComponentProps>(
  render: (props: P, children: ElementChildType[]) => IRefaceTemplate,
): Component<P> => {
  // Создаем функцию компонента с поддержкой обоих вариантов вызова
  const componentFn = ((props: P = {} as P, children?: ElementChildType[]) => {
    if (children) {
      // Прямой вызов с children
      return render(props, children);
    }

    // Возвращаем функцию для template literals
    return (
      strings: TemplateStringsArray = Object.assign([], { raw: [] }),
      ...values: ElementChildType[]
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
      return render(props, templateChildren);
    };
  }) as Component<P>;

  return componentFn;
};
