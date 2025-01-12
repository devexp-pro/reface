import { Recast } from "@recast/recast";
import { RecastStyledPlugin } from "@recast/styled";
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
    const recast = new Recast();
    recast.use(new RecastStyledPlugin());
    const stackFrames = parseErrorStack(error);

    return await recast.renderHtml(
      ErrorScreen({ title, error, stackFrames }),
    );
  } catch (e) {
    console.error("Error in error view:", e);
    return fallbackErrorScreen(error.stack || error.message);
  }
}
