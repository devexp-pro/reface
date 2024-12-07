/**
 * Base layout options
 */
export interface LayoutOptions {
  title?: string;
  description?: string;
  favicon?: string;
  head?: string;
}

/**
 * Layout function type
 */
export type Layout = (content: string) => string;
