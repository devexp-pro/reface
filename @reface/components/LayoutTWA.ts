import { component, html } from "@reface";
import type { ElementChildType } from "@reface/types";
import { body, head, meta, script, title } from "@reface/elements";

export type LayoutTWAProps = {
  title?: string;
  script?: string;
  themeParams?: boolean;
  head?: ElementChildType;
};

export const LayoutTWA = component<LayoutTWAProps>((props, children) => {
  const {
    title: pageTitle,
    script: pageScript,
    themeParams,
    head: pageHead,
  } = props;

  return html`
    <!DOCTYPE html>
    <html>
      ${head()`
        ${meta({ charset: "UTF-8" })``}
        ${meta({
    name: "viewport",
    content:
      "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
  })``}
        ${pageTitle && title()`${pageTitle}`}
        ${script({ src: "https://telegram.org/js/telegram-web-app.js" })``}
        ${
    themeParams && script()`
          const params = new URLSearchParams(window.location.search);
          if (params.has("tgWebAppThemeParams")) {
            document.documentElement.style.setProperty(
              "--tg-theme-bg-color",
              window.Telegram.WebApp.backgroundColor
            );
          }
        `
  }
        ${pageScript && script()`${pageScript}`}
        ${pageHead}
      `}
      ${body()`${children}`}
    </html>
  `;
});
