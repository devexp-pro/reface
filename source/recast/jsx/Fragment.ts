import { type Children, fragmentExpression } from "@recast/expressions";

export function Fragment(_: any, children: Children) {
  return fragmentExpression.create(children);
}
