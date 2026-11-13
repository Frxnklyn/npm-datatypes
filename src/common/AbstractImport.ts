import type { JsonDataType } from "../json/JsonTypes.js";
import type { ImportInterface } from "./ImportInterface.js";

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

/**
 * Imports matching fields into an already constructed object, including
 * initialized fields inherited from parent classes. Unknown keys and
 * incompatible values are ignored; the source JSON is not retained.
 *
 * Override getImportableKeys() to whitelist fields if JSON is untrusted:
 * TypeScript private/readonly members are not runtime access controls.
 * Arrays and nested objects are checked only by their broad category.
 */
export abstract class AbstractImport implements ImportInterface {
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

  /** Uses initialized instance fields by default; override to allowlist. */
  protected getImportableKeys(): readonly string[] {
    return Object.keys(this);
  }
}
