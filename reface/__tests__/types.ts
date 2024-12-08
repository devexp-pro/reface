/**
 * HTML comparison options
 */
export interface CompareHTMLOptions {
  /** Ignore whitespace differences */
  ignoreWhitespace?: boolean;
  /** Ignore attribute order */
  ignoreAttributeOrder?: boolean;
  /** Custom comparison function */
  compare?: (actual: string, expected: string) => boolean;
}
