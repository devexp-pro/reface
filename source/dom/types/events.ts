// События
export type EventHandler = `${string}(${string})` | undefined;

export interface EventAttributes {
  onClick?: EventHandler;
  onChange?: EventHandler;
  onSubmit?: EventHandler;
  onInput?: EventHandler;
  onKeyDown?: EventHandler;
  onKeyUp?: EventHandler;
  onFocus?: EventHandler;
  onBlur?: EventHandler;
  onMouseEnter?: EventHandler;
  onMouseLeave?: EventHandler;
  [key: `on${Capitalize<string>}`]: EventHandler;
}
