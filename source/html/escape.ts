/**
 * Escapes HTML special characters in a string
 */
export function escapeHTML(str: string): string {
  const escapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "`": "&#96;",
  };

  return str.replace(/[&<>"'`]/g, (char) => escapeMap[char]);
}

/**
 * Escapes HTML attributes
 */
export function escapeAttribute(value: string): string {
  return value.replace(/["&<>]/g, (char) => {
    switch (char) {
      case '"':
        return "&quot;";
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      default:
        return char;
    }
  });
}
