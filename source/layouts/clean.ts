import type { Layout, LayoutOptions } from "./types.ts";

/**
 * Clean layout options
 */
export interface CleanLayoutOptions extends LayoutOptions {
  htmx?: boolean;
  bootstrap?: boolean;
}

/**
 * Clean layout - minimal HTML5 boilerplate
 */
export function clean(options: CleanLayoutOptions = {}): Layout {
  return (content: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${options.title || "Reface App"}</title>
        ${
          options.description
            ? `<meta name="description" content="${options.description}">`
            : ""
        }
        ${options.favicon ? `<link rel="icon" href="${options.favicon}">` : ""}
        ${
          options.htmx
            ? '<script src="https://unpkg.com/htmx.org@1.9.6"></script>'
            : ""
        }
        ${
          options.bootstrap
            ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">'
            : ""
        }
        ${options.head || ""}
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}
