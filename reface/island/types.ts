import type { Template } from "@reface/html";

export type IslandTrigger =
  | string
  | string[]
  | {
    event?: string;
    every?: string | number;
    changed?: boolean;
    delay?: string | number;
    once?: boolean;
    from?: string;
    target?: string;
    filter?: string;
    [key: string]: unknown;
  };

export interface IslandResponse<T = unknown> {
  html?: string | Template;
  value?: T;
  trigger?: string;
  target?: string;
  swap?:
    | "innerHTML"
    | "outerHTML"
    | "beforebegin"
    | "afterbegin"
    | "beforeend"
    | "afterend";
}

export interface IslandInstance<T = unknown> {
  toHtml(): Template;
  trigger(trigger: IslandTrigger): string;
  execute(): Promise<T>;
}
