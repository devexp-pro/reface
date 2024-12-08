import { createElement } from "@reface/jsx";
import { styled } from "@reface/elements";
import { render } from "@reface/core";
import { compareHTML } from "@reface/test-utils";
import { assertEquals } from "@std/assert";

// Tag based components
Deno.test("styled.div - should create basic styled div", () => {
  const StyledDiv = styled.div`
    & {
      color: red;
    }
  `;

  const component = <StyledDiv></StyledDiv>;
  compareHTML(
    render(component),
    `<div class="${component.rootClass}"></div>
<style>
  .${component.rootClass} {
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

  const component = <Button class="primary"></Button>;
  compareHTML(
    render(component),
    `<button class="${component.rootClass} primary"></button>
<style>
  .${component.rootClass} {
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

  const component = Title()`Hello`;
  compareHTML(
    render(component),
    `<h1 class="${component.rootClass}">Hello</h1>
    <style>
  .${component.rootClass} {
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

  const component = Title()`Hello`;
  compareHTML(
    render(component),
    `<h1 class="${component.rootClass}">Hello</h1>
    <style>
  .${component.rootClass} {
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
  const withProps = Title({ class: "test" })``;
  assertEquals(withProps.tag, "h1");
  assertEquals(withProps.attributes, `class="${withProps.rootClass} test"`);

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

  const component = PrimaryButton({})``;
  compareHTML(
    render(component),
    `<button class="${component.rootClass}"></button>
    <style>
  .${component.rootClass} {
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

    const component = SearchInput({ type: "search", placeholder: "Search..." })``;
    compareHTML(
      render(component),
      `<input class="${component.rootClass}" type="search" placeholder="Search..." />
    <style>
  .${component.rootClass} {
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

  const component = <Button></Button>;
  compareHTML(
    render(component),
    `<button class="${component.rootClass}"></button>
<style>
  .${component.rootClass} {
    color: blue;
  }
  .${component.rootClass}:hover {
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

  const component = <Card></Card>;
  compareHTML(
    render(component),
    `<div class="${component.rootClass}"></div>
<style>
  .${component.rootClass} {
    padding: 1rem;
  }
  .${component.rootClass} h1 {
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

  const component = <Container></Container>;
  compareHTML(
    render(component),
    `<div class="${component.rootClass}"></div>
<style>
  .${component.rootClass} {
    width: 100%;
  }
  @media (min-width: 768px) {
    .${component.rootClass} {
      width: 50%;
    }
  }
</style>`
  );
});


Deno.test("styled with custom element", () => {
  const CustomEl = styled["custom-element"]`
    & {
      color: blue;
    }
  `;

  const component = <CustomEl>Custom content</CustomEl>;
  compareHTML(
    render(component),
    `<custom-element class="${component.rootClass}">Custom content</custom-element>
<style>
  .${component.rootClass} {
    color: blue;
  }
</style>`
  );
});

// Тест для вызова без аргументов
Deno.test("styled component - should handle empty call for template literals", () => {
  const Title = styled.h1`
    & {
      font-size: 2em;
    }
  `;

  // Оба варианта должны работать одинаково
  const withEmptyCall = Title()`Hello`;
  const withEmptyProps = Title({})`Hello`;

  assertEquals(withEmptyCall, withEmptyProps);
});
