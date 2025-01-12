import { component } from "@recast";
import { Quote } from "./Quote.tsx";

export default {
  title: "Data/Quote",
  component: Quote,
};

export const Basic = component(() => <Quote>This is a simple quote</Quote>);

export const WithParagraphs = component(() => (
  <Quote>
    <p>First paragraph with some text.</p>
    <p>
      Second paragraph with more detailed explanation and additional context for
      the quote.
    </p>
  </Quote>
));

export const Nested = component(() => (
  <Quote>
    <p>Outer quote text</p>
    <Quote>
      <p>Nested quote with its own content</p>
    </Quote>
  </Quote>
));
