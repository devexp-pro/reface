import { styled } from "@reface/plugins/styled";
import { Code as BaseCode } from "../../../components/Code.tsx";

export interface CodeProps {
  content: string;
  language?: string;
  filename?: string;
}

export const InlineCode = styled.code`
  & {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    line-height: 1.5;
    color: #e2e8f0;
    padding: 0 0.5rem;
  }
`;

export function Code({ content, language, filename }: CodeProps) {
  return (
    <BaseCode
      content={content}
      language={language}
      filename={filename}
    />
  );
}
