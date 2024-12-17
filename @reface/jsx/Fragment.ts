import { getChildren } from "../utils/getChildren.ts";
import { RefaceTemplate } from "../RefaceTemplate.ts";

export function Fragment(_, children) {
  return new RefaceTemplate({
    children: getChildren(children),
  });
}
