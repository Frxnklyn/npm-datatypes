import type { JsonDataType } from "../json/JsonTypes.js";

/** An existing instance that can import JSON configuration and return itself. */
export interface ImportInterface {
  importJson(json: JsonDataType): this;
}
