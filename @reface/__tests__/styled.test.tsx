import { createElement } from "../core/jsx/mod.ts";
import { styled } from "../plugins/styled/mod.ts";
import { TestUtils } from "./testUtils.ts";
import { StyledPlugin } from "../plugins/styled/mod.ts";

// Tag based components
Deno.test("styled.div - should create basic styled div", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
  const StyledDiv = styled.div`
    & {
      color: red;
    }
  `;

  utils.assertRender(
    <StyledDiv></StyledDiv>,
    `<div class="${StyledDiv.payload.styled.rootClass}"></div>
<style>
  .${StyledDiv.payload.styled.rootClass} {
    color: red;
  }
</style>`
  );
});

Deno.test("styled.button - should handle props", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
  const Button = styled.button`
    & {
      background: blue;
    }
  `;

  utils.assertRender(
    <Button class="primary"></Button>,
    `<button class="${Button.payload.styled.rootClass} primary"></button>
<style>
  .${Button.payload.styled.rootClass} {
    background: blue;
  }
</style>`
  );
});

Deno.test("styled.h1 - should handle children", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
  const Title = styled.h1`
    & {
      font-size: 2em;
    }
  `;

  utils.assertRender(
    Title()`Hello`,
    `<h1 class="${Title.payload.styled.rootClass}">Hello</h1>
<style>
  .${Title.payload.styled.rootClass} {
    font-size: 2em;
  }
</style>`
  );
});

// Component extension
Deno.test("styled(Component) - should extend existing component", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
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

  utils.assertRender(
    PrimaryButton({})``,
    `<button class="${PrimaryButton.payload.styled.rootClass} ${BaseButton.payload.styled.rootClass}"></button>
<style>
  .${BaseButton.payload.styled.rootClass} {
    padding: 1rem;
  }
  .${PrimaryButton.payload.styled.rootClass} {
    background: blue;
    color: white;
  }
</style>`
  );
});

Deno.test("styled(Component) - should handle props in extended component", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
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

  utils.assertRender(
    SearchInput({ type: "search", placeholder: "Search..." })``,
    `<input type="search" placeholder="Search..." class="${SearchInput.payload.styled.rootClass} ${BaseInput.payload.styled.rootClass}"/>
<style>
  .${BaseInput.payload.styled.rootClass} {
    border: 1px solid gray;
  }
  .${SearchInput.payload.styled.rootClass} {
    padding-left: 2rem;
  }
</style>`
  );
});

// CSS features
Deno.test("styled CSS - should handle pseudo-classes", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
  const Button = styled.button`
    & {
      color: blue;
    }
    &:hover {
      color: darkblue;
    }
  `;

  utils.assertRender(
    <Button></Button>,
    `<button class="${Button.payload.styled.rootClass}"></button>
<style>
  .${Button.payload.styled.rootClass} {
    color: blue;
  }
  .${Button.payload.styled.rootClass}:hover {
    color: darkblue;
  }
</style>`
  );
});

Deno.test("styled CSS - should handle nested selectors", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
  const Card = styled.div`
    & {
      padding: 1rem;
    }
    & h1 {
      font-size: 2em;
    }
  `;

  utils.assertRender(
    <Card></Card>,
    `<div class="${Card.payload.styled.rootClass}"></div>
<style>
  .${Card.payload.styled.rootClass} {
    padding: 1rem;
  }
  .${Card.payload.styled.rootClass} h1 {
    font-size: 2em;
  }
</style>`
  );
});

Deno.test("styled CSS - should handle media queries", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
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

  utils.assertRender(
    <Container></Container>,
    `<div class="${Container.payload.styled.rootClass}"></div>
<style>
  .${Container.payload.styled.rootClass} {
    width: 100%;
  }
  @media (min-width: 768px) {
    .${Container.payload.styled.rootClass} {
      width: 50%;
    }
  }
</style>`
  );
});

Deno.test("styled with custom element", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
  const CustomEl = styled["custom-element"]`
    & {
      color: blue;
    }
  `;

  utils.assertRender(
    <CustomEl>Custom content</CustomEl>,
    `<custom-element class="${CustomEl.payload.styled.rootClass}">Custom content</custom-element>
<style>
  .${CustomEl.payload.styled.rootClass} {
    color: blue;
  }
</style>`
  );
});

Deno.test("styled component - should handle empty call for template literals", () => {
  const utils = new TestUtils({ plugins: [new StyledPlugin()] });
  const Title = styled.h1`
    & {
      font-size: 2em;
    }
  `;

  const withEmptyCall = Title()`Hello`;
  utils.assertRender(
    withEmptyCall, 
    `<h1 class="${withEmptyCall.payload.styled.rootClass}">Hello</h1>
<style>
  .${withEmptyCall.payload.styled.rootClass} {
    font-size: 2em;
  }
</style>`
  );

  const withEmptyProps = Title({})`Hello`;
  utils.assertRender(
    withEmptyProps, 
    `<h1 class="${withEmptyProps.payload.styled.rootClass}">Hello</h1>
<style>
  .${withEmptyProps.payload.styled.rootClass} {
    font-size: 2em;
  }
</style>`
  );
}); 