import copy from "./strings.json";

export const strings = copy;
export type Strings = typeof copy;

/** Replace {token} placeholders with values. */
export function t(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}
