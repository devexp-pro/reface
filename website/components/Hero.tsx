import { createElement, Fragment } from "@reface/jsx";
import type { Template } from "@reface/types";
import { styled } from "@reface/elements";

const example = `
import { Hono } from "jsr:@hono/hono@4.5.6";
import {
  Reface,
  clean,
  html,
  island,
  RESPONSE
} from "jsr:@vseplet/reface@0.1.0";

const RandomJoke = island<{ joke: null }>({
  template: ({ rpc }) => html\`
    &lt;div
      \${rpc.hx.joke()}
      hx-trigger="load, every 5s"
      hx-target="#output"
      hx-swap="innerHTML"&gt;
      &lt;h2 id="output"&gt;&lt;/h2&gt;
    &lt;/div&gt;
  \`,
  rpc: {
    joke: async () => RESPONSE(
      await (await fetch(
        "https://icanhazdadjoke.com/",
        { headers: { "Accept": "text/plain" } },
      )).text(),
    ),
  },
});

Deno.serve(
  new Hono()
    .route("/", new Reface({
      layout: clean({
        htmx: true,
        jsonEnc: true,
      }),
    })
    .page("/", RandomJoke)
    .hono()
).fetch);
`;

const QuestionText = styled.h5`
  &.question {
    color: #ff7f0e;
  }
  &.answer {
    color: #2ca02c;
    text-align: right;
  }
`;

const CodeBlock = styled.pre`
  & {
    background-color: #f8f9fa;
    overflow: auto;
    height: 500px;
    border-radius: 0.5rem;
  }
`;

export function Hero(): Template {
  return (
    <div class="container d-flex justify-content-center">
      <div>
        <QuestionText class="question">
          I want to integrate an interface into my project, but I don't want to use heavy frameworks, build anything, or change the project's structure...
        </QuestionText>
        <br />
        <QuestionText class="answer">Use Reface:</QuestionText>
        <br />
        <CodeBlock hx-disable>
          <code class="language-typescript">{example}</code>
        </CodeBlock>
        <br />
        <QuestionText class="question">Is that it? Seriously?</QuestionText>
        <br />
        <QuestionText class="answer">Seriously, bro :)</QuestionText>
      </div>
    </div>
  );
} 