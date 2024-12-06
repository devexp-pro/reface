import type {
  Template,
  TemplateGenerator,
  PageProps,
  Layout,
  RpcDefinition,
  Island,
} from "../core/mod.ts";

/**
 * Reface options interface
 */
export interface RefaceOptions {
  layout: Layout;
}

/**
 * Reface router types
 */
export interface RouteHandler {
  (ctx: PageProps): Template | Promise<Template>;
}

export interface RouterOptions {
  prefix?: string;
  middleware?: MiddlewareHandler[];
}

export interface MiddlewareHandler {
  (ctx: PageProps, next: () => Promise<void>): Promise<void>;
}
