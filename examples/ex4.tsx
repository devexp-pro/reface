import { Hono } from "jsr:@hono/hono@4.5.6";
import { createElement } from "@reface/jsx";
import { styled } from "@reface/styled";
import { island } from "@reface/partials";
import { clean } from "@reface/layouts";
import { Reface } from "@reface/reface";

const Terminal = styled.div`
  & {
    height: 500px;
    overflow-y: scroll;
    background: #1e1e1e;
    color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
`;

const CommandLine = styled.div`
  & {
    color: #50fa7b;
    margin-bottom: 0.5rem;
  }
  
  &::before {
    content: "$";
    margin-right: 0.5rem;
    color: #bd93f9;
  }
`;

const Pre = styled.pre`
  & {
    margin: 0;
    padding: 0.5rem 0 1rem 1rem;
    font-family: inherit;
    color: #f8f8f2;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const ErrorPre = styled.pre`
  & {
    color: #ff5555;
    margin: 0;
    padding: 0.5rem 0 1rem 1rem;
    font-family: inherit;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const Form = styled.form`
  & {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }
`;

const Input = styled.input`
  & {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
  }
`;

const Button = styled.button`
  & {
    padding: 0.5rem 1rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
`;

function OutputBlock({ out, err, code, command }: {
  out: string;
  err: string;
  code: number;
  command: string;
}) {
  return (
    <div>
      <CommandLine>{command}</CommandLine>
      {code ? <ErrorPre>{err}</ErrorPre> : <Pre>{out}</Pre>}
    </div>
  );
}

const CommandRunner = island(
  async (c: Context) => {
    const command = c.req.query("command");
    const process = new Deno.Command("sh", { args: ["-c", command] });
    const { code, stdout, stderr } = await process.output();

    return (
      <OutputBlock
        command={command}
        code={code}
        out={new TextDecoder().decode(stdout)}
        err={new TextDecoder().decode(stderr)}
      />
    );
  },
  "command-runner",
);

function WebTerminal() {
  return (
    <div>
      <h1>Simple Web Terminal</h1>
      <Terminal>
        <CommandRunner>
          <OutputBlock
            out={"Command output will appear here"}
            err={""}
            code={0}
            command={"ls ./examples"}
          />
        </CommandRunner>
      </Terminal>
      <Form
        {...CommandRunner.trigger("submit").swap("afterbegin")}
      >
        <label htmlFor="command">Command:</label>
        <Input
          type="text"
          id="command"
          name="command"
        />
        <Button type="submit">Run</Button>
      </Form>
    </div>
  );
}

const app = new Hono().route(
  "/",
  new Reface({
    layout: clean({
      htmx: true,
      bootstrap: true,
    }),
  }).page("/", WebTerminal).hono(),
);

Deno.serve(app.fetch);
