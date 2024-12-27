import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = Deno.cwd();

export function formatFilePath(filePath: string): {
  formattedPath: string;
  isExternal: boolean;
} {
  try {
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return { formattedPath: filePath, isExternal: true };
    }

    const normalizedPath = filePath.startsWith("file://")
      ? fileURLToPath(filePath)
      : filePath;

    // Проверяем, является ли путь относительным к корню проекта
    if (normalizedPath.startsWith(projectRoot)) {
      return {
        formattedPath: "./" + normalizedPath.slice(projectRoot.length + 1),
        isExternal: false,
      };
    }

    return { formattedPath: filePath, isExternal: false };
  } catch {
    return { formattedPath: filePath, isExternal: false };
  }
}

export function getFileContext(filePath: string, lineNumber: number): {
  lines: string[];
  start: number;
} {
  try {
    const normalizedPath = filePath.startsWith("file://")
      ? fileURLToPath(filePath)
      : filePath;
    const absolutePath = resolve(Deno.cwd(), normalizedPath);
    const content = readFileSync(absolutePath, "utf-8");
    const allLines = content.split("\n");

    const start = Math.max(0, lineNumber - 7);
    const end = Math.min(allLines.length, lineNumber + 7);

    return {
      lines: allLines.slice(start, end),
      start: start,
    };
  } catch (_e) {
    return { lines: [], start: 0 };
  }
}

export interface StackFrame {
  fnName: string;
  filePath: string;
  formattedPath: string;
  isExternal: boolean;
  line: string;
  col: string;
  originalFrame: string;
}

export function parseErrorStack(error: Error): StackFrame[] {
  const stackFrames = error.stack?.split("\n").slice(1) || [];

  return stackFrames
    .map((frame) => frame.trim())
    .filter((frame) => !frame.includes("node:internal/"))
    .map((frame): StackFrame | null => {
      const match = frame.match(/at (.+?) \((.+?):(\d+):(\d+)\)/) || // формат: at Function (file:line:col)
        frame.match(/at (.+?):(\d+):(\d+)/) || // формат: at file:line:col
        frame.match(/at (https?:\/\/.+?):(\d+):(\d+)/); // формат: at http(s)://url:line:col

      if (!match) return null;

      let fnName: string;
      let filePath: string;
      let line: string;
      let col: string;

      if (match.length === 4) {
        // Формат: at file:line:col или at http(s)://url:line:col
        filePath = match[1];
        line = match[2];
        col = match[3];
        // Извлекаем имя функции из пути файла, если возможно
        fnName = filePath.split("/").pop()?.split(".")[0] || "anonymous";
      } else {
        // Формат: at Function (file:line:col)
        fnName = match[1];
        filePath = match[2];
        line = match[3];
        col = match[4];
      }

      // Очищаем имя функции
      fnName = fnName.replace(/^async\s+/, ""); // Убираем async
      if (fnName.includes("/")) {
        // Если fnName содержит путь, берем последнюю часть
        fnName = fnName.split("/").pop() || "anonymous";
      }

      const { formattedPath, isExternal } = formatFilePath(filePath);

      return {
        fnName,
        filePath,
        formattedPath,
        isExternal,
        line,
        col,
        originalFrame: frame,
      };
    })
    .filter((frame): frame is StackFrame => frame !== null);
}
