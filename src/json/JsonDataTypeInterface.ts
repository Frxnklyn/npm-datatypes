import type { CommonDataTypeInterface } from "../common/index.js";
import type { JsonValue } from "./JsonTypes.js";
import type { KeyDataTypeInterface } from "./KeyDataTypeInterface.js";

export interface JsonDataTypeInterface extends CommonDataTypeInterface<JsonValue> {
  addKey(newKey: string): KeyDataTypeInterface;
  getKey(key: string): KeyDataTypeInterface | undefined;
  requireKey(key: string): KeyDataTypeInterface;
  createKey(newKey: string, content?: JsonValue): KeyDataTypeInterface;
  removeKey(key: string): this;

  push(data: JsonValue): this;
  changeToArray(): this;
  changeToJson(): this;

  getKeys(): string[];
  getAllKeys(): string[];
  keyExist(key: string): boolean;

  isJson(): boolean;
  isArray(): boolean;
}
