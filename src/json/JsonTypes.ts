export type JsonPrimitive = string | number | boolean | null;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export function isJsonObject(value: unknown): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function isJsonArray(value: unknown): value is JsonArray {
  return Array.isArray(value);
}
