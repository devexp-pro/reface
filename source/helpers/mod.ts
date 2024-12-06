import type {
  Layout,
  LayoutOptions,
  RefaceResponse,
  Style,
  Template,
} from "$types";

export * from "./generateClassName.ts";

export const css = (str: TemplateStringsArray, ...args: any[]): Style => ({
  isStyle: true,
  str,
  args,
});

export const salt = (name?: string) =>
  name
    ? `${name}_${(Math.random() * 10000000000) | 0}`
    : "s" + ((Math.random() * 10000000000) | 0);

export const render = (template: Template | Array<Template | any>): string => {
  if (Array.isArray(template)) {
    return template.map(render).join("");
  }

  let content = template.str.reduce((acc, part, i) => {
    const arg = template.args[i];
    if (arg?.isTemplate) {
      return acc + part + render(arg);
    }
    if (Array.isArray(arg)) {
      return acc + part + arg.map(render).join("");
    }
    return acc + part + (arg || "");
  }, "");

  if (template.css) {
    content = `<style>${template.css}</style>${content}`;
  }

  if (template.tag) {
    return `<${template.tag}${template.attributes || ""}>${content}</${
      template.tag
    }>`;
  }

  return content;
};

export const GET = (path: string) => `get|${path}`;
export const POST = (path: string) => `post|${path}`;
export const PUT = (path: string) => `put|${path}`;
export const PATCH = (path: string) => `patch|${path}`;
export const DELETE = (path: string) => `delete|${path}`;
export const RESPONSE = (
  html?: string | Template | Array<Template | any>,
  status?: number
): RefaceResponse => {
  if (
    (html && typeof html === "object" && "isTemplate" in html) ||
    Array.isArray(html)
  ) {
    return {
      html: render(html),
      status,
    };
  }

  return {
    html: typeof html === "string" ? html : undefined,
    status,
  };
};

export const layout = <C>(cb: (layoutOptions: C & LayoutOptions) => Layout) =>
  cb;