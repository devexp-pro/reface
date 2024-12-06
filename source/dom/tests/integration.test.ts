import { assertHtml } from "./utils.ts";

import { div, button } from "../../elements/mod.ts";
import { styled } from "../../styled/mod.ts";
import { render } from "../render.ts";

Deno.test("DOM integration", async (t) => {
  await t.step("renders basic elements with attributes", () => {
    const template = div({
      class: "container",
      id: "main",
    })`Hello, world!`;

    const html = render(template);
    assertHtml(html, '<div class="container" id="main">Hello, world!</div>');
  });

  await t.step("render base styled component", () => {
    const Button = styled(button)`
      & {
        color: blue;
        background: white;
      }
    `;
    const html = render(Button()`Click me!`);
    assertHtml(
      html,
      `
<button class="${Button().rootClass}">Click me!</button>
<style>
  .${Button().rootClass} {
    color: blue;
    background: white;
  }
</style>`
    );
  });

  await t.step("renders styled components with nested styles", () => {
    const Button = styled(button)`
      & {
        color: blue;
        background: white;
      }
    `;

    const Container = styled(div)`
      & {
        padding: 20px;
      }

      & ${Button} {
        margin: 10px;
      }
    `;

    const template = Container()`
      ${Button({ class: "primary" })`Click me!`}
    `;

    const html = render(template);
    const buttonClass = Button().rootClass;
    const containerClass = Container().rootClass;

    assertHtml(
      html,
      `
<div class="${containerClass}"><button class="${buttonClass} primary">Click me!</button></div>
<style>
  .${containerClass} {
    padding: 20px;
  }
  .${containerClass} .${buttonClass} {
    margin: 10px;
  }
  .${buttonClass} {
    color: blue;
    background: white;
  }
</style>`
    );
  });

  await t.step("combines multiple styled components css", () => {
    const Card = styled(div)`
      & {
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    `;

    const Title = styled(div)`
      & {
        font-size: 18px;
        font-weight: bold;
      }
    `;

    const template = Card()`
      ${Title()`Hello`}
      ${div()`Content`}
    `;

    const html = render(template);
    const cardClass = Card().rootClass;
    const titleClass = Title().rootClass;

    assertHtml(
      html,
      `
<div class="${cardClass}">
  <div class="${titleClass}">Hello</div>
  <div>Content</div>
</div>
<style>
  .${cardClass} {
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .${titleClass} {
    font-size: 18px;
    font-weight: bold;
  }
</style>`
    );
  });

  await t.step("handles dynamic values in css", () => {
    const size = "20px";
    const Button = styled(button)`
      & {
        padding: ${size};
        margin: ${10 + 5}px;
      }
    `;

    const html = render(Button()`Click me!`);
    assertHtml(
      html,
      `
<button class="${Button().rootClass}">Click me!</button>
<style>
  .${Button().rootClass} {
    padding: 20px;
    margin: 15px;
  }
</style>`
    );
  });

  await t.step("supports media queries", () => {
    const Card = styled(div)`
      & {
        width: 100%;
      }

      @media (min-width: 768px) {
        & {
          width: 50%;
        }
      }
    `;

    const html = render(Card());
    assertHtml(
      html,
      `
<div class="${Card().rootClass}"></div>
<style>
  .${Card().rootClass} {
    width: 100%;
  }
  @media (min-width: 768px) {
    .${Card().rootClass} {
      width: 50%;
    }
  }
</style>`
    );
  });

  await t.step("combines multiple class names", () => {
    const Button = styled(button)`
      & {
        color: blue;
      }
    `;

    const html = render(
      Button({
        class: "primary disabled",
        "data-testid": "test-button",
      })`Submit`
    );

    assertHtml(
      html,
      `
<button class="${
        Button().rootClass
      } primary disabled" data-testid="test-button">Submit</button>
<style>
  .${Button().rootClass} {
    color: blue;
  }
</style>`
    );
  });
});
