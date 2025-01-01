import { component, html } from "@reface/recast";
import type { ElementChildType } from "@reface/recast";
import { body, head, link, meta, script, title } from "@reface/recast/elements";
import type { Template } from "@reface/recast";
import { HeadSlot } from "@reface/recast/slots";

export type LayoutSimpleProps = {
  htmx?: boolean;
  alpine?: boolean;
  bootstrap?: boolean;
  normalizeCss?: boolean;
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
      normalizeCss,
      alpine,
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
      normalizeCss && link({
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
        rel: "stylesheet",
      })
    }
        ${
      bootstrap && link({
        href:
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
        rel: "stylesheet",
      })
    }
      ${
      alpine &&
      script({
        src: "https://cdn.jsdelivr.net/npm/alpinejs@3.15.2/dist/cdn.min.js",
      })
    }
        ${pageHead}
        ${HeadSlot}
      `}
      ${body`${children}`}
    </html>
  `;
  });
