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
      const match = frame.match(/at (.+?) \((.+?):(\d+):(\d+)\)/) ||
        frame.match(/at (.+?):(\d+):(\d+)/) ||
        frame.match(/at (https?:\/\/.+?):(\d+):(\d+)/);

      if (!match) return null;

      let fnName: string;
      let filePath: string;
      let line: string;
      let col: string;

      if (match.length === 4) {
        filePath = match[1];
        line = match[2];
        col = match[3];

        fnName = filePath.split("/").pop()?.split(".")[0] || "anonymous";
      } else {
        fnName = match[1];
        filePath = match[2];
        line = match[3];
        col = match[4];
      }

      fnName = fnName.replace(/^async\s+/, "");
      if (fnName.includes("/")) {
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
