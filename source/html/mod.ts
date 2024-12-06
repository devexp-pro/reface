export const html = (str: TemplateStringsArray, ...args: any[]) => ({
  isTemplate: true,
  str,
  args,
});
