import type { Template } from "@reface/template";

export interface PartialPayload {
  partial: {
    name: string;
    handler: () => Promise<unknown>;
  };
}

export type PartialHandler<T> = (props: Record<string, unknown>) => Promise<T>;

export type PartialFn = {
  <T>(handler: PartialHandler<T>, name: string): Template;
};
