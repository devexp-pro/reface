// Основные типы для методов
export type HxMethod = "get" | "post" | "put" | "delete" | "patch";
export type HxSwapMode =
  | "innerHTML"
  | "outerHTML"
  | "beforebegin"
  | "afterbegin"
  | "beforeend"
  | "afterend"
  | "delete"
  | "none";
export type HxQueueOption = "first" | "last" | "all" | "none";

export type HxIntersectRoot = `root:${string}`;
export type HxIntersectThreshold = `threshold:${number}`;
export type HxIntersectOption = HxIntersectRoot | HxIntersectThreshold;

export type HxFromTarget =
  | "document"
  | "window"
  | `closest ${string}`
  | `find ${string}`
  | "next"
  | `next ${string}`
  | "previous"
  | `previous ${string}`;

export interface HxTriggerModifiers {
  once?: boolean;
  changed?: boolean;
  delay?: number;
  throttle?: number;
  from?: string | HxFromTarget;
  target?: string;
  consume?: boolean;
  queue?: HxQueueOption;
  intersect?: HxIntersectOption[];
  filter?: string;
}

export type HxTriggerEvent =
  | "load"
  | "revealed"
  | "intersect"
  | "click"
  | "change"
  | "keyup"
  | "keydown"
  | "submit"
  | "focus"
  | "blur"
  | string;

export interface HxTriggerConfig {
  event: HxTriggerEvent;
  polling?: `every ${number}s` | `every ${number}ms`;
  modifiers?: HxTriggerModifiers;
}

export type HxTrigger =
  | HxTriggerEvent
  | HxTriggerConfig
  | (HxTriggerEvent | HxTriggerConfig)[];

// Типы для конфигурации
export interface HxConfig {
  method?: HxMethod;
  url?: string;
  trigger?: HxTrigger;
  target?: string;
  swap?: HxSwapMode;
  select?: string;
  vals?: Record<string, unknown>;
  headers?: Record<string, string>;
  params?: string[];
  sync?: string;
  // ... другие опции
}

// Тип для всех возможных hx-атрибутов
export type HxAttributes = {
  "hx-get"?: string;
  "hx-post"?: string;
  "hx-put"?: string;
  "hx-patch"?: string;
  "hx-delete"?: string;
  "hx-trigger"?: string;
  "hx-target"?: string;
  "hx-swap"?: HxSwapMode;
  "hx-on:*"?: string;
  "hx-push-url"?: string;
  "hx-select"?: string;
  "hx-select-oob"?: string;
  "hx-swap-oob"?: string;
  [key: `hx-${string}`]: string;
};

// Тип для самого билдера, теперь включает все возможные атрибуты
export interface HxBuilder extends HxAttributes {
  get(url: string): this;
  post(url: string): this;
  put(url: string): this;
  patch(url: string): this;
  delete(url: string): this;
  trigger(value: HxTrigger | HxTrigger[]): this;
  target(selector: string): this;
  swap(value: HxSwapMode): this;
  // ... остальные методы ...
}
