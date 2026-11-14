import type { JsonDataType } from "../json/JsonTypes.js";

/** The required new (json) signature for constructor-based JSON models. */
export interface JsonConstructorInterface<T> {
  new (json: JsonDataType): T;
}
