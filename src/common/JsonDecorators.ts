import type { JsonDataType } from "../json/JsonTypes.js";
import { AbstractJsonObject, getJsonFieldInput, registerJsonField } from "./AbstractJsonObject.js";

/** One JSON import/export mapping for a decorated field. */
export interface JsonFieldOptions {
  /** JSON key. Defaults to the decorated field name. */
  key?: string;
  /** Instance method to convert (jsonValue, currentFieldValue) into a new value. */
  import?: string;
  /** Export method called with the current field value; overrides automatic export. */
  export?: string;
  /** Smaller values run first; omitted order means 0. */
  order?: number;
}

/** Internal normalized mapping, registered when a field is initialized. */
export interface JsonFieldMapping {
  readonly key: string;
  readonly import?: string;
  readonly export?: string;
  readonly order: number;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const proto: unknown = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** Compatibility guard for direct assignments; nested schemas need converters. */
function matchesDefault(current: unknown, incoming: JsonDataType): boolean {
  if (current === undefined) return true;
  if (current === null) return incoming === null;
  if (typeof current === "number") return typeof incoming === "number" && Number.isFinite(incoming);
  if (typeof current === "string" || typeof current === "boolean") return typeof current === typeof incoming;
  if (Array.isArray(current)) return Array.isArray(incoming);
  if (typeof current === "object") return isPlainObject(current) && isPlainObject(incoming);
  return false;
}

function mappingsFor(field: string, specification?: string | JsonFieldOptions | readonly JsonFieldOptions[]):
  readonly JsonFieldMapping[] {
  const specs: readonly JsonFieldOptions[] = typeof specification === "string"
    ? [{ key: specification }]
    : Array.isArray(specification) ? specification : [specification ?? {}];
  if (specs.length === 0) throw new TypeError(`@JsonField(${field}) requires at least one mapping`);
  return specs.map((entry, index) => {
    const key = entry.key ?? field;
    const order = entry.order ?? 0;
    if (typeof key !== "string" || key.length === 0 || !Number.isFinite(order) ||
        (entry.import !== undefined && (typeof entry.import !== "string" || entry.import.length === 0)) ||
        (entry.export !== undefined && (typeof entry.export !== "string" || entry.export.length === 0))) {
      throw new TypeError(`@JsonField(${field}) has an invalid mapping at index ${index}`);
    }
    return { key, order, import: entry.import, export: entry.export, index };
  }).sort((a, b) => a.order - b.order || a.index - b.index)
    .map(({ key, order, import: importMethod, export: exportMethod }) =>
      Object.freeze({ key, order, import: importMethod, export: exportMethod }));
}

/**
 * @JsonField() and @JsonField("json_key") preserve existing behavior.
 * @JsonField({ import: "createConnection" }) converts a single value.
 * @JsonField([{ key: "toolbox", import: "createToolBox", order: 10 },
 *             { key: "tools", import: "addToolsToToolBox", order: 20 }])
 * applies multiple keys to one field. The first sorted mapping controls export.
 * This runs *during field initialization*, not at the end of construction.
 */
export function JsonField(specification?: string | JsonFieldOptions | readonly JsonFieldOptions[]) {
  return function <This extends AbstractJsonObject, Value>(
    _field: undefined,
    context: ClassFieldDecoratorContext<This, Value>,
  ): (this: This, initialValue: Value) => Value {
    if (context.static || context.private || typeof context.name !== "string") {
      throw new TypeError("@JsonField requires a non-private instance field");
    }
    const field = context.name;
    const ordered = mappingsFor(field, specification);
    return function (this: This, initialValue: Value): Value {
      registerJsonField(this, field, ordered);
      let current: Value = initialValue;
      for (const entry of ordered) {
        const input = getJsonFieldInput(this, entry.key);
        if (!input.present) continue;
        if (entry.import !== undefined) {
          const method: unknown = Reflect.get(this, entry.import);
          if (typeof method !== "function") {
            throw new TypeError(`@JsonField(${field}): import method "${entry.import}" is not callable`);
          }
          current = Reflect.apply(method, this, [input.value, current]) as Value;
        } else if (matchesDefault(current, input.value)) {
          current = input.value as Value;
        }
      }
      return current;
    };
  };
}
