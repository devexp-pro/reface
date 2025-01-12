import { component } from "@recast";
import { Link } from "./Link.tsx";

export default {
  title: "Data/Link",
  component: Link,
};

export const Basic = component(() => <Link href="#">Click me</Link>);

export const External = component(() => (
  <Link href="https://example.com" target="_blank">External link</Link>
));
