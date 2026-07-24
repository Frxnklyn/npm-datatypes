/**
 * Represents CSS embedded directly in an HTML document.
 */
export interface HTMLStyleDataTypeInterface {
  getContent(): string;
  getMedia(): string | undefined;
  getCode(): string;
}
