import { assertEquals } from "@std/assert";
import { parseCSS } from "../cssParser.ts";

Deno.test("cssParser - basic selectors", () => {
  const css = `
    & {
      color: red;
    }
  `;
  assertEquals(
    parseCSS(css, "test"),
    `.test {
      color: red;
    }`,
  );
});

Deno.test("cssParser - nested selectors", () => {
  const css = `
    & {
      color: red;
    }
    & span {
      color: blue;
    }
  `;
  assertEquals(
    parseCSS(css, "test"),
    `.test {
      color: red;
    }
    .test span {
      color: blue;
    }`,
  );
});

Deno.test("cssParser - media queries", () => {
  const css = `
    & {
      color: red;
    }
    @media (min-width: 768px) {
      & {
        color: blue;
      }
    }
  `;
  assertEquals(
    parseCSS(css, "test"),
    `.test {
      color: red;
    }
    @media (min-width: 768px) {
      .test {
        color: blue;
      }
    }`,
  );
});

Deno.test("cssParser - complex selectors", () => {
  const css = `
    &.active {
      color: blue;
    }
    &[disabled] {
      opacity: 0.5;
    }
    &:hover {
      color: red;
    }
    & > span {
      color: green;
    }
  `;
  assertEquals(
    parseCSS(css, "test"),
    `.test.active {
      color: blue;
    }
    .test[disabled] {
      opacity: 0.5;
    }
    .test:hover {
      color: red;
    }
    .test > span {
      color: green;
    }`,
  );
});
