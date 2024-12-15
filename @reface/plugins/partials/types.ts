import type { IRefaceTemplateElement } from "@reface";

export interface PartialPluginOptions {
  apiPrefix?: string;
}

export interface IPartialHandler<T = unknown> {
  (data?: unknown): Promise<T>;
}

export interface IPartialAPI<T> {
  (props?: Record<string, unknown>): IRefaceTemplateElement;
  handler: IPartialHandler<T>;
  name: string;
  execute: () => Promise<T>;
  trigger: (event?: string) => Record<string, string>;
}

export type PartialFn<T> = (
  handler: (data: T) => Promise<any>,
  name: string,
) => IPartialAPI<T>;
