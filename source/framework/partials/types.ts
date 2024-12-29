/**
 * Метаданные partial компонента
 */
export interface MetaPartial {
  /** Уникальное имя partial */
  name: string;
  /** Обработчик partial запроса */
  handler: PartialHandler<any>;
  /** Префикс API пути */
  apiPrefix: string;
}

/**
 * Обработчик partial запроса
 */
export type PartialHandler<
  C = unknown,
  T extends Template = Template,
> = (context: C) => Promise<T>;

/**
 * Функция создания partial компонента
 */
export type PartialFn<C = unknown, T extends Template = Template> = (
  handler: PartialHandler<C, T>,
  name: string,
) => T;

/**
 * Опции для PartialsPlugin
 */
export interface PartialsPluginOptions {
  /** Префикс API пути для partial запросов */
  apiPrefix?: string;
}

/**
 * Расширение для Template с partial методами
 */
export interface PartialTemplate extends Template {
  /** Выполнить partial запрос */
  execute(): Promise<Template>;
  /** Получить HTMX атрибуты для триггера */
  trigger(): Record<string, string>;
}
