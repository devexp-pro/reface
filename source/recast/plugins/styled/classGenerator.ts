let counter = 0;

export function generateClassName(): string {
  return `s${(counter++).toString(36)}`;
}

export function resetClassNameGenerator(): void {
  counter = 0;
}
