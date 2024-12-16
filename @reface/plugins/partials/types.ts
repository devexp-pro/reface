import type { ComponentWithProps } from "@reface/types";
import type { TemplatePartial } from "./TemplatePartial.ts";
import type { HxBuilder, HxTrigger } from "@reface/htmx";

export interface IPartialComponent<T> extends ComponentWithProps {
  tag: string;
  handler: () => T;
  execute: () => T;
  trigger: (event?: string) => Record<string, string>;
  payload: {
    partial: {
      id: string;
      handler: () => T;
    };
  };
}

export interface PartialComponent<T>
  extends ComponentWithProps<TemplatePartial<T>> {
  trigger: (trigger?: HxTrigger) => HxBuilder;
}

export type PartialHandler<T> = (props: Record<string, unknown>) => T;

export type PartialFn = {
  <T>(handler: PartialHandler<T>, name: string): PartialComponent<T>;
};
