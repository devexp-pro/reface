import { Recast, RecastStyledPlugin } from "@recast";

import { fallbackErrorScreen } from "./fallbackErrorScreen.ts";
import { parseErrorStack } from "./utils.ts";

import { ErrorScreen } from "./components/ErrorScreen.tsx";

export interface ErrorViewOptions {
  title?: string;
  error: Error;
}

export async function createErrorView(
  { title = "Render Error", error }: ErrorViewOptions,
): Promise<string> {
  try {
    const errorViewRecast = new Recast();
    errorViewRecast.use(new RecastStyledPlugin());
    const stackFrames = parseErrorStack(error);

    return await errorViewRecast.renderHtml(
      ErrorScreen({ title, error, stackFrames }),
    );
  } catch (e) {
    console.error("Error in error view:", e);
    return fallbackErrorScreen(error.stack || error.message);
  }
}
