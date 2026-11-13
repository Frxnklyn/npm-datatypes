import type { ImportInterface } from "./ImportInterface.js";
import type { ExportInterface } from "./ExportInterface.js";

/** Contract for types that can both import and export JSON. */
export interface JsonMappableInterface extends ImportInterface, ExportInterface {}
