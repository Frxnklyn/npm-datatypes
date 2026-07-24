/**
 * Represents an external CSS resource referenced by a link element.
 */
export interface HTMLStyleLinkDataTypeInterface {
  getSource(): string;
  getMedia(): string | undefined;
  getCode(): string;
}
