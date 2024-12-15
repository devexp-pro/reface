import type {
  Component,
  ComponentProps,
  ElementChildType,
  IRefaceTemplate,
} from "@reface/types";
import { RefaceTemplateElement } from "@reface";

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
): IRefaceTemplate {
  // Для функциональных компонентов
  if (typeof type === "function") {
    return type(props ?? {} as P, children);
  }

  // Для HTML элементов
  return new RefaceTemplateElement({
    tag: type,
    attributes: props ?? {},
    children,
  });
}
