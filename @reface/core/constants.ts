// HTML void elements
export const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

// HTML boolean attributes
export const BOOLEAN_ATTRIBUTES = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
]);

// CSS properties that don't need units
export const UNITLESS_PROPERTIES = new Set([
  "animationIterationCount",
  "aspectRatio",
  "borderImageOutset",
  "borderImageSlice",
  "borderImageWidth",
  "boxFlex",
  "boxFlexGroup",
  "boxOrdinalGroup",
  "columnCount",
  "flex",
  "flexGrow",
  "flexPositive",
  "flexShrink",
  "flexNegative",
  "flexOrder",
  "gridArea",
  "gridRow",
  "gridRowEnd",
  "gridRowSpan",
  "gridRowStart",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnSpan",
  "gridColumnStart",
  "fontWeight",
  "lineClamp",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "scale",
  "tabSize",
  "widows",
  "zIndex",
  "zoom",
]);

export const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
};

export const EMPTY_VALUES: any[] = [null, undefined, false, true, ""];

export const REFACE_EVENT = {
  RENDER: {
    RENDER: {
      ALL: "render.render",
      START: "render.render.start",
      END: "render.render.end",
    },
    TEMPLATE: {
      ALL: "render.template",
      START: "render.template.start",
      END: "render.template.end",
    },
    CHILD: {
      ALL: "render.child",
      START: "render.child.start",
      END: "render.child.end",
    },
    CHILDREN: {
      ALL: "render.children",
      START: "render.children.start",
      END: "render.children.end",
    },
    ATTRIBUTES: {
      ALL: "render.attributes",
      START: "render.attributes.start",
      END: "render.attributes.end",
    },
    CLASS: {
      ALL: "render.class",
      START: "render.class.start",
      END: "render.class.end",
    },
    STYLE: {
      ALL: "render.style",
      START: "render.style.start",
      END: "render.style.end",
    },
  },
} as const;
