import { TestUtils } from "../test-utils/mod.ts";
import { Template } from "./template.ts";
import { assertEquals } from "@std/assert";
import { SlotsPlugin } from "@recast/slots";
import { componentExpression } from "@recast";
const test = new TestUtils({ plugins: [new SlotsPlugin()] });

Deno.test("Template Slot - render empty when has children", () => {
  test.assertRender(
    <Template slot="test">
      <div>Content</div>
    </Template>,
    "",
  );
});
