/**
 * Collects and deduplicates styles during rendering
 */
export class StyleCollector {
  private styles = new Set<string>();

  add(css: string) {
    this.styles.add(css);
  }

  toString() {
    if (this.styles.size === 0) return "";
    return `<style>\n${Array.from(this.styles).join("\n")}\n</style>`;
  }
}
