let counter = 0;

/**
 * Генерирует уникальный класс для styled компонента
 * Формат: s{counter}
 */
export function generateClassName(): string {
  return `s${(counter++).toString(36)}`;
}

/**
 * Сбрасывает счетчик (используется для тестов)
 */
export function resetClassNameGenerator(): void {
  counter = 0;
}
