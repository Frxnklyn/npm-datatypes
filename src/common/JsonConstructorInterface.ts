import type { JsonObject } from "../json/JsonTypes.js";

/**
 * Constructor contract for a JSON object plus optional positional arguments.
 * A type-only interface: callers should validate untrusted runtime input.
 */
export interface JsonConstructorInterface<
  T,
  Args extends unknown[] = [],
> {
  new (json: JsonObject, ...args: Args): T;
}
