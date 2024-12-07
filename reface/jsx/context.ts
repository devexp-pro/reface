export const JSXContext = {
  stack: [] as string[],
  currentFile: "",
  currentLine: 0,
  currentColumn: 0,
};

export function withJSXStack<T>(
  componentName: string,
  location: { file?: string; line?: number; column?: number },
  fn: () => T
): T {
  JSXContext.stack.push(
    `${componentName}${
      location.file
        ? ` (${location.file}:${location.line}:${location.column})`
        : ""
    }`
  );
  try {
    return fn();
  } finally {
    JSXContext.stack.pop();
  }
}
