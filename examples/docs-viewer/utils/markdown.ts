import { marked } from "https://esm.sh/marked@9.1.5";

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

export interface MarkdownHeading {
  level: number;
  text: string;
  slug: string;
}

export interface ParsedMarkdown {
  content: string;
  headings: MarkdownHeading[];
}

export function parseMarkdown(markdown: string): ParsedMarkdown {
  const headings: MarkdownHeading[] = [];

  // Custom renderer to collect headings
  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    const slug = text.toLowerCase().replace(/[^\w]+/g, "-");
    headings.push({ level, text, slug });
    return `<h${level} id="${slug}">${text}</h${level}>`;
  };

  // Add code highlighting
  renderer.code = (code, language) => {
    return `<pre><code class="language-${language}">${code}</code></pre>`;
  };

  // Parse markdown
  const content = marked(markdown, { renderer });

  return {
    content,
    headings,
  };
}
