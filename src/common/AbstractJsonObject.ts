import type { JsonDataType, JsonObject } from "../json/JsonTypes.js";
import type { JsonFieldMapping } from "./JsonDecorators.js";

/** Keep constructor JSON and decorated field metadata outside enumerable instance properties. */
const jsonByInstance = new WeakMap<object, JsonObject>();
const mappingsByInstance = new WeakMap<object, Map<string, readonly JsonFieldMapping[]>>();
const exporting = new WeakSet<object>();

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const proto: unknown = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Convert a value into detached JSON. Track only the current recursion path:
 * shared, non-cyclic objects are allowed; circular references are not.
 */
function serialize(value: unknown, path: string, active: WeakSet<object>): JsonDataType {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "object") throw new TypeError(`Cannot export ${path}: not a JSON-compatible value`);
  if (active.has(value)) throw new TypeError(`Cannot export ${path}: circular reference`);
  active.add(value);
  try {
    const method: unknown = Reflect.get(value, "exportJson");
    if (typeof method === "function") {
      // This also handles exported instances nested inside arrays or plain objects.
      return serialize(Reflect.apply(method, value, []), `${path}.exportJson()`, active);
    }
    if (Array.isArray(value)) {
      return value.map((item, index) => serialize(item, `${path}[${index}]`, active));
    }
    if (!isPlainObject(value)) {
      throw new TypeError(`Cannot export ${path}: non-JSON object without exportJson()`);
    }
    const result: JsonObject = {};
    for (const key of Object.keys(value)) {
      const property = Object.getOwnPropertyDescriptor(value, key);
      if (!property || !("value" in property)) {
        throw new TypeError(`Cannot export ${path}.${key}: accessor properties are unsupported`);
      }
      if (property.value === undefined) continue;
      Object.defineProperty(result, key, {
        value: serialize(property.value, `${path}.${key}`, active),
        writable: true, enumerable: true, configurable: true,
      });
    }
    return result;
  } finally {
    active.delete(value);
  }
}

/** New opt-in, constructor-based JSON mapping; legacy import/export stays independent. */
export abstract class AbstractJsonObject {
  constructor(json: JsonDataType) {
    if (!isPlainObject(json)) throw new TypeError("Constructor JSON must be a plain object");
    jsonByInstance.set(this, json as JsonObject);
  }

  /** Export only decorated fields, using each field's lowest-order mapping. */
  public exportJson(): JsonObject {
    if (exporting.has(this)) {
      throw new TypeError(`Cannot export ${this.constructor.name}: circular reference`);
    }
    exporting.add(this);
    try {
      const result: JsonObject = {};
      const mappings = mappingsByInstance.get(this);
      if (!mappings) return result;
      for (const [field, ordered] of mappings) {
        const descriptor = Object.getOwnPropertyDescriptor(this, field);
        if (!descriptor || !("value" in descriptor)) continue;
        const fieldValue: unknown = descriptor.value;
        if (fieldValue === undefined) continue;
        const selected = ordered[0]; // Already ordered; independent of which key was imported.
        let output: unknown = fieldValue;
        if (selected.export !== undefined) {
          const method: unknown = Reflect.get(this, selected.export);
          if (typeof method !== "function") {
            throw new TypeError(`@JsonField(${field}): export method "${selected.export}" is not callable`);
          }
          output = Reflect.apply(method, this, [fieldValue]);
        }
        if (output === undefined) continue;
        if (Object.prototype.hasOwnProperty.call(result, selected.key)) {
          throw new TypeError(`Cannot export ${field}: duplicate JSON key "${selected.key}"`);
        }
        Object.defineProperty(result, selected.key, {
          value: serialize(output, field, new WeakSet<object>()),
          writable: true, enumerable: true, configurable: true,
        });
      }
      return result;
    } finally {
      exporting.delete(this);
    }
  }
}

/** Internal hooks for the field decorator. */
export function getJsonFieldInput(instance: AbstractJsonObject, key: string):
  { present: true; value: JsonDataType } | { present: false } {
  const json = jsonByInstance.get(instance);
  if (json === undefined) return { present: false };
  const property = Object.getOwnPropertyDescriptor(json, key);
  if (!property || !("value" in property)) return { present: false };
  return { present: true, value: property.value };
}

export function registerJsonField(instance: AbstractJsonObject, field: string,
  ordered: readonly JsonFieldMapping[]): void {
  let mappings = mappingsByInstance.get(instance);
  if (!mappings) {
    mappings = new Map();
    mappingsByInstance.set(instance, mappings);
  }
  // A redeclared, decorated subclass field replaces the base mapping for this name.
  mappings.set(field, ordered);
}
