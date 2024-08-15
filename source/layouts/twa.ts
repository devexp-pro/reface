// deno-lint-ignore-file no-unused-vars
import {
  alpinejs,
  htmx,
  hyperscript,
  telegramWebApp,
} from "$/resources/scripts.ts";
import { bluma, bootstrap } from "$/resources/styles.ts";
import { bootstrapIcons } from "$/resources/icons.ts";
import type { BaseAppOptions } from "$types";
import { layout } from "$/entities.ts";
import { html } from "$/helpers.ts";

/**
 * TWA is a layout for building TWA (Telegram Web Apps)
 * @param config - Layout configuration
 * @returns Layout function
 */
export const twa = layout<{
  hyperscript?: boolean;
  alpine?: boolean;
  bootstrap?: boolean;
  bootstrapIcons?: boolean;
  htmx?: boolean;
  bluma?: boolean;
}>((options) => {
  return (page: string, appOptions: BaseAppOptions) => {
    return `
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${options.htmx ? htmx : ""}
        ${options.alpine ? alpinejs : ""}
        ${options.hyperscript ? hyperscript : ""}
        ${options.bootstrap ? bootstrap : ""}
        ${options.bootstrapIcons ? bootstrapIcons : ""}
        ${options.bluma ? bluma : ""}
        ${telegramWebApp}
        <script src="${appOptions.staticPath}/script.js"></script>
        <link rel="stylesheet" href="${appOptions.staticPath}/style.css">
        <title>${options.title || "Reface TWA"}</title>
      </head>
      <body>
        ${page}
      </body>
    </html>
    `;
  };
});