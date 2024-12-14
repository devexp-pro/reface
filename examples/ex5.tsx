import { Hono } from "jsr:@hono/hono@4.5.6";
import { createElement } from "@reface/jsx";
import { styled } from "@reface/styled";
import { island } from "@reface/partials";
import { Reface, clean } from "@reface/core";

const JokeContainer = styled.div`
  padding: 10px;
`;

const RandomJoke = island(
  async () => {
    const text = await (await fetch(
      "https://icanhazdadjoke.com/",
      { headers: { "Accept": "text/plain" } },
    )).text();

    const isPrimary = Math.random() > 0.5;
    const styles = {
      color: isPrimary ? "red" : "blue",
      border: `1px solid ${isPrimary ? "orange" : "green"}`,
    };

    return (
      <JokeContainer style={styles}>
        {text}
      </JokeContainer>
    );
  },
  "random-joke"
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