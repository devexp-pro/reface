import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { TemplateBase } from "./TemplateBase.ts";

const logger = createLogger("HTML:Fragment");

/**
 * Fragment template for arrays of elements
 */
export class TemplateFragment extends TemplateBase {
  constructor(children: ElementChildType[]) {
    super({
      tag: "fragment",
      children,
    });
  }

  /**
   * Create fragment from JSX children
   */
  static fromJSX(children: ElementChildType[]): TemplateFragment {
    logger.debug("Creating fragment from JSX", {
      childrenCount: children.length,
    });

    try {
      return new TemplateFragment(children);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Failed to create fragment", error, { children });
      } else {
        logger.error(
          "Unknown error creating fragment",
          new Error(String(error)),
          { children },
        );
      }
      throw error;
    }
  }

  /**
   * Check if value is TemplateFragment
   */
  static isFragment(value: unknown): value is TemplateFragment {
    return value instanceof TemplateFragment;
  }
}
