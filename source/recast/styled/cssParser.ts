export function parseCSS(css: string, className: string): string {
  return css
    .trim()
    .replace(/&\s*{/g, `.${className} {`)
    .replace(/&\[(.*?)\]/g, `.${className}[$1]`)
    .replace(/&\.([\w-]+)/g, `.${className}.$1`)
    .replace(/&::([\w-]+)/g, `.${className}::$1`)
    .replace(/&:([\w-]+)/g, `.${className}:$1`)
    .replace(/&\s*([^{[.:])/g, `.${className} $1`);
}
