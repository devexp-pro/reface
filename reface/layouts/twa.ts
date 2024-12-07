import type { Layout, LayoutOptions } from "./types.ts";

/**
 * TWA layout options
 */
export interface TwaLayoutOptions extends LayoutOptions {
  script?: string;
  themeParams?: boolean;
}

/**
 * TWA layout - Telegram Web App
 */
export function twa(options: TwaLayoutOptions = {}): Layout {
  return (content: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>${options.title || "TWA App"}</title>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        ${
          options.themeParams
            ? `<script>
            const params = new URLSearchParams(window.location.search);
            if (params.has("tgWebAppThemeParams")) {
              document.documentElement.style.setProperty(
                "--tg-theme-bg-color",
                window.Telegram.WebApp.backgroundColor
              );
              document.documentElement.style.setProperty(
                "--tg-theme-text-color",
                window.Telegram.WebApp.textColor
              );
            }
          </script>`
            : ""
        }
        ${options.script ? `<script>${options.script}</script>` : ""}
        ${options.head || ""}
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}
