import { component, element } from "@recast/mod.ts";
import { TestUtils } from "@recast/test-utils/mod.ts";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const fail = () => Promise.reject(new Error("Async error"));

Deno.test("async - function returning promise", async () => {
  const utils = new TestUtils();
  const asyncFn = async () => {
    await delay(10);
    return "Async content";
  };

  await utils.assertRender(
    asyncFn(),
    "Async content",
  );

  await utils.assertRender(
    fail(),
    "<!-- recast-error: Async error -->",
  );
});

Deno.test("async - component returning promise", async () => {
  const utils = new TestUtils();

  const AsyncComponent = component(async () => {
    await delay(10);
    return <div>Async component</div>;
  });

  const FailingComponent = component(async () => {
    throw new Error("Component error");
  });

  await utils.assertRender(
    <AsyncComponent />,
    "<div>Async component</div>",
  );

  await utils.assertRender(
    <FailingComponent />,
    "<!-- recast-error: Component error -->",
  );
});

Deno.test("async - mixed usage with promises", async () => {
  const utils = new TestUtils();
  const div = element("div");

  const AsyncContent = component(async () => {
    await delay(10);
    return "Async content";
  });

  const content = async () => {
    await delay(10);
    return "Dynamic content";
  };

  await utils.assertRender(
    <div>
      <AsyncContent />
      {div({})`${content()}`}
      {Promise.resolve("Direct promise")}
    </div>,
    "<div>" +
      "Async content" +
      "<div>Dynamic content</div>" +
      "Direct promise" +
      "</div>",
  );
});

Deno.test("async - handles multiple rejections", async () => {
  const utils = new TestUtils();

  const FailingComponent = component(async () => {
    throw new Error("Component failed");
  });

  const failingContent = async () => {
    throw new Error("Content failed");
  };

  await utils.assertRender(
    <div>
      <FailingComponent />
      {Promise.reject(new Error("Direct error"))}
      {failingContent()}
    </div>,
    "<div>" +
      "<!-- recast-error: Component failed -->" +
      "<!-- recast-error: Direct error -->" +
      "<!-- recast-error: Content failed -->" +
      "</div>",
  );
});

Deno.test("async - nested async components", async () => {
  const utils = new TestUtils();

  const InnerAsync = component(async () => {
    await delay(10);
    return <span>Inner content</span>;
  });

  const OuterAsync = component(async () => {
    await delay(10);
    return (
      <div>
        Outer content
        <InnerAsync />
      </div>
    );
  });

  await utils.assertRender(
    <OuterAsync />,
    "<div>Outer content<span>Inner content</span></div>",
  );
});
