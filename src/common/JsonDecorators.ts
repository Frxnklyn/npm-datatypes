import type { JsonDataType } from "../json/JsonTypes.js";
import { AbstractJsonObject, getJsonFieldInput } from "./AbstractJsonObject.js";

/** Configure a JSON-imported field without decorating its converter method. */
export interface JsonFieldOptions {
  /** Source JSON key. Defaults to the TypeScript field name. */
  key?: string;
  /** Instance method name: called with the raw JSON value, must return the field value. */
  import?: string;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const proto: unknown = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** A shallow runtime guard for direct imports; nested schemas need validation. */
function matchesDefault(initial: unknown, input: JsonDataType): boolean {
  if (initial === undefined) return true; // No runtime type information.
  if (initial === null) return input === null;
  if (typeof initial === "number") return typeof input === "number" && Number.isFinite(input);
  if (typeof initial === "string" || typeof initial === "boolean") return typeof initial === typeof input;
  if (Array.isArray(initial)) return Array.isArray(input);
  if (typeof initial === "object") return isPlainRecord(initial) && isPlainRecord(input);
  return false;
}

/**
 * Import a value during this class field's normal initialization.
 *
 * @JsonField()                      -> same-name JSON key, directly assigned
 * @JsonField("system_prompt")       -> a different JSON key
 * @JsonField({ import: "createConnection" })
 *                                   -> call an instance method for conversion
 * @JsonField({ key: "conn", import: "createConnection" })
 *                                   -> both custom key and converter
 *
 * The converter returns the initialized field value; no @JsonFunction or
 * class decorator is necessary. This runs before later fields initialize,
 * and before subclass field initializers have run.
 */
export function JsonField(keyOrOptions?: string | JsonFieldOptions) {
  return function <This extends AbstractJsonObject, Value>(
    _field: undefined,
    context: ClassFieldDecoratorContext<This, Value>,
  ): (this: This, initialValue: Value) => Value {
    if (context.static || context.private || typeof context.name !== "string") {
      throw new TypeError("@JsonField requires a non-private instance field");
    }
    const options = typeof keyOrOptions === "string" ? { key: keyOrOptions } : keyOrOptions ?? {};
    const jsonKey = options.key ?? context.name;
    const importMethod = options.import;

    return function (this: This, initialValue: Value): Value {
      const input = getJsonFieldInput(this, jsonKey);
      if (!input.present) return initialValue;

      if (importMethod !== undefined) {
        const method: unknown = Reflect.get(this, importMethod);
        if (typeof method !== "function") {
          throw new TypeError(
            `@JsonField(${jsonKey}): import method "${importMethod}" is not callable`,
          );
        }
        return Reflect.apply(method, this, [input.value]) as Value;
      }

      if (!matchesDefault(initialValue, input.value)) return initialValue;
      return input.value as Value;
    };
  };
}
