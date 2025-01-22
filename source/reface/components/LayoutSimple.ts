import {
  type Child,
  component,
  type ComponentNode,
  element as e,
  html,
} from "@recast";

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
      ${e.head`
        ${e.meta({ charset: "UTF-8" })}
        ${
    e.meta({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    })
  }
        ${e.title`${pageTitle}`}
        ${description && e.meta({ name: "description", content: description })}
        ${favicon && e.link({ rel: "icon", href: favicon })}
        ${htmx && e.script({ src: "https://unpkg.com/htmx.org@1.9.6" })}
        ${
    normalizeCss && e.link({
      href:
        "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
      rel: "stylesheet",
    })
  }
        ${
    bootstrap && e.link({
      href:
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
      rel: "stylesheet",
    })
  }
        ${pageHead}
      `}
      ${e.body`${children}`}
    </html>
  `;
});
