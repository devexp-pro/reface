import { marked } from "https://esm.sh/marked@11.1.0";
import DOMPurify from "https://esm.sh/dompurify@3.0.6";
import Prism from "https://esm.sh/prismjs@1.29.0";

export async function markdownToHtml(markdown: string): Promise<string> {
  const html = await marked(markdown, {
    gfm: true,
    breaks: true,
    highlight: (code: string, lang: string) => {
      if (Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang);
      }
      return code;
    },
  });

  return DOMPurify.sanitize(html);
}
