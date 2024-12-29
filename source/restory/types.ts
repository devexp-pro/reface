import type { Template } from "@recast";

export type StoryMeta = {
  path?: `${string}/${string}`;
  title?: string;
  description?: string;
  component?: Template | Record<string, Template>;
};

export type StoryModule = {
  meta?: StoryMeta;
  [key: string]: Template | (() => Template);
};

export type Story = {
  name: string;
  component: () => Template;
  source: string;
};

export type StoryFile = {
  filePath: string;
  stories: Story[];
  meta?: StoryMeta;
};
