import { TestUtils } from "../test-utils/mod.ts";
import { Template } from "./template.ts";
import { assertEquals } from "@std/assert";
import { TEMPLATE_TEMPLATE_NAME } from "./constants.ts";
const test = new TestUtils();

Deno.test("Template Slot - render empty when has children", () => {
  test.assertRender(
    <Template>
      <div>Content</div>
    </Template>,
    "",
  );
});

Deno.test("Template Slot - store children in payload", () => {
  const children = <div>Content</div>;
  const template = (
    <Template>
      {children}
    </Template>
  );

  assertEquals(
    template.raw.payload.template.children[0],
    children,
    "Children should be stored in template payload",
  );
});

Deno.test("Template - tag", () => {
  const children = <div>Content</div>;
  const template = (
    <Template>
      {children}
    </Template>
  );

  assertEquals(template.raw.type, TEMPLATE_TEMPLATE_NAME);
});
