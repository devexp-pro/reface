import type { ParsedMarkdown } from "./markdown/types.ts";

export interface DocPage {
  path: string;
  title: string;
  content: ParsedMarkdown;
}

export interface DocSection {
  title: string;
  items: Array<{
    path: string;
    title: string;
  }>;
}

export interface DocFile {
  slug: string;
  title: string;
  content: string;
}
