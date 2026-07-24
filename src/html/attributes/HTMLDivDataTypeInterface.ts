import type { HTMLElementDataTypeInterface } from "./HTMLElementDataTypeInterface.js";

export interface HTMLDivDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "div";
  getElements(): ReadonlyArray<HTMLElementDataTypeInterface>;
  getElement(index: number): HTMLElementDataTypeInterface | undefined;
}
