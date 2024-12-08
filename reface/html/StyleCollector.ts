import { createLogger } from "@reface/core";

const logger = createLogger("HTML:Styles");

/**
 * Collects and deduplicates styles during rendering
 */
export class StyleCollector {
  private styles = new Set<string>();
  private duplicateCount = 0;

  add(css: string) {
    logger.debug("Adding style", {
      length: css.length,
      currentCount: this.styles.size,
    });

    if (this.styles.has(css)) {
      this.duplicateCount++;
      logger.warn("Duplicate style detected", {
        css,
        duplicateCount: this.duplicateCount,
      });
      return;
    }

    this.styles.add(css);
    logger.debug("Style added", {
      newCount: this.styles.size,
    });
  }

  toString() {
    if (this.styles.size === 0) {
      logger.debug("No styles to render");
      return "";
    }

    const styles = Array.from(this.styles);
    logger.info("Rendering styles", {
      count: styles.length,
      totalLength: styles.reduce((acc, s) => acc + s.length, 0),
      duplicatesSkipped: this.duplicateCount,
    });

    return `<style>\n${styles.join("\n")}\n</style>`;
  }

  clear() {
    const count = this.styles.size;
    this.styles.clear();
    this.duplicateCount = 0;
    logger.debug("Styles cleared", { clearedCount: count });
  }
}
