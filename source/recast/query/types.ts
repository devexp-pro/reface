import type { Template } from "../template/types.ts";
import type { Query } from "./Query.ts";
export type QuerySelector = {
  type?: string;
  attributes?: Record<string, any>;
  hasChildren?: boolean;
  children?: Query[];
  or?: Query[];
  and?: Query[];
  not?: Query;
};

export type QueryTransformer = (node: Template) => Template;
