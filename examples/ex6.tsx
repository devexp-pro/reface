import { Hono } from "jsr:@hono/hono@4.5.6";
import { createElement } from "@reface/jsx";
import { styled } from "@reface/styled";
import { island } from "@reface/partials";
import { clean, Reface } from "@reface/core";

const JokeText = styled.div`
  font-size: 1.2rem;
  color: var(--color-text);
  padding: 1rem;
  border-radius: 0.5rem;
  background: var(--color-background);
  margin: 1rem 0;
`;

const RandomJoke = island(
  async () => {
    const text = await (await fetch(
      "https://icanhazdadjoke.com/",
      { headers: { "Accept": "text/plain" } },
    )).text();

    return <JokeText>{text}</JokeText>;
  },
  "random-joke",
);

function Home() {
  return (
    <div>
      <RandomJoke />
    </div>
  );
}

const app = new Hono().route(
  "/",
  new Reface({
    layout: clean({
      htmx: true,
      jsonEnc: true,
    }),
  }).page("/", Home).hono(),
);

Deno.serve(app.fetch);
