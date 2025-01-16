import type { EmptyRecord } from "@common/utility.types.ts";
import type { ExpressionInterface, RenderContext } from "../Expression.ts";
import { ExpressionProxy } from "../ExpressionProxy.ts";
import { type ExpressionType, PROXY_COPY, PROXY_PAYLOAD } from "../types.ts";
import type {
  ComponentAttributes,
  ComponentNode,
  ComponentPayload,
} from "./types.ts";
import type { RenderOptions } from "@recast/recast";

class ComponentExpression<
  Attrs extends ComponentAttributes = ComponentAttributes,
  Methods extends Record<string, any> = EmptyRecord,
  T extends ComponentNode<Attrs, Methods> = ComponentNode<Attrs, Methods>,
> extends ExpressionProxy<ComponentPayload, Attrs, Methods>
  implements ExpressionInterface<T> {
  readonly type: ExpressionType = "component";

  is(value: unknown): value is T {
    return (value as T)?.[PROXY_PAYLOAD]?.type === this.type;
  }

  getComponentName(
    component: { name?: string; render?: (...args: any[]) => any },
  ): string {
    if (component.name) {
      return component.name;
    }

    if (component.render?.name) {
      return component.render.name;
    }

    return "AnonymousComponent";
  }
  generateComponentId(_name?: string): string {
    return `${Math.random().toString(36).substring(2, 15)}`;
  }

  render(
    { node, context, userContext = {} }: {
      node: T;
      context: RenderContext;
      userContext?: RenderOptions;
    },
  ) {
    const { render, attributes, children, id } = node[PROXY_PAYLOAD];

    const result = context.render(
      render(attributes, children, {
        ...userContext,
        component: {
          id,
        },
      }),
    );

    return result;
  }

  create(
    value:
      & Pick<ComponentPayload, "render">
      & Partial<Omit<ComponentPayload, "render">>,
  ): T {
    const node: ComponentPayload = {
      type: "component" as const,
      name: this.getComponentName(value),
      id: this.generateComponentId(value.name),
      render: value.render,
      meta: value.meta || {},
      methods: value.methods || {},
      children: [],
      attributes: {},
    } as ComponentPayload;

    // @ts-expect-error FIXME
    return this.proxyify(node);
  }

  copy(
    template: T,
    newPayload?:
      | Partial<ComponentPayload>
      | ((payload: ComponentPayload) => ComponentPayload),
  ): T {
    // TODO: create and use copy function

    if (typeof newPayload === "function") {
      return template[PROXY_COPY](newPayload) as T;
    }

    return template[PROXY_COPY]((payload: ComponentPayload) => {
      return {
        type: "component" as const,
        name: newPayload?.name || payload.name,
        attributes: { ...payload.attributes, ...newPayload?.attributes },
        children: [...payload.children],
        meta: { ...payload.meta, ...newPayload?.meta },
        methods: { ...payload.methods, ...newPayload?.methods },
      } as ComponentPayload;
    }) as T;
  }
}

export const componentExpression = new ComponentExpression();
