import { createLogger } from "@reface/core";

const logger = createLogger("HTML:Scripts");

/**
 * Collects and deduplicates scripts during rendering
 */
export class ScriptCollector {
  private scripts = new Set<string>();
  private scriptFiles = new Set<string>();
  private duplicateCount = 0;

  /**
   * Add inline script
   */
  addScript(script: string) {
    logger.debug("Adding inline script", {
      length: script.length,
      currentCount: this.scripts.size,
    });

    if (this.scripts.has(script)) {
      this.duplicateCount++;
      logger.warn("Duplicate script detected", {
        script,
        duplicateCount: this.duplicateCount,
      });
      return;
    }

    this.scripts.add(script);
    logger.debug("Script added", {
      newCount: this.scripts.size,
    });
  }

  /**
   * Add external script file
   */
  addScriptFile(src: string) {
    logger.debug("Adding script file", { src });

    if (this.scriptFiles.has(src)) {
      this.duplicateCount++;
      logger.warn("Duplicate script file detected", {
        src,
        duplicateCount: this.duplicateCount,
      });
      return;
    }

    this.scriptFiles.add(src);
    logger.debug("Script file added", {
      newCount: this.scriptFiles.size,
    });
  }

  toString() {
    if (this.scripts.size === 0 && this.scriptFiles.size === 0) {
      logger.debug("No scripts to render");
      return "";
    }

    const parts: string[] = [];

    // Add external scripts
    if (this.scriptFiles.size > 0) {
      const files = Array.from(this.scriptFiles);
      logger.info("Rendering script files", { count: files.length });

      files.forEach((src) => {
        parts.push(`<script src="${src}" defer></script>`);
      });
    }

    // Add inline scripts
    if (this.scripts.size > 0) {
      const scripts = Array.from(this.scripts);
      logger.info("Rendering inline scripts", {
        count: scripts.length,
        totalLength: scripts.reduce((acc, s) => acc + s.length, 0),
      });

      parts.push(`<script>\n${scripts.join("\n")}\n</script>`);
    }

    logger.info("Scripts rendered", {
      filesCount: this.scriptFiles.size,
      inlineCount: this.scripts.size,
      duplicatesSkipped: this.duplicateCount,
    });

    return parts.join("\n");
  }

  clear() {
    const filesCount = this.scriptFiles.size;
    const scriptsCount = this.scripts.size;

    this.scripts.clear();
    this.scriptFiles.clear();
    this.duplicateCount = 0;

    logger.debug("Scripts cleared", {
      clearedFiles: filesCount,
      clearedScripts: scriptsCount,
    });
  }
}
