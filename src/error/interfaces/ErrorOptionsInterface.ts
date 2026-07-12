import type { ErrorContextInterface } from "./ErrorContextInterface.js";
import type { ErrorCategory } from "../types/ErrorCategory.js";
import type { ErrorSeverity } from "../types/ErrorSeverity.js";

/**
 * Constructor options for structured errors.
 */
export interface ErrorOptionsInterface {
  code: string;
  message: string;
  severity?: ErrorSeverity;
  category?: ErrorCategory;
  context?: ErrorContextInterface;
  cause?: unknown;
}
