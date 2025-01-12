import { html } from "@recast";
import { parseErrorStack } from "./utils.ts";
import { ErrorScreen } from "./components/ErrorScreen.tsx";
import { fallbackErrorScreen } from "./fallbackErrorScreen.ts";

export const errorScreen = () => {
  const error = new Error("error message");
  const stackFrames = parseErrorStack(error);

  return ErrorScreen({ title: "title", error, stackFrames });
};

export const fallback = () => {
  return html(fallbackErrorScreen("Error message"));
};

export const meta = {
  title: "ErrorScreen",
};
