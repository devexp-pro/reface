import { styled } from "@recast/styled";
import { RecastStyledPlugin } from "@recast/styled";
import { TestUtils } from "@recast/test-utils";

const utils = new TestUtils({ plugins: [new RecastStyledPlugin()] });
Deno.test("styled.div - should create basic styled div", () => {
  const StyledDiv = styled.div`
    & {
      color: red;
    }
  `;
  utils.assertRender(
    <StyledDiv></StyledDiv>,
    `<div class="${StyledDiv.getStyledClass()}"></div>
<style>
.${StyledDiv.getStyledClass()} {
    color: red;
  }
</style>`,
  );
});

Deno.test("styled.button - should handle props", () => {
  const Button = styled.button`
    & {
      background: blue;
    }
  `;

  utils.assertRender(
    <Button class="primary"></Button>,
    `<button class="${Button.getStyledClass()} primary"></button>
<style>
  .${Button.getStyledClass()} {
    background: blue;
  }
</style>`,
  );
});

Deno.test("styled.h1 - should handle children", () => {
  const Title = styled.h1`
    & {
      font-size: 2em;
    }
  `;

  utils.assertRender(
    Title`Hello`,
    `<h1 class="${Title.getStyledClass()}">Hello</h1>
<style>
  .${Title.getStyledClass()} {
    font-size: 2em;
  }
</style>`,
  );
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

  utils.assertRender(
    PrimaryButton,
    `<button class="${BaseButton.getStyledClass()} ${PrimaryButton.getStyledClass()}"></button>
<style>
  .${BaseButton.getStyledClass()} {
    padding: 1rem;
  }
  .${PrimaryButton.getStyledClass()} {
    background: blue;
    color: white;
  }
</style>`,
  );
});

Deno.test("styled(Component) - should handle props in extended component", () => {
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
    `<input  class="${BaseInput.getStyledClass()} ${SearchInput.getStyledClass()}" type="search" placeholder="Search..."/>
<style>
  .${BaseInput.getStyledClass()} {
    border: 1px solid gray;
  }
  .${SearchInput.getStyledClass()} {
    padding-left: 2rem;
  }
</style>`,
  );
});

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

  utils.assertRender(
    <Button></Button>,
    `<button class="${Button.getStyledClass()}"></button>
<style>
  .${Button.getStyledClass()} {
    color: blue;
  }
  .${Button.getStyledClass()}:hover {
    color: darkblue;
  }
</style>`,
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

  utils.assertRender(
    <Card></Card>,
    `<div class="${Card.getStyledClass()}"></div>
<style>
  .${Card.getStyledClass()} {
    padding: 1rem;
  }
  .${Card.getStyledClass()} h1 {
    font-size: 2em;
  }
</style>`,
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

  utils.assertRender(
    <Container></Container>,
    `<div class="${Container.getStyledClass()}"></div>
<style>
  .${Container.getStyledClass()} {
    width: 100%;
  }
  @media (min-width: 768px) {
    .${Container.getStyledClass()} {
      width: 50%;
    }
  }
</style>`,
  );
});

Deno.test("styled with custom element", () => {
  const CustomEl = styled["custom-element"]`
    & {
      color: blue;
    }
  `;

  utils.assertRender(
    <CustomEl>Custom content</CustomEl>,
    `<custom-element class="${CustomEl.getStyledClass()}">Custom content</custom-element>
<style>
  .${CustomEl.getStyledClass()} {
    color: blue;
  }
</style>`,
  );
});

Deno.test("styled component - should handle empty call for template literals", () => {
  const Title = styled.h1`
    & {
      font-size: 2em;
    }
  `;

  const withEmptyCall = Title`Hello`;
  utils.assertRender(
    withEmptyCall,
    `<h1 class="${withEmptyCall.getStyledClass()}">Hello</h1>
<style>
  .${withEmptyCall.getStyledClass()} {
    font-size: 2em;
  }
</style>`,
  );

  const withEmptyProps = Title({})`Hello`;
  utils.assertRender(
    withEmptyProps,
    `<h1 class="${withEmptyProps.getStyledClass()}">Hello</h1>
<style>
  .${withEmptyProps.getStyledClass()} {
    font-size: 2em;
  }
</style>`,
  );
});
