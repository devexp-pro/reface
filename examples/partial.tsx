import { reface } from "@reface/setup";
import { partial } from "@reface";

const JokePartial = partial(
  async () => {
    const joke = await (await fetch(
      "https://icanhazdadjoke.com/",
      { headers: { "Accept": "text/plain" } },
    )).text();

    return <p class="joke-text">{joke}</p>;
  },
  "demo-joke",
);

export function DemoPartial() {
  return (
    <div class="demo-container">
      <h2>HTMX-First Interactions</h2>
      <p class="description">
        Create interactive components with zero JavaScript. Partials handle the
        server-side logic while HTMX manages the client updates.
      </p>

      <div>
        <JokePartial>
          <p class="joke-text">Click the button to load a dad joke!</p>
        </JokePartial>
        <button {...JokePartial.trigger("click")}>
          Get New Joke
        </button>
      </div>
    </div>
  );
}

reface.router.get("/", (c) => {
  return c.html(reface.render(<DemoPartial />));
});

export default reface;
