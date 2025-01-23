import { RecastPlugin } from "../plugin/RecastPlugin.ts";
import { elementExpression } from "../expressions/element/ElementExpression.ts";
import { componentExpression } from "../expressions/component/ComponentExpression.ts";
import type { MetaStyled } from "./types.ts";
import type { ElementNode } from "../expressions/element/types.ts";
import type { ComponentNode } from "../expressions/component/types.ts";
import {
  type Child,
  type Children,
  PROXY_PAYLOAD,
} from "../expressions/types.ts";
import type { RecastPluginInterface } from "../plugin/types.ts";

export class RecastStyledPlugin extends RecastPlugin
  implements RecastPluginInterface {
  private styles: Set<string> = new Set();
  readonly name = "styled";

  setup() {
    this.styles.clear();

    this.before<ElementNode<any>, typeof elementExpression>(
      elementExpression,
      ({ template }) => {
        this.processStyledMeta(template[PROXY_PAYLOAD]);
      },
    );

    this.before<ComponentNode<any>, typeof componentExpression>(
      componentExpression,
      ({ template }) => {
        this.processStyledMeta(template[PROXY_PAYLOAD]);
      },
    );
  }

  renderAfter(_: Child | Children, html: string): string {
    if (!this.styles.size) {
      return html;
    }

    const styleTag = `<style>${Array.from(this.styles).join("\n")}</style>`;

    if (html.includes("</head>")) {
      return html.replace("</head>", `${styleTag}</head>`);
    }

    if (html.includes("</body>")) {
      return html.replace("</body>", `${styleTag}</body>`);
    }

    return `${html}${styleTag}`;
  }

  private processStyledMeta(
    template:
      | ElementNode[typeof PROXY_PAYLOAD]
      | ComponentNode[typeof PROXY_PAYLOAD],
  ) {
    const meta = template.meta?.styled as MetaStyled | undefined;
    if (!meta?.styles?.length) {
      return template;
    }

    const styledClasses = meta.styles.map((style) => style.class);

    const existingClass: string[] = Array.isArray(template.attributes?.class)
      ? template.attributes.class
      : [];
    const newClass = existingClass
      ? [...styledClasses, ...existingClass]
      : styledClasses;

    meta.styles.forEach((style) => {
      this.styles.add(style.css);
    });

    template.attributes.class = newClass;
  }
}
