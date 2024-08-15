export type BaseAppOptions = {
  baseUrl?: string;
  staticPath?: string;
};

export type Layout = (page: string, appOptions: BaseAppOptions) => string;

export type ApiRequest<T> = {
  data: T;
  route: string;
  params: { [x: string]: string };
  query: Record<string, string>;
  headers: Record<string, string>;
  formData?: Record<string, string>;
};

export type ApiResponse = {
  html?: string;
  status?: number;
};

export type ApiHandlers<T> = {
  [method: string]: ApiHandler<T>;
};

export type ApiHandler<T> = (req: ApiRequest<T>) => Promise<ApiResponse>;

export type LayoutOptions = {
  title?: string;
  scripts?: {
    src: string;
    integrity?: string;
    defer?: boolean;
    async?: boolean;
    crossorigin?: string;
  }[];
  styles?: {
    href: string;
    integrity?: string;
    defer?: boolean;
    async?: boolean;
    crossorigin?: string;
  }[];
};

export type ResourceScriptOptions = {};
export type ResourceStyleOptions = {};

export type BaseComponentProps = {
  /**
   * api endpoints
   */
  api: {
    base: string;
    page: string;
    me: string;
  };
};

export type ComponentObject<T> = {
  isComponent: true;
  struct: (baseProps: BaseComponentProps) => {
    str: TemplateStringsArray;
    args: any[];
  };
  api?: ApiHandlers<T>;
  name?: string;
};

export type Component<T> = (props: T) => ComponentObject<T>;

export type BasePageProps = {
  route: string;
  params: { [x: string]: string };
  headers: Record<string, string>;
  query: Record<string, string>;
};

export type PageObject<T> = {
  isPage: true;
  struct: (baseProps: BaseComponentProps & BasePageProps) => {
    str: TemplateStringsArray;
    args: any[];
  };
  api?: ApiHandlers<T>;
  name?: string;
};

export type Page<T> = (props: T) => PageObject<T>;

export type Element<T> = (props: T) => {
  isElement: true;
  struct: (baseProps: BaseComponentProps) => {
    str: TemplateStringsArray;
    args: any[];
  };
};