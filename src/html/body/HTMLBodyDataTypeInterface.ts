import type { HTMLElementDataTypeInterface } from "../attributes/HTMLElementDataTypeInterface.js";
import type { HTMLScriptDataTypeInterface } from "../script/HTMLScriptDataTypeInterface.js";
import type { HTMLScriptLinkDataTypeInterface } from "../script/HTMLScriptLinkDataTypeInterface.js";

export type HTMLBodyContentDataType =
  | HTMLElementDataTypeInterface
  | HTMLScriptLinkDataTypeInterface
  | HTMLScriptDataTypeInterface;

/**
 * Provides read access to an HTML document body.
 */
export interface HTMLBodyDataTypeInterface {
  getCode(): string;
  getContent(): string;
  getElements(): ReadonlyArray<HTMLBodyContentDataType>;
  getElement(index: number): HTMLBodyContentDataType | undefined;
  getElementCount(): number;
  getScriptLinks(): ReadonlyArray<HTMLScriptLinkDataTypeInterface>;
  getScripts(): ReadonlyArray<HTMLScriptDataTypeInterface>;
  getScript(index: number): HTMLScriptDataTypeInterface | undefined;
}
