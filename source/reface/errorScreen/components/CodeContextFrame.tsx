import { component } from "@recast";
import { styled } from "@reface/plugins/styled";
import { span } from "@reface/elements";
import { tokenize } from "../tokenize.ts";

const StyledCodeContext = styled.div /* css */`
  & {
    margin-top: 0.75rem;
    background: #1e293b;
    border-radius: 0.5rem;
    overflow: hidden;

    .code-block {
      margin: 0;
      padding: 1rem 0;
      font-size: 0.875rem;
      line-height: 1.5;
      font-family: ui-monospace, monospace;
      overflow-x: auto;
      position: relative;
    }

    .code-block::before,
    .code-block::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 4rem;
      pointer-events: none;
      z-index: 1;
    }

    .code-block::before {
      top: 0;
      background: linear-gradient(to bottom, #1e293b 0%, transparent 100%);
    }

    .code-block::after {
      bottom: 0;
      background: linear-gradient(to top, #1e293b 0%, transparent 100%);
    }

    .code-line {
      display: flex;
      padding: 0 1rem;
      white-space: pre;
    }

    .error-line {
      background: rgba(239, 68, 68, 0.1);
      position: relative;
    }

    .error-line::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #ef4444;
    }

    .line-number {
      color: #64748b;
      padding-right: 1rem;
      text-align: right;
      user-select: none;
      min-width: 3rem;
    }

    .line-content {
      color: #e2e8f0;
      padding-left: 1rem;
    }

    .error-message-inline {
      padding: 0.25rem 0 0.5rem 0;
      color: #ef4444;
      font-family: ui-monospace, monospace;
      font-size: 0.875rem;
      white-space: pre;
      position: relative;
    }

    .error-char {
      text-decoration: wavy underline #ef4444;
      text-underline-offset: 4px;
    }
  }
`;

export const CodeContextFrame = component((attr: {
  class: string;
  lines: string[];
  start: number;
  errorLine: number;
  errorCol: number;
  error: Error;
  frameIndex: number;
}) => (
  <StyledCodeContext class={attr.class}>
    <div class="code-block">
      {attr.lines.map((line, i) => {
        const lineNum = attr.start + i + 1;
        const isErrorLine = lineNum === attr.errorLine;

        if (isErrorLine) {
          return (
            <>
              <div class="code-line error-line">
                <span class="line-number">{lineNum}</span>
                <span class="line-content">
                  {tokenize(line).map((token) => {
                    if (
                      token.posStart < attr.errorCol &&
                      token.posEnd >= attr.errorCol
                    ) {
                      return span({ class: "error-char" })`${token.value}`;
                    }
                    return span({
                      style: { color: token.color },
                    })`${token.value}`;
                  })}
                </span>
              </div>
              {attr.frameIndex === 0 && (
                <div class="code-line error-message-inline error-line">
                  <span class="line-number"></span>
                  {" ".repeat(Math.floor(attr.errorCol + 3))}└─▶{" "}
                  {attr.error.message}
                </div>
              )}
            </>
          );
        }

        return (
          <div class="code-line">
            <span class="line-number">{lineNum}</span>
            <span class="line-content">
              {tokenize(line).map((token) =>
                span({ style: { color: token.color } })`${token.value}`
              )}
            </span>
          </div>
        );
      })}
    </div>
  </StyledCodeContext>
));
