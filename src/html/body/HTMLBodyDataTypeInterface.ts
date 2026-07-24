import type { HTMLElementDataTypeInterface } from "../attributes/HTMLElementDataTypeInterface.js";

/**
 * Provides read access to an HTML document body.
 */
export interface HTMLBodyDataTypeInterface {
  getCode(): string;
  getContent(): string;
  getElements(): ReadonlyArray<HTMLElementDataTypeInterface>;
  getElement(index: number): HTMLElementDataTypeInterface | undefined;
  getElementCount(): number;
}
