let classCounter = 0;

export function generateClassName(): string {
  return `c${classCounter++}`;
}
