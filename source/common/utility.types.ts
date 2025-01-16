export type EmptyRecord = Record<string | number | symbol, never>;
export type Arrayable<T> = T | T[];
export type Promiseable<T> = T | Promise<T>;
