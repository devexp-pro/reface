import { component, html } from "@reface";
import type { ElementChildType } from "@reface/types";
import { body, head, link, meta, script, title } from "@reface/elements";
import type { Template } from "@reface/template";

export type LayoutSimpleProps = {
  htmx?: boolean;
  bootstrap?: boolean;
  head?: ElementChildType;
  title?: string;
  description?: string;
  favicon?: string;
};

export const LayoutSimple: Template<LayoutSimpleProps, Record<string, any>> =
  component<LayoutSimpleProps>((props, children) => {
    const {
      title: pageTitle,
      description,
      favicon,
      htmx,
      bootstrap,
      head: pageHead,
    } = props;

    return html`
    <!DOCTYPE html>
    <html>
      ${head`
        ${meta({ charset: "UTF-8" })}
        ${
      meta({
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      })
    }
        ${title`${pageTitle}`}
        ${description && meta({ name: "description", content: description })}
        ${favicon && link({ rel: "icon", href: favicon })}
        ${htmx && script({ src: "https://unpkg.com/htmx.org@1.9.6" })}
        ${
      bootstrap && link({
        href:
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
        rel: "stylesheet",
      })
    }
        ${pageHead}
      `}
      ${body`${children}`}
    </html>
  `;
  });
