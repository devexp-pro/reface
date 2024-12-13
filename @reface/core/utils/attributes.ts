import type {
  ClassValue,
  HTMLAttributes,
  StyleValue,
} from "../templates/types.ts";
import { escapeHTML } from "./escape.ts";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function processValue<T>(value: T): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

export function formatClassName(value: ClassValue): string {
  if (!value) return "";

  const classes = new Set<string>();

  function addClass(value: string) {
    value.split(/\s+/).forEach((c) => c && classes.add(c));
  }

  function processClassValue(val: unknown) {
    if (!val) return;

    if (typeof val === "string") {
      addClass(val);
    } else if (Array.isArray(val)) {
      val.forEach(processClassValue);
    } else if (isObject(val)) {
      for (const [key, condition] of Object.entries(val)) {
        if (condition && key) {
          addClass(key);
        }
      }
    }
  }

  processValue(value).forEach(processClassValue);
  return Array.from(classes).join(" ");
}

export function formatStyle(value: StyleValue): string {
  if (!value) return "";

  const styles = new Map<string, string>();

  function addStyle(
    prop: string,
    value: string | number | boolean | null | undefined,
  ) {
    if (!prop || value == null || value === false) return;
    styles.set(
      prop.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
      String(value),
    );
  }

  function processStyleValue(val: unknown) {
    if (!val) return;

    if (typeof val === "string") {
      val.split(";").forEach((style) => {
        const [prop, value] = style.split(":").map((s) => s.trim());
        if (prop && value) {
          addStyle(prop, value);
        }
      });
    } else if (Array.isArray(val)) {
      val.forEach(processStyleValue);
    } else if (isObject(val)) {
      for (const [prop, value] of Object.entries(val)) {
        addStyle(prop, value);
      }
    }
  }

  processValue(value).forEach(processStyleValue);
  return Array.from(styles.entries())
    .map(([prop, value]) => `${prop}: ${value}`)
    .join("; ");
}

export function formatAttributes(attrs: HTMLAttributes): string {
  if (!attrs || Object.keys(attrs).length === 0) return "";

  const formatted = Object.entries(attrs)
    .map(([key, value]) => {
      if (value === undefined || value === null) return "";
      if (value === true) return escapeHTML(key);
      if (value === false) return "";

      let formatted: unknown;
      if (key === "class") {
        formatted = formatClassName(value);
      } else if (key === "style") {
        formatted = formatStyle(value);
      } else {
        formatted = Array.isArray(value) ? value[0] : value;
      }

      if (!formatted) return "";

      return `${escapeHTML(key)}="${escapeHTML(String(formatted))}"`;
    })
    .filter(Boolean);

  return formatted.length ? ` ${formatted.join(" ")}` : "";
}
