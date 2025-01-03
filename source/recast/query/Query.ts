import type { QuerySelector } from "./types.ts";

export class Query {
  private selector: QuerySelector = {};

  static from() {
    return new Query();
  }

  type(type: string) {
    this.selector.type = type;
    return this;
  }

  attr(attributes: Record<string, any>) {
    this.selector.attributes = { ...this.selector.attributes, ...attributes };
    return this;
  }

  hasChildren(has = true) {
    this.selector.hasChildren = has;
    return this;
  }

  children(...childQueries: Query[]) {
    this.selector.children = childQueries;
    return this;
  }

  or(...queries: Query[]) {
    this.selector.or = queries;
    return this;
  }

  and(...queries: Query[]) {
    this.selector.and = queries;
    return this;
  }

  not(query: Query) {
    this.selector.not = query;
    return this;
  }

  getSelector(): QuerySelector {
    return this.selector;
  }
}
