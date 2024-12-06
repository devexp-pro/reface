export type StyledComponent<T> = {
  (props?: T): Template & {
    (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  };
};
