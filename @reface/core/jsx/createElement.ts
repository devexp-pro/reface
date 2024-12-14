import type {
  Component,
  ComponentProps,
  ElementChildType,
  ITemplate,
  JSXComponent,
} from "../types.ts";
import { TemplateElement } from "../templates/mod.ts";

/**
 * Creates elements for JSX. Handles both HTML elements and components.
 *
 * @param type - HTML tag name or component function
 * @param props - Element/component properties
 * @param children - Child elements
 * @returns Template instance
 *
 * @example
 * // HTML elements
 * createElement('div', { class: 'container' }, 'content');
 *
 * // Components
 * createElement(Button, { color: 'primary' }, 'Click me');
 *
 * // JSX transformation
 * <div class="container">content</div>
 * <Button color="primary">Click me</Button>
 */
export function createElement<P extends ComponentProps = ComponentProps>(
  type: string | Component<P>,
  props: P | null,
  ...children: ElementChildType[]
): ITemplate {
  // Для функциональных компонентов
  if (typeof type === "function") {
    return type(props ?? {} as P, children);
  }

  // Для HTML элементов
  return new TemplateElement({
    tag: type,
    attributes: props ?? {},
    children,
  });
}
