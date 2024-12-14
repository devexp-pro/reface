import type { StyledComponent, StyleRegistry } from "../types.ts";

export class StyleRegistryImpl implements StyleRegistry {
  private styles = new Map<string, string>();

  add(component: StyledComponent): void {
    if (!this.styles.has(component.rootClass)) {
      this.styles.set(component.rootClass, component.styles);
    }
  }

  getStyleTag(): string {
    if (this.styles.size === 0) return "";

    const styles = Array.from(this.styles.entries())
      .map(([className, css]) => this.processStyles(className, css))
      .join("\n");

    return `<style>\n${styles}\n</style>`;
  }

  private processStyles(className: string, css: string): string {
    // Здесь будет обработка CSS
    return css;
  }
}
