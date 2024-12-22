import "@reface/jsx/global";
import { styled } from "@reface/plugins/styled";
import { StyledPlugin } from "@reface/plugins/styled";
import { TestUtils } from "./testUtils.ts";
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
    `<div class="${StyledDiv.raw.payload.styled.rootClass}"></div>
<style>
  .${StyledDiv.raw.payload.styled.rootClass} {
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
    `<button class="${Button.raw.payload.styled.rootClass} primary"></button>
<style>
  .${Button.raw.payload.styled.rootClass} {
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
    `<h1 class="${Title.raw.payload.styled.rootClass}">Hello</h1>
<style>
  .${Title.raw.payload.styled.rootClass} {
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
    `<button class="${PrimaryButton.raw.payload.styled.rootClass} ${BaseButton.raw.payload.styled.rootClass}"></button>
<style>
  .${BaseButton.raw.payload.styled.rootClass} {
    padding: 1rem;
  }
  .${PrimaryButton.raw.payload.styled.rootClass} {
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
    `<input class="${SearchInput.raw.payload.styled.rootClass} ${BaseInput.raw.payload.styled.rootClass}" type="search" placeholder="Search..."/>
<style>
  .${BaseInput.raw.payload.styled.rootClass} {
    border: 1px solid gray;
  }
  .${SearchInput.raw.payload.styled.rootClass} {
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
    `<button class="${Button.raw.payload.styled.rootClass}"></button>
<style>
  .${Button.raw.payload.styled.rootClass} {
    color: blue;
  }
  .${Button.raw.payload.styled.rootClass}:hover {
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
    `<div class="${Card.raw.payload.styled.rootClass}"></div>
<style>
  .${Card.raw.payload.styled.rootClass} {
    padding: 1rem;
  }
  .${Card.raw.payload.styled.rootClass} h1 {
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
    `<div class="${Container.raw.payload.styled.rootClass}"></div>
<style>
  .${Container.raw.payload.styled.rootClass} {
    width: 100%;
  }
  @media (min-width: 768px) {
    .${Container.raw.payload.styled.rootClass} {
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
    `<custom-element class="${CustomEl.raw.payload.styled.rootClass}">Custom content</custom-element>
<style>
  .${CustomEl.raw.payload.styled.rootClass} {
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
    `<h1 class="${withEmptyCall.payload?.styled.rootClass}">Hello</h1>
<style>
  .${withEmptyCall.payload?.styled.rootClass} {
    font-size: 2em;
  }
</style>`
  );

  const withEmptyProps = Title({})`Hello`;
  utils.assertRender(
    withEmptyProps, 
    `<h1 class="${withEmptyProps.payload?.styled.rootClass}">Hello</h1>
<style>
  .${withEmptyProps.payload?.styled.rootClass} {
    font-size: 2em;
  }
</style>`
  );
}); 