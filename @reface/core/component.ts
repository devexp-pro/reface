import type { ElementChildType, ITemplate } from "./templates/types.ts";
import { TemplateFn } from "./templates/TemplateFn.ts";

export interface IComponentWithChildren<
  Props = Record<string, unknown>,
  Children extends ElementChildType[] = ElementChildType[],
> {
  (props: Props): TemplateFn;
  (props: Props, children: Children): ITemplate;
}

export interface IComponentWithoutChildren<Props = Record<string, unknown>> {
  (props: Props): ITemplate;
}

export type IComponent<
  Props = Record<string, unknown>,
  Children extends ElementChildType[] | never = ElementChildType[],
> = Children extends never ? IComponentWithoutChildren<Props>
  : IComponentWithChildren<Props, Children>;

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
export function component<
  Props = Record<string, unknown>,
  Children extends ElementChildType[] | never = ElementChildType[],
>(
  fn: (props: Props, children?: Children) => ITemplate,
): IComponent<Props, Children> {
  return function (props: Props, children?: Children) {
    // Если переданы дети напрямую, убедимся что это массив
    if (children) {
      return fn(
        props,
        Array.isArray(children) ? children : [children] as Children,
      );
    }

    // Template literal вариант
    return new TemplateFn(
      (children) =>
        fn(props, Array.isArray(children) ? children : [children] as Children),
    ).fn;
  } as IComponent<Props, Children>;
}
