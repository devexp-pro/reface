import { registerGlobal } from "../utils/registerGlobal.ts";
import { createElement } from "./createElement.ts";
import { Fragment } from "./Fragment.ts";
import "./jsx.global.d.ts";
import "./jsx.fn.global.d.ts";
registerGlobal(undefined, { createElement, Fragment });
