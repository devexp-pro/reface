import { component } from "@recast";
import { styled } from "@reface/plugins/styled";
import type { StackFrame } from "../utils.ts";
import { CodeContextFrame } from "./CodeContextFrame.tsx";
import { getFileContext } from "../utils.ts";

const ExternalBadge = styled.span /* css */`
  & {
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    background: rgba(100, 116, 139, 0.2);
    border-radius: 0.25rem;
    color: #94a3b8;
    margin-left: 0.5rem;
  }
`;

const FrameNumber = styled.span /* css */`
  & {
    color: #94a3b8;
    font-weight: 500;
    min-width: 1.5rem;
    flex-shrink: 0;
  }
`;

const FunctionName = styled.span /* css */`
  & {
    color: #ef4444;
    font-weight: 600;
    white-space: nowrap;
    flex-shrink: 0;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledFrame = styled.div /* css */`
  & {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .frame-header {
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: ui-monospace, monospace;
      font-size: 0.875rem;
    }

    .frame-header-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
      min-width: 0;
    }

    .file-location {
      color: #64748b;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
      flex: 1;
    }

    .file-link {
      color: inherit;
      text-decoration: none;
    }

    .file-link:hover {
      text-decoration: underline;
    }

    .frame-action {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
    }

    .toggle-button {
      background: none;
      border: none;
      padding: 0.25rem;
      color: #64748b;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }

    .toggle-button:hover {
      color: #94a3b8;
    }

    .chevron-icon {
      width: 1.25rem;
      height: 1.25rem;
      transition: transform 0.3s ease;
    }

    .code-context.collapsed .chevron-icon {
      transform: rotate(-90deg);
    }

    .code {
      transition: max-height 0.3s ease-in-out, margin-top 0.3s ease-in-out;
      max-height: 500px;
      overflow: hidden;
    }

    .code-context.collapsed .code {
      max-height: 0;
      margin-top: 0;
    }

    .external-frame {
      opacity: 0.7;
    }
  }
`;

export const ErrorFrame = component((attr: {
  frame: StackFrame;
  frameIndex: number;
  error: Error;
}) => {
  const { lines, start } = getFileContext(
    attr.frame.filePath,
    parseInt(attr.frame.line),
  );

  const hasContext = lines.length > 0 && !attr.frame.isExternal;

  return (
    <StyledFrame
      class={`${hasContext ? "has-context" : ""}`}
      hx-on="click: this.querySelector('.j-code-context')?.classList.toggle('collapsed')"
    >
      <div
        class={`code-context j-code-context ${
          attr.frameIndex === 0 ? "" : " collapsed"
        }`}
      >
        <div class="frame-header">
          <div class="frame-header-content">
            <FrameNumber>{attr.frameIndex + 1})</FrameNumber>
            <FunctionName>{attr.frame.fnName || "anonymous"}</FunctionName>
            <span class="file-location">
              {attr.frame.isExternal
                ? (
                  <a
                    href={attr.frame.formattedPath}
                    target="_blank"
                    class="file-link"
                  >
                    {attr.frame.formattedPath}:{attr.frame.line}:{attr.frame
                      .col}
                  </a>
                )
                : (
                  `${attr.frame.formattedPath}:${attr.frame.line}:${attr.frame.col}`
                )}
            </span>
          </div>
          <div class="frame-action">
            {hasContext
              ? (
                <button class="toggle-button j-toggle-button">
                  <svg
                    class="chevron-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              )
              : attr.frame.isExternal
              ? <ExternalBadge>external</ExternalBadge>
              : null}
          </div>
        </div>
        {hasContext && (
          <CodeContextFrame
            class="code"
            lines={lines}
            start={start}
            errorLine={parseInt(attr.frame.line)}
            errorCol={parseInt(attr.frame.col)}
            error={attr.error}
            frameIndex={attr.frameIndex}
          />
        )}
      </div>
    </StyledFrame>
  );
});
