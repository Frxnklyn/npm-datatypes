import type { CommonDataTypeInterface } from "../common/index.js";
import type { JsonDataTypeInterface } from "./JsonDataTypeInterface.js";
import type { JsonArray, JsonObject, JsonValue } from "./JsonTypes.js";

export interface JsonArrayInterface extends CommonDataTypeInterface<JsonArray> {
  add(data: JsonValue): this;
  push(data: JsonValue): this;
  addJson(content?: JsonObject): this;
  addArray(content?: JsonArray): this;
  changeToJson(): JsonDataTypeInterface;

  get(index: number): JsonValue | undefined;
  set(index: number, value: JsonValue): this;
  remove(index: number): this;
  getLength(): number;

  isArray(): true;
}
