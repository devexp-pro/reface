import { Hono } from "jsr:@hono/hono@4.5.6";
import { createElement } from "@reface/jsx";
import { styled } from "@reface/styled";
import { island } from "@reface/island";
import { Reface, clean } from "@reface/core";

const JokeText = styled.h2`
  font-size: 1.5rem;
  color: var(--color-text);
  margin: 1rem 0;
`;

const RandomJoke = island(
  async () => {
    const joke = await (await fetch(
      "https://icanhazdadjoke.com/",
      { headers: { "Accept": "text/plain" } },
    )).text();

    return <JokeText>{joke}</JokeText>;
  },
  "random-joke"
);

const Form = styled.form`
  display: grid;
  gap: 1rem;
  padding: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: var(--color-primary-dark);
  }
`;

function Home() {
  return (
    <Form>
      <RandomJoke interval={10} />
      <RandomJoke interval={10} />
      <div>
        <Input
          type="text"
          name="name"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
      <div id="output"></div>
    </Form>
  );
}

const app = new Hono().route(
  "/",
  new Reface({
    layout: clean({
      htmx: true,
      bootstrap: true,
    }),
  }).page("/", Home).hono(),
);

Deno.serve(app.fetch); 