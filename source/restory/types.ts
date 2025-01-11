import type { Child, Element } from "@recast";

export type StoryMeta = {
  path?: `${string}/${string}`;
  title?: string;
  description?: string;
  component?: Element | Record<string, Element>;
};

export type StoryModule = {
  meta?: StoryMeta;
  [key: string]: Child | Child[] | Story["component"];
};

export type Story = {
  name: string;
  component: () => Child | Child[];
  source: string;
};

export type StoryFile = {
  filePath: string;
  stories: Story[];
  meta?: StoryMeta;
};
