import type { Template } from "../html/types.ts";

export function Fragment({ children }: { children?: Template[] }): Template[] {
  return children || [];
}
