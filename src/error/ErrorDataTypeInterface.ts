import type { ErrorContextInterface } from "./interfaces/ErrorContextInterface.js";
import type { ErrorDataInterface } from "./interfaces/ErrorDataInterface.js";
import type { ErrorCategory } from "./types/ErrorCategory.js";
import type { ErrorSeverity } from "./types/ErrorSeverity.js";

/**
 * Public data type contract for structured errors.
 */
export interface ErrorDataTypeInterface extends Error {
  readonly name: string;
  readonly message: string;
  readonly code: string;
  readonly severity: ErrorSeverity;
  readonly category: ErrorCategory;
  readonly context: ErrorContextInterface;
  readonly timestamp: Date;
  readonly cause?: unknown;
  readonly stack?: string;
  toJSON(): ErrorDataInterface;
  toMarkdown(): string;
  toHTML(): string;
}
