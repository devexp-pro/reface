import type { IRefaceComposerPlugin } from "@reface/types";

export interface DevToolsOptions {
  /**
   * Enable detailed logging
   * @default false
   */
  verbose?: boolean;
}

export interface DevToolsPlugin extends IRefaceComposerPlugin {
  name: "devtools";
}
