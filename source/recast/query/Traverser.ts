import type { Template } from "../template/types.ts";
import type { QueryTransformer } from "./types.ts";
import { Query } from "./Query.ts";
import { isTemplate } from "@reface/recast";

export class Traverser {
  find(template: Template, query: Query): Template[] {
    const results: Template[] = [];
    this.traverse(template, (node) => {
      if (this.matches(node, query)) results.push(node);
    });
    return results;
  }

  findFirst(template: Template, query: Query): Template | null {
    return this.find(template, query)[0] || null;
  }

  transform(
    template: Template,
    query: Query,
    transformer: QueryTransformer,
  ): Template {
    if (this.matches(template, query)) {
      return transformer(template);
    }

    if (template?.raw?.children) {
      template.raw.children = template.raw.children.map((child) =>
        this.transform(child as Template, query, transformer)
      );
    }

    return template;
  }

  private matches(template: Template, query: Query): boolean {
    const selector = query.getSelector();
    if (!isTemplate(template)) {
      return false;
    }

    // Проверяем OR условия
    if (selector.or?.length) {
      return selector.or.some((q) => this.matches(template, q));
    }

    // Проверяем AND условия
    if (selector.and?.length) {
      return selector.and.every((q) => this.matches(template, q));
    }

    // Проверяем NOT условие
    if (selector.not) {
      return !this.matches(template, selector.not);
    }

    let matches = true;

    // Проверяем тип
    if (selector.type) {
      matches = matches && template.raw.type === selector.type;
    }

    // Проверяем атрибуты
    if (selector.attributes) {
      matches = matches && Object.entries(selector.attributes).every(
        ([key, value]) => template.raw.attributes?.[key] === value,
      );
    }

    // Проверяем наличие детей
    if (selector.hasChildren !== undefined) {
      matches = matches &&
        Boolean(template.raw.children?.length) === selector.hasChildren;
    }

    // Проверяем детей по селекторам
    if (selector.children?.length) {
      matches = matches && selector.children.every((childQuery, index) => {
        const child = template.raw.children?.[index] as Template;
        return child && this.matches(child, childQuery);
      });
    }

    return matches;
  }

  private traverse(template: Template, callback: (node: Template) => void) {
    callback(template);
    if (template?.raw?.children) {
      template.raw.children.flat().forEach((child) => {
        this.traverse(child as Template, callback);
      });
    }
  }
}
