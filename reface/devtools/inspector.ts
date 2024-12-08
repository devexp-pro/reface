import { createLogger } from "@reface/core";
import type { FiberNode } from "./types.ts";

const logger = createLogger("DevTools:Inspector");

declare global {
  interface Window {
    __REFACE_INSPECTOR__: {
      registerElement(element: Element, fiber: FiberNode): void;
      enable(): void;
      disable(): void;
      highlightElement(element: Element): void;
    };
  }
}

export const inspector = {
  registerElement(element: Element, fiber: FiberNode) {
    logger.debug("Registering element", {
      element: element.tagName,
      fiber: fiber.type,
    });
    if (typeof window !== "undefined") {
      window.__REFACE_INSPECTOR__?.registerElement(element, fiber);
    }
  },

  enable() {
    logger.info("Enabling inspector");
    if (typeof window !== "undefined") {
      window.__REFACE_INSPECTOR__?.enable();
    }
  },

  disable() {
    logger.info("Disabling inspector");
    if (typeof window !== "undefined") {
      window.__REFACE_INSPECTOR__?.disable();
    }
  },

  highlightElement(element: Element) {
    if (typeof window !== "undefined") {
      window.__REFACE_INSPECTOR__?.highlightElement(element);
    }
  },
};
