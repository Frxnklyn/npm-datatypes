/**
 * Represents JavaScript embedded directly in an HTML document.
 */
export interface HTMLScriptDataTypeInterface {
  getContent(): string;
  getCode(): string;
}
