import { createLogger } from "@reface/core";
import { TemplateComponent } from "@reface/html";
import type { ElementChildType } from "@reface/html";
import type { IRenderContext } from "@reface/html";

const logger = createLogger("HTML:Island");

export const API_PATH = "/reface-island";

export class TemplateIsland extends TemplateComponent {
  constructor(
    private islandName: string,
    private handler: () => Promise<unknown>,
    attributes: Record<string, unknown>,
    children: ElementChildType[],
  ) {
    const baseAttributes = {
      "data-island": islandName,
      "hx-get": `${API_PATH}/${islandName}`,
    };

    super("div", {
      ...baseAttributes,
      ...attributes,
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
