import type { JsonDataType } from "../json/JsonTypes.js";
import { AbstractJsonObject, getJsonFieldInput } from "./AbstractJsonObject.js";

const JSON_FUNCTION_KEY = Symbol("JsonFunction.key");
type TaggedJsonFunction = ((input: JsonDataType) => unknown) & {
  [JSON_FUNCTION_KEY]?: string;
};

/**
 * A converter for a matching @JsonField. Must RETURN the field's value.
 * Uses standard TypeScript 5+ decorators (not legacy experimentalDecorators).
 * A method without a matching decorated field is not run automatically.
 */
export function JsonFunction(key: string) {
  return function <This, Value extends JsonDataType, Result>(
    method: (this: This, value: Value) => Result,
    context: ClassMethodDecoratorContext<This, (this: This, value: Value) => Result>,
  ): void {
    if (context.static || context.private) {
      throw new TypeError("@JsonFunction requires a non-private instance method");
    }
    Object.defineProperty(method, JSON_FUNCTION_KEY, { value: key });
  };
}

/**
 * Scan child-to-parent. An undecorated override of a decorated parent method
 * is invoked by dynamic dispatch. A newly decorated child mapping wins.
 */
function findJsonFunction(instance: object, key: string): TaggedJsonFunction | undefined {
  for (let proto = Object.getPrototypeOf(instance); proto !== null; proto = Object.getPrototypeOf(proto)) {
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (name === "constructor") continue;
      const candidate: unknown = Object.getOwnPropertyDescriptor(proto, name)?.value;
      if (typeof candidate !== "function") continue;
      if ((candidate as TaggedJsonFunction)[JSON_FUNCTION_KEY] !== key) continue;
      const effective: unknown = Reflect.get(instance, name);
      if (typeof effective !== "function") {
        throw new TypeError(`@JsonFunction method ${name} is not callable`);
      }
      return effective as TaggedJsonFunction;
    }
  }
  return undefined;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const proto: unknown = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/** Shallow guard for direct fields; not a recursive runtime schema validator. */
function matchesDefault(initial: unknown, input: JsonDataType): boolean {
  if (initial === undefined) return true; // Cannot infer the runtime type.
  if (initial === null) return input === null;
  if (typeof initial === "number") return typeof input === "number" && Number.isFinite(input);
  if (typeof initial === "string" || typeof initial === "boolean") return typeof initial === typeof input;
  if (Array.isArray(initial)) return Array.isArray(input);
  if (typeof initial === "object") return isPlainRecord(initial) && isPlainRecord(input);
  return false;
}

/**
 * Mark one instance field for JSON import. Defaults are retained if JSON is
 * missing or incompatible. A matching JsonFunction overrides direct mapping.
 * Inherited fields need no extra decorator in subclasses unless redeclared.
 */
export function JsonField(key?: string) {
  return function <This extends AbstractJsonObject, Value>(
    _field: undefined,
    context: ClassFieldDecoratorContext<This, Value>,
  ): (this: This, initialValue: Value) => Value {
    if (context.static || context.private || typeof context.name !== "string") {
      throw new TypeError("@JsonField requires a non-private instance field");
    }
    const jsonKey = key ?? context.name;
    return function (this: This, initialValue: Value): Value {
      const input = getJsonFieldInput(this, jsonKey);
      if (!input.present) return initialValue;

      const converter = findJsonFunction(this, jsonKey);
      if (converter) return converter.call(this, input.value) as Value;
      if (!matchesDefault(initialValue, input.value)) return initialValue;
      return input.value as Value;
    };
  };
}
