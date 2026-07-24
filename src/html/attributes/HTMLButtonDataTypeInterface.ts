import type { HTMLElementDataTypeInterface } from "./HTMLElementDataTypeInterface.js";
import type { HTMLPhrasingContentDataType } from "./HTMLContentDataTypeInterfaces.js";

export interface HTMLButtonDataTypeInterface
  extends HTMLElementDataTypeInterface {
  getTagName(): "button";
  getContents(): ReadonlyArray<HTMLPhrasingContentDataType>;
  getContentAt(index: number): HTMLPhrasingContentDataType | undefined;
}
