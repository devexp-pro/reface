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
export type HxTrigger = string | {
  event: string;
  delay?: number;
  throttle?: number;
  queue?: "first" | "last" | "all" | "none";
  once?: boolean;
  every?: number;
};

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
