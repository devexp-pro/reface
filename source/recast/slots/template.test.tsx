import { TestUtils } from "../test-utils/mod.ts";
import { Template } from "./template.ts";
import { assertEquals } from "@std/assert";
import { TEMPLATE_TEMPLATE_NAME } from "./constants.ts";
import { SlotsPlugin } from "@recast/slots";
import { PROXY_PAYLOAD } from "@recast/expressions";
const test = new TestUtils({ plugins: [new SlotsPlugin()] });

Deno.test("Template Slot - render empty when has children", () => {
  test.assertRender(
    <Template slot="test">
      <div>Content</div>
    </Template>,
    "",
  );
});

Deno.test("Template Slot - store children in payload", () => {
  const children = <div>Content</div>;
  const template = <Template slot="test">{children}</Template>;

  assertEquals(
    template[PROXY_PAYLOAD].children[0],
    children,
    "Children should be stored in template payload",
  );
});

Deno.test("Template - tag", () => {
  const children = <div>Content</div>;
  const template = (
    <Template slot="test">
      {children}
    </Template>
  );

  assertEquals(template[PROXY_PAYLOAD].tag, TEMPLATE_TEMPLATE_NAME);
});
