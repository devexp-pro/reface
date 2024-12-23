import type { Template } from "@reface/template";
import type { HxBuilder } from "@reface/htmx";

export interface PartialPayload {
  partial: {
    name: string;
    handler: () => Promise<unknown>;
  };
}

export type PartialHandler<T> = (props: Record<string, unknown>) => Promise<T>;

export type PartialComponent<T> = Template & {
  execute: () => Promise<T>;
  trigger: (trigger?: string) => HxBuilder;
};

export type PartialFn = {
  <T>(handler: PartialHandler<T>, name: string): PartialComponent<T>;
};
