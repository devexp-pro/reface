import type { HTMLAttributes } from "./base.ts";
import type { EventAttributes } from "./events.ts";
import type { HtmxAttributes } from "./htmx.ts";
import type { AriaAttributes } from "./aria.ts";

export * from "./base.ts";
export * from "./events.ts";
export * from "./htmx.ts";
export * from "./aria.ts";
export * from "../elements/types.ts";

// Re-export base types
export type {
  ClassValue,
  StyleValue,
  StyleInput,
  ElementChild,
  ElementChildren,
  HTMLAttributes,
  Template,
  ElementFactory,
  StyledComponent,
} from "./base.ts";

// Re-export event types
export type { EventAttributes } from "./events.ts";

// Re-export HTMX types
export type { HtmxAttributes } from "./htmx.ts";

// Re-export ARIA types
export type { AriaAttributes } from "./aria.ts";

// Re-export element specific types
import type {
  ButtonAttributes,
  InputAttributes,
  AnchorAttributes,
  ImgAttributes,
  TableAttributes,
  FormAttributes,
  SelectAttributes,
  OptionAttributes,
  TextareaAttributes,
} from "../elements/types.ts";

export type {
  ButtonAttributes,
  InputAttributes,
  AnchorAttributes,
  ImgAttributes,
  TableAttributes,
  FormAttributes,
  SelectAttributes,
  OptionAttributes,
  TextareaAttributes,
};

// Combined attributes type
export type Attributes = HTMLAttributes &
  EventAttributes &
  HtmxAttributes &
  AriaAttributes;

// Re-export styled types
export type { StyledFactory, StyledAPI } from "../styled/types.ts";
