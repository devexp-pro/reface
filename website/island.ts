import { island as islandFn } from "@reface/plugins/island";
import type { IslandFn } from "@reface/plugins/island";
import type { HonoRequest } from "hono";

export const island: IslandFn<HonoRequest> = islandFn;
