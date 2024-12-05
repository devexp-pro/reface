export * from "./elements.ts";
export * from "./attributes.ts";
export * from "./styles.ts";
export * from "./utils.ts";
export * from "./types.ts";

// Элементы для <head>
export const title = createElementFactory<TitleAttributes>("title");
export const meta = createElementFactory<MetaAttributes>("meta");
export const link = createElementFactory<LinkAttributes>("link");
export const style = createElementFactory<StyleAttributes>("style");
export const script = createElementFactory<ScriptAttributes>("script");
export const base = createElementFactory<BaseAttributes>("base");
export const noscript = createElementFactory<NoscriptAttributes>("noscript");
