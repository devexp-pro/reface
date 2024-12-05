let classCounter = 0;

export function generateUniqueClass(): string {
  return `c${classCounter++}`;
}
