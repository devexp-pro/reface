import type { Template } from "@reface/html";

export type RestHandlersType = {
  [method: string]: RestHandler;
};

export type RestHandlerType = (
  req: RefaceRequestType,
  // log: (...args: any[]) => void; TODO: add luminous logger
) => Promise<RefaceResponseType>;

export type RestHandler = (
  req: RefaceRequestType,
  // log: (...args: any[]) => void; TODO: add luminous logger
) => Promise<RefaceResponseType>;

export type RefaceRequestType = {
  api: string;
  route: string;
  params: { [x: string]: string };
  query: Record<string, string>;
  headers: Record<string, string>;
  formData: FormData;
};

export type RefaceResponseType = {
  html?: string;
  status?: number;
};

export type RpcDefinitionType = { [key: string]: any };

export type RpcCallsType<R> = {
  hx: {
    [key in keyof R]: (args?: R[key]) => string;
  };
};

export type RpcHandlersType<R> = {
  [key in keyof R]: (
    _: {
      args: R[key];
      // req: RefaceRequest; TODO: add req
      // log: (...args: any[]) => void; TODO: add luminous logger
    },
  ) => Promise<{
    html?: string;
    status?: number;
  }>;
};

export type IslandType<R, P> = {
  name?: string;
  template: (
    args: {
      props: P;
      rpc: RpcCallsType<R>;
      // log: (...args: any[]) => void; TODO: add luminous logger
      rest: {
        hx: (
          name: string | "self",
          method: "get" | "post" | "put" | "delete" | "patch",
          route: string,
        ) => string;
      };
      partial?: (name: string) => string; // TODO: add partial
      island?: (name: string) => string; // TODO: add island
    },
  ) => Template;
  rpc?: RpcHandlersType<R>;
  rest?: RestHandlersType;
};
