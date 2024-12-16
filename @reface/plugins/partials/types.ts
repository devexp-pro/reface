// @reface/plugins/partials/types.ts
import type { ComponentWithProps, ElementChildType } from "@reface/types";
import type { TemplatePartial } from "./TemplatePartial.ts";
import type { HxBuilder, HxTrigger } from "@reface/htmx";

export interface PartialComponent<T>
  extends ComponentWithProps<TemplatePartial<T>> {
  trigger: (trigger?: HxTrigger) => HxBuilder;
}

export type PartialHandler<T = any> = (props: Record<string, unknown>) => T;

export type PartialFn = {
  <T>(handler: PartialHandler<T>, name: string): PartialComponent<T>;
};
