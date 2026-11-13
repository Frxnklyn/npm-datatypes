import type { JsonDataType } from "../json/JsonTypes.js";
import { AbstractImport } from "./AbstractImport.js";
import type { JsonMappableInterface } from "./JsonMappableInterface.js";

function isPlainObject(value: unknown): value is Record<string, JsonDataType> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/** Return a detached copy of a genuine JSON value or skip unsupported data. */
function copyJson(value: unknown, active = new WeakSet<object>()): JsonDataType | undefined {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (!Array.isArray(value) && !isPlainObject(value)) return undefined;
  if (active.has(value)) return undefined;
  active.add(value);

  try {
    if (Array.isArray(value)) {
      const array: JsonDataType[] = [];
      for (const item of value) {
        const copied = copyJson(item, active);
        if (copied === undefined) return undefined;
        array.push(copied);
      }
      return array;
    }

    const result: Record<string, JsonDataType> = {};
    for (const key of Object.keys(value)) {
      const property = Object.getOwnPropertyDescriptor(value, key);
      if (!property || !("value" in property)) return undefined;
      const copied = copyJson(property.value, active);
      if (copied === undefined) return undefined;
      Object.defineProperty(result, key, { value: copied, enumerable: true, writable: true, configurable: true });
    }
    return result;
  } finally {
    active.delete(value);
  }
}

/** Adds JSON export to the import-only base class. */
export abstract class AbstractJsonMappable extends AbstractImport implements JsonMappableInterface {
  /** Export current valid JSON fields, not the incoming definition. */
  public exportJson(): JsonDataType {
    const json: Record<string, JsonDataType> = {};
    for (const key of this.getImportableKeys()) {
      const property = Object.getOwnPropertyDescriptor(this, key);
      if (!property || !("value" in property) || !property.writable) continue;
      const value = copyJson(property.value);
      if (value === undefined) continue;
      Object.defineProperty(json, key, { value, enumerable: true, writable: true, configurable: true });
    }
    return json;
  }

}
