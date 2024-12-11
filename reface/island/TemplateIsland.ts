import { Template } from "@reface/html";
import type {
  IslandTemplateArgs,
  IslandTemplateData,
  RestHandlersType,
  RpcCallsType,
  RpcHandlersType,
} from "./types.ts";

export class TemplateIsland {
  constructor(
    public readonly name: string,
    public readonly templateData: IslandTemplateData,
    public readonly rpc?: RpcHandlersType<any>,
    public readonly rest?: RestHandlersType,
  ) {}

  private createRpcCalls(): RpcCallsType<any> {
    const rpc: RpcCallsType<any> = { hx: {} };

    if (this.rpc) {
      Object.keys(this.rpc).forEach((key) => {
        rpc.hx[key] = (args?: any) =>
          `hx-ext='json-enc' hx-post='/rpc/${this.name}/${key}'` +
          (args ? ` hx-vals='${JSON.stringify(args)}'` : "");
      });
    }

    return rpc;
  }

  toHtml(): string {
    const rpc = this.createRpcCalls();
    const template = this.templateData.template({
      props: this.templateData.props,
      rpc,
      rest: this.templateData.rest,
    } as IslandTemplateArgs);

    const attributes = {
      ...template.attributes,
      "data-island": this.name,
      "data-island-id": crypto.randomUUID(),
    };

    return new Template(template.tag, attributes, template.children).toHtml();
  }
}
