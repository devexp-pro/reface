import { partial as partialFn } from "@reface/plugins/partials";
import type { PartialFn } from "@reface/plugins/partials";
import type { HonoRequest } from "hono";

export const partial: PartialFn<HonoRequest> = partialFn;
