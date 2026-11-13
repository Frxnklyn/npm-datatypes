import type { JsonDataType } from "../json/JsonTypes.js";
import type { ImportInterface } from "./ImportInterface.js";
import type { ExportInterface } from "./ExportInterface.js";

function isPlainObject(value: unknown): value is Record<string, JsonDataType> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/** A shallow type check; nested schemas require class-specific validation. */
function isCompatible(current: unknown, incoming: JsonDataType): boolean {
  if (current === null || incoming === null) return current === incoming;
  if (typeof current === "number") return typeof incoming === "number" && Number.isFinite(incoming);
  if (typeof current === "string" || typeof current === "boolean") {
    return typeof current === typeof incoming;
  }
  if (Array.isArray(current)) return Array.isArray(incoming);
  if (isPlainObject(current)) return isPlainObject(incoming);
  return false;
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

/**
 * Imports matching fields into an already constructed object, including
 * initialized fields inherited from parent classes. Unknown keys and
 * incompatible values are ignored; the source JSON is not retained.
 *
 * Override getImportableKeys() to whitelist fields if JSON is untrusted:
 * TypeScript private/readonly members are not runtime access controls.
 * Arrays and nested objects are checked only by their broad category.
 */
export abstract class AbstractImport implements ImportInterface, ExportInterface {
  public importJson(json: JsonDataType): this {
    if (!isPlainObject(json)) throw new TypeError("Import JSON must be an object");

    const allowed = new Set(this.getImportableKeys());
    const target = this as unknown as Record<string, unknown>;

    for (const [key, value] of Object.entries(json)) {
      if (!allowed.has(key)) continue;
      const property = Object.getOwnPropertyDescriptor(this, key);
      if (!property || !("value" in property) || !property.writable) continue;
      if (!isCompatible(property.value, value)) continue;
      target[key] = value;
    }
    return this;
  }

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

  /** Uses initialized instance fields by default; override to allowlist. */
  protected getImportableKeys(): readonly string[] {
    return Object.keys(this);
  }
}
