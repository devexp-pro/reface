import { type Children, fragmentExpression } from "@recast/expressions/mod.ts";

export function Fragment(_: any, children: Children) {
  return fragmentExpression.create(children);
}
