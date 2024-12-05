import type { Template } from "../../types.ts";
import type { ElementChild } from "../types/base.ts";

export interface JSXProps {
  children?: ElementChild[];
  [key: string]: unknown;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: JSXProps;
      button: JSXProps;
      span: JSXProps;
      // добавить другие HTML элементы по необходимости
    }
  }
}
