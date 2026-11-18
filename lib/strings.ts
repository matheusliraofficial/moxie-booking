import copy from "./strings.json";

export const strings = copy;
export type Strings = typeof copy;

/** Replace {token} placeholders with values. */
export const t = (template: string, vars: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
