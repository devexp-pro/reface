import type {
  ComponentProps,
  ComponentWithProps,
  ElementChildType,
  IRefaceTemplate,
} from "@reface/types";
import { RefaceTemplateElement } from "@reface";

/**
 * Creates elements for JSX. All components are called using template literal syntax.
 *
 * @param type - HTML tag name or component function
 * @param props - Element/component properties
 * @param children - Child elements
 * @returns Template instance
 *
 * @example
 * // HTML elements
 * createElement('div', { class: 'container' }, 'content');
 * // -> <div class="container">content</div>
 *
 * // Components are called using template literal syntax internally
 * createElement(Button, { color: 'primary' }, 'Click me');
 * // -> Button({ color: 'primary' })`Click me`
 */
export function createElement<P extends ComponentProps = ComponentProps>(
  type: string | ComponentWithProps,
  props: P | null,
  ...children: ElementChildType[]
): IRefaceTemplate {
  // Для компонентов всегда используем template literal синтаксис
  if (typeof type === "function") {
    const result = type(props ?? {});

    // Если компонент сразу вернул шаблон
    if ("type" in result) {
      return result as IRefaceTemplate;
    }

    // Иначе вызываем как template literal
    return result(
      Object.assign(["", ""], { raw: ["", ""] }),
      children.length === 1 ? children[0] : children,
    );
  }

  // Для HTML элементов создаем базовый шаблон
  return new RefaceTemplateElement({
    tag: type,
    attributes: props ?? {},
    children,
  });
}
