export interface HTMLIconDataTypeInterface {
  getSource(): string;
  getType(): string | undefined;
  getSizes(): string | undefined;
  getMedia(): string | undefined;
  getCode(): string;
}
