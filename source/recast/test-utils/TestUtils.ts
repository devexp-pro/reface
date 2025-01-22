import { assertEquals } from "@std/assert";

import { Recast } from "@recast/recast/mod.ts";
import type {
  RecastPlugin,
  RecastPluginInterface,
} from "@recast/plugin/mod.ts";
import type { Child, Children } from "@recast/expressions/mod.ts";
import type { RenderOptions } from "@recast/recast/mod.ts";

import type { TestUtilsOptions } from "./types.ts";
import { normalizeHtml } from "./normalizeHtml.ts";

export class TestUtils {
  public recast: Recast;
  public plugins: RecastPluginInterface[] = [];

  constructor(options: TestUtilsOptions = {}) {
    this.recast = new Recast();
    this.plugins = options.plugins ?? [];
    this.plugins.forEach((plugin) => this.recast.use(plugin));
  }

  private assertHtml(actual: string, expected: string, message?: string): void {
    assertEquals(normalizeHtml(actual), normalizeHtml(expected), message);
  }

  async assertRender(
    template: Children | Child,
    expected: string,
    userContext?: RenderOptions,
  ): Promise<void> {
    this.plugins.forEach((plugin) => plugin.setup(this.recast));

    const actual = await this.recast.render(template, userContext);
    this.assertHtml(actual.html, expected);
  }
}
