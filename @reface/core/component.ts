import type {
  Component,
  ComponentProps,
  ElementChildType,
  ITemplate,
} from "./types.ts";
import { TemplateFn } from "./templates/TemplateFn.ts";

/**
 * Creates a reusable component with support for both JSX and template literals.
 *
 * @template Props - Component props type
 * @template Children - Children elements type (use 'never' to prevent children)
 * @param render - Function that renders the component
 * @returns Component function that can be used with JSX or template literals
 *
 * @example
 * // With children
 * const Button = component<ButtonProps>((props, children) => {
 *   return new TemplateElement({
 *     tag: 'button',
 *     attributes: props,
 *     children
 *   });
 * });
 *
 * // Usage:
 * Button({ color: 'primary' })`Click me`; // Template literal
 * <Button color="primary">Click me</Button>; // JSX
 *
 * // Without children
 * const Icon = component<IconProps, never>((props) => {
 *   return new TemplateElement({
 *     tag: 'i',
 *     attributes: { class: `icon-${props.name}` }
 *   });
 * });
 *
 * // Usage:
 * Icon({ name: 'home' }); // OK
 * Icon({ name: 'home' })`content`; // Error: no children allowed
 */
export function component<P extends ComponentProps>(
  render: (props: P, children: ElementChildType[]) => ITemplate,
): Component<P> {
  const componentFunction = ((props: P, children?: ElementChildType[]) => {
    if (children) {
      return render(props, children);
    }

    // Создаем функцию для template literal вызова
    const templateFn = new TemplateFn((templateChildren) =>
      render(props, templateChildren)
    );

    // Возвращаем fn свойство для template literal вызова
    return templateFn.fn;
  }) as Component<P>;

  return componentFunction;
}
