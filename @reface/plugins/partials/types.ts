import type { Template } from "@reface/template";

export interface PartialPayload {
  partial: {
    name: string;
    handler: PartialHandler<any, Template<any, any>>;
  };
}

export type PartialHandler<
  C,
  T extends Template<any, any> = Template<any, any>,
> = (
  context: C,
) => Promise<T>;

export type PartialFn<C, T extends Template = Template> = (
  handler: PartialHandler<C, T>,
  name: string,
) => T;
