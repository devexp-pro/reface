import { component } from "@recast";
import { Code } from "./Code.tsx";
import { Stack } from "../layout/Stack.tsx";

export const meta = {
  title: "Data/Code",
  description: "Code block with syntax highlighting and error display",
};

const sampleCode = `function example() {
  const message = "Hello World";
  console.log(message);
  return message;
}`;

const errorCode = `function example() {
  const message = "Hello World"
  console.log(message);
  return message;
}`;

export const Basic = component(() => <Code code={sampleCode} />);

export const WithLineNumbers = component(() => (
  <Code startLineNumber={10} code={sampleCode} />
));

export const WithError = component(() => (
  <Code
    error={{
      line: 2,
      char: 29,
      message: "Missing semicolon",
    }}
    code={errorCode}
  />
));

export const WithClip = component(() => (
  <Stack direction="vertical" gap="lg">
    <Code clip code={sampleCode} />
    <Code clip startLineNumber={100} code={sampleCode} />
    <Code
      clip
      error={{
        line: 2,
        char: 29,
        message: "Missing semicolon",
      }}
      code={errorCode}
    />
  </Stack>
));
