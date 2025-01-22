import { type Child, component, type ComponentNode, html } from "@recast";
import { body, head, link, meta, script, title } from "@recast/elements";

export type LayoutSimpleProps = {
  htmx?: boolean;
  bootstrap?: boolean;
  normalizeCss?: boolean;
  head?: Child;
  title?: string;
  description?: string;
  favicon?: string;
};

export const LayoutSimple: ComponentNode<
  LayoutSimpleProps,
  Record<string, any>
> = component<LayoutSimpleProps>((props, children) => {
  const {
    title: pageTitle,
    description,
    favicon,
    htmx,
    bootstrap,
    normalizeCss,
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
        ${pageHead}
      `}
      ${body`${children}`}
    </html>
  `;
});
