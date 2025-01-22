export function normalizeHtml(html: string): string {
  return String(html)
    .replace(/></g, ">\n<")
    .replace(/^[\t ]+</gm, "<")
    .replace(/^([^<])/gm, "  $1")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, ">\n<")
    .replace(/>\s+([^<])/g, "> $1")
    .replace(/([^>])\s+</g, "$1 <")
    .replace(/<style>(.*?)<\/style>/gs, (_, css: string) => {
      return "<style>\n" +
        css
          .replace(/([{}])/g, "$1\n")
          .replace(/;/g, ";\n")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => "  " + line)
          .join("\n") +
        "\n</style>";
    })
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}
