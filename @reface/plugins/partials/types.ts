import type { Template } from "@reface/template";

export interface PartialPayload {
  partial: {
    name: string;
    handler: () => Promise<unknown>;
  };
}

export type PartialHandler<C, T extends Template = Template> = (
  context: C,
) => Promise<T>;

export type PartialFn<C, T extends Template = Template> = (
  handler: PartialHandler<C, T>,
  name: string,
) => T;
