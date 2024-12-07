import { styled } from "../styled.ts";
import { render } from "../../core/render.ts";
import { compareHTML } from "../../__tests__/utils.ts";
import { assertEquals } from "https://deno.land/std@0.131.0/testing/asserts.ts";

// Tag based components
Deno.test("styled.div - should create basic styled div", () => {
  const StyledDiv = styled.div`
    & {
      color: red;
    }
  `;

  const result = render(StyledDiv({}));
  compareHTML(
    result,
    `<div></div><style>
& {
  color: red;
}
</style>`
  );
});

Deno.test("styled.button - should handle props", () => {
  const Button = styled.button`
    & {
      background: blue;
    }
  `;

  const result = render(Button({ class: "primary" }));
  compareHTML(
    result,
    `<button class="primary"></button><style>
& {
  background: blue;
}
</style>`
  );
});

Deno.test("styled.h1 - should handle children", () => {
  const Title = styled.h1`
    & {
      font-size: 2em;
    }
  `;

  const result = render(Title({ children: ["Hello"] }));
  compareHTML(
    result,
    `<h1>Hello</h1><style>
& {
  font-size: 2em;
}
</style>`
  );
});

Deno.test("styled.h1 - should handle template literals", () => {
  const Title = styled.h1`
    & {
      font-size: 2em;
    }
  `;

  const result = render(Title()`Hello`);
  compareHTML(
    result,
    `<h1>Hello</h1><style>
& {
  font-size: 2em;
}
</style>`
  );
});

Deno.test("styled.h1 - should return correct factory", () => {
  const Title = styled.h1`
    & {
      font-size: 2em;
    }
  `;

  // Проверяем что Title это функция
  assertEquals(typeof Title, "function");

  // Проверяем что у Title есть нужные свойства
  assertEquals(Title.tag, "h1");
  assertEquals(Title.isTemplate, true);
  assertEquals(typeof Title.css, "string");

  // Проверяем что Title можно вызвать как функцию
  const withProps = Title({ class: "test" });
  assertEquals(withProps.tag, "h1");
  assertEquals(withProps.attributes, 'class="test"');

  // Проверяем что Title можно вызвать как template literal
  const withTemplate = Title()`Hello`;
  assertEquals(withTemplate.tag, "h1");
  assertEquals(withTemplate.children, ["Hello"]);
});

// Component extension
Deno.test("styled(Component) - should extend existing component", () => {
  const BaseButton = styled.button`
    & {
      padding: 1rem;
    }
  `;

  const PrimaryButton = styled(BaseButton)`
    & {
      background: blue;
      color: white;
    }
  `;

  const result = render(PrimaryButton({}));
  compareHTML(
    result,
    `<button></button><style>
& {
  padding: 1rem;
}
& {
  background: blue;
  color: white;
}
</style>`
  );
});

Deno.test(
  "styled(Component) - should handle props in extended component",
  () => {
    const BaseInput = styled.input`
      & {
        border: 1px solid gray;
      }
    `;

    const SearchInput = styled(BaseInput)`
      & {
        padding-left: 2rem;
      }
    `;

    const result = render(
      SearchInput({ type: "search", placeholder: "Search..." })
    );
    compareHTML(
      result,
      `<input type="search" placeholder="Search..."></input><style>
& {
  border: 1px solid gray;
}
& {
  padding-left: 2rem;
}
</style>`
    );
  }
);

// CSS features
Deno.test("styled CSS - should handle pseudo-classes", () => {
  const Button = styled.button`
    & {
      color: blue;
    }
    &:hover {
      color: darkblue;
    }
  `;

  const result = render(Button({}));
  compareHTML(
    result,
    `<button></button><style>
& {
  color: blue;
}
&:hover {
  color: darkblue;
}
</style>`
  );
});

Deno.test("styled CSS - should handle nested selectors", () => {
  const Card = styled.div`
    & {
      padding: 1rem;
    }
    & h1 {
      font-size: 2em;
    }
  `;

  const result = render(Card({}));
  compareHTML(
    result,
    `<div></div><style>
& {
  padding: 1rem;
}
& h1 {
  font-size: 2em;
}
</style>`
  );
});

Deno.test("styled CSS - should handle media queries", () => {
  const Container = styled.div`
    & {
      width: 100%;
    }
    @media (min-width: 768px) {
      & {
        width: 50%;
      }
    }
  `;

  const result = render(Container({}));
  compareHTML(
    result,
    `<div></div><style>
& {
  width: 100%;
}
@media (min-width: 768px) {
  & {
    width: 50%;
  }
}
</style>`
  );
});

Deno.test("styled with custom element", () => {
  const CustomEl =
    styled.custom -
    element`
    & {
      color: blue;
    }
  `;

  const result = render(<CustomEl>Custom content</CustomEl>);
  const match = result.match(/class="(c[a-z0-9]+)"/);
  const className = match?.[1];

  compareHTML(
    result,
    `<custom-element class="${className}">Custom content</custom-element>
<style>
  .${className} {
    color: blue;
  }
</style>`
  );
});
