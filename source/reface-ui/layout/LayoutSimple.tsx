import { type Child, component, type ComponentNode } from "@recast";
import { BodyEndSlot, HeadSlot, TitleSlot } from "@recast/slots";

export type LayoutSimpleProps = {
  htmx?: boolean;
  alpine?: boolean;
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
    normalizeCss = true,
    alpine,
    bootstrap,
    head: pageHead,
  } = props;

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <TitleSlot defaultTitle={pageTitle} />

        {description && <meta name="description" content={description} />}

        {favicon && <link rel="icon" href={favicon} />}

        {htmx && <script src="https://unpkg.com/htmx.org@1.9.6" />}
        {normalizeCss && (
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            rel="stylesheet"
          />
        )}
        {bootstrap && (
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
        )}
        {alpine && (
          <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.15.2/dist/cdn.min.js" />
        )}

        {pageHead}
        <HeadSlot />
      </head>
      <body>
        {children}
        <BodyEndSlot />
      </body>
    </html>
  );
});
