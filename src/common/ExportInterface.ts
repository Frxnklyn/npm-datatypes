import type { JsonDataType } from "../json/JsonTypes.js";

/** An existing instance that can export its current JSON-compatible state. */
export interface ExportInterface {
  exportJson(): JsonDataType;
}
