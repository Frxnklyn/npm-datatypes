import type { JsonValue } from "./JsonTypes.js";
import type { JsonDataTypeInterface } from "./JsonDataTypeInterface.js";

export interface KeyDataTypeInterface extends JsonDataTypeInterface {
  getName(): string;
  getValue(): JsonValue;
  changeContent(newContent: JsonValue): this;
  delete(): this;
}
