import { doc, type DocNode } from "jsr:@deno/doc";
import { toFileUrl } from "jsr:@std/path@^1.0.8";

export interface ScriptDoc {
  navigation: {
    url: string;
    name: string;
  }[];
  scripts: {
    url: string;
    name: string;
    nodes: DocNode[];
  }[];
}

export async function loadScriptFiles(paths: string[]): Promise<ScriptDoc> {
  const scripts: ScriptDoc["scripts"] = [];
  const navigation: ScriptDoc["navigation"] = [];

  try {
    const nodesRecord = await doc(paths.map((path) => toFileUrl(path).href));
    console.log(Object.keys(nodesRecord), paths);

    for (const path of paths.map((path) => toFileUrl(path).href)) {
      const fileNodes = nodesRecord[path] || [];
      const name = path.split("/").pop() || path;

      navigation.push({
        url: path,
        name,
      });

      scripts.push({
        url: path,
        name,
        nodes: fileNodes,
      });
    }
  } catch (error) {
    console.error(`Error loading script files:`, error);

    for (const path of paths) {
      const name = path.split("/").pop() || path;

      navigation.push({
        url: path,
        name,
      });

      scripts.push({
        url: path,
        name,
        nodes: [],
      });
    }
  }

  return {
    navigation,
    scripts,
  };
}
