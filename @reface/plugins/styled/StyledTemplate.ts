import type { ElementChildType, HTMLAttributes } from "@reface/types";
import { RefaceTemplate } from "../../RefaceTemplate.ts";

interface StyledPayload {
  styled: {
    styles: string;
    rootClass: string;
    tag: string;
  };
}

export class StyledTemplate
  extends RefaceTemplate<HTMLAttributes, StyledPayload> {
  static override readonly type = "styled";

  constructor(data?: {
    children?: ElementChildType[];
    attributes?: HTMLAttributes;
    payload?: StyledPayload;
    tag?: string;
  }) {
    super({
      ...data,
      attributes: {
        ...data?.attributes,
        class: [
          data?.payload?.styled?.rootClass,
          data?.attributes?.class,
        ].filter(Boolean),
      },
    });
  }

  // Переопределяем setAttributes для правильной работы с классами
  override setAttributes(attrs: HTMLAttributes = {}): HTMLAttributes {
    const currentClasses = (this.attributes.class || []) as string[];
    const newClasses = this.normalizeClassValue(attrs.class || []) as string[];

    return {
      ...this.attributes,
      ...attrs,
      class: this.normalizeClassValue([...currentClasses, ...newClasses]),
    };
  }
}
