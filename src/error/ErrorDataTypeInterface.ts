/**
 * Standard error information provided by package-specific errors.
 */
export interface ErrorDataTypeInterface {
  getName(): string;
  getMessage(): string;
  getTimestamp(): Date;
  getStack(): string;
}
