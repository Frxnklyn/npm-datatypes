import type { JsonDataType, JsonObject } from "../json/JsonTypes.js";

/** Constructor JSON is private and not exposed as an enumerable instance field. */
const jsonByInstance = new WeakMap<object, JsonObject>();

function isPlainJsonObject(value: unknown): value is JsonObject {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Opt-in constructor-based JSON model. The legacy AbstractImport and
 * AbstractJsonMappable remain independent and unchanged.
 *
 * A field decorator reads the JSON during its own class field initialization,
 * not during this base constructor's execution.
 */
export abstract class AbstractJsonObject {
  constructor(json: JsonDataType) {
    if (!isPlainJsonObject(json)) {
      throw new TypeError("Constructor JSON must be a plain object");
    }
    jsonByInstance.set(this, json);
  }
}

/** Internal helper shared with JsonField; intentionally not re-exported. */
export function getJsonFieldInput(instance: AbstractJsonObject, key: string):
  { present: true; value: JsonDataType } | { present: false } {
  const json = jsonByInstance.get(instance);
  if (json === undefined) return { present: false };
  const property = Object.getOwnPropertyDescriptor(json, key);
  if (!property || !("value" in property)) return { present: false };
  return { present: true, value: property.value };
}
