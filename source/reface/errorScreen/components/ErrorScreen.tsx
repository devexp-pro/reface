import { stripAnsiCode } from "jsr:@std/fmt/colors";

import { component, styled } from "@reface/recast";
import { LayoutSimple } from "@reface/ui";

import { ErrorPageHeader } from "./ErrorPageHeader.tsx";
import { ErrorFrame } from "./ErrorFrame.tsx";

import type { StackFrame } from "../utils.ts";

const ErrorScreenStyled = styled.div /* css */`
        & {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif;
          max-width: 64rem;
          margin: 0rem auto;
          padding: 2rem;
          color: #1e293b;
        }

        .stack-trace {
          font-size: 0.9rem;
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.1);
          margin-top: 2rem;
        }
`;

export const ErrorScreen = component(({ title, error, stackFrames }: {
  title: string;
  error: Error;
  stackFrames: StackFrame[];
}) => {
  console.dir(error.name);
  const errorMessage = stripAnsiCode(error.message) || "Unknown error";
  // const errorMessage = error.message || "Unknown error";
  return (
    <LayoutSimple
      title={`${title}: ${errorMessage} - Reface`}
      normalizeCss
      htmx
    >
      <ErrorScreenStyled>
        <ErrorPageHeader title={title} error={errorMessage} />
        <div class="stack-trace">
          {stackFrames.map((frame, frameIndex) => (
            <ErrorFrame
              frame={frame}
              frameIndex={frameIndex}
              error={error}
            />
          ))}
        </div>
      </ErrorScreenStyled>
    </LayoutSimple>
  );
});