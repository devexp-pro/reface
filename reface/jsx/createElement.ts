import { createLogger } from "@reface/core";
import { TemplateComponent } from "@reface/html";

const logger = createLogger("JSX");

export function createElement(
  tag: string | Function,
  props: Record<string, unknown> | null,
  ...children: unknown[]
): TemplateComponent {
  // Если это функция-компонент
  if (typeof tag === "function") {
    return tag(props ?? {}, children);
  }

  // Создаем такой же объект, как если бы делали руками
  return new TemplateComponent(
    tag,
    props ?? {},
    children,
  );
}
