import type { ErrorReportSectionInterface } from "./ErrorReportSectionInterface.js";
import type { ErrorCategory } from "../types/ErrorCategory.js";
import type { ErrorSeverity } from "../types/ErrorSeverity.js";

/**
 * Stable serializable representation of a structured error.
 */
export interface ErrorDataInterface {
  name: string;
  message: string;
  code: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  context: Record<string, unknown>;
  timestamp: string;
  cause?: unknown;
  stack?: string;
  reportSections?: ErrorReportSectionInterface[];
}
