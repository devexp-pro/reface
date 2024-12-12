import { createLogger } from "@reface/core";
import { TemplateComponent } from "@reface/html";
import type { ElementChildType } from "@reface/html";
import type { IRenderContext } from "@reface/html";
import { ISLAND_HTML_ATTRIBUTE } from "./constants.ts";

const logger = createLogger("HTML:Island");

export class TemplateIsland extends TemplateComponent {
  constructor(
    private islandName: string,
    private handler: () => Promise<unknown>,
    attributes: Record<string, unknown>,
    children: ElementChildType[],
  ) {
    super("div", {
      ...attributes,
      [ISLAND_HTML_ATTRIBUTE]: islandName,
    }, children);

    this.handler = handler;
    this.islandName = islandName;

    logger.debug("Creating island template", {
      name: islandName,
      attributes: attributes,
    });
  }

  override toHtml(context: IRenderContext): string {
    context.islands.set(this.islandName, this.handler);

    logger.debug("Rendering island template", {
      name: this.islandName,
      depth: context.depth,
    });

    return super.toHtml(context);
  }
}
