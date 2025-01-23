import {
  type Children,
  fragmentExpression,
  type FragmentNode,
} from "@recast/expressions/mod.ts";

export function Fragment(_: any, children: Children): FragmentNode {
  return fragmentExpression.create(children);
}
