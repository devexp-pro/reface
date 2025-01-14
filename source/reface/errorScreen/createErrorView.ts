import { RefaceComposer } from "../RefaceComposer.ts";
import { StyledPlugin } from "@reface/plugins/styled";

import { fallbackErrorScreen } from "./fallbackErrorScreen.ts";
import { parseErrorStack } from "./utils.ts";

import { ErrorScreen } from "./components/ErrorScreen.tsx";

export interface ErrorViewOptions {
  title?: string;
  error: Error;
}

export function createErrorView(
  { title = "Render Error", error }: ErrorViewOptions,
): string {
  try {
    const errorViewComposer = new RefaceComposer();
    errorViewComposer.use(new StyledPlugin());
    const stackFrames = parseErrorStack(error);

    return errorViewComposer.render(
      ErrorScreen({ title, error, stackFrames }),
    );
  } catch (e) {
    console.error("Error in error view:", e);
    return fallbackErrorScreen(error.stack || error.message);
  }
}
