/**
 * Default categories for structured errors.
 *
 * Packages may use these values directly or pass their own category strings.
 */
export const ErrorCategory = {
  GENERAL: "general",
  VALIDATION: "validation",
  CONFIGURATION: "configuration",
  FILESYSTEM: "filesystem",
  NETWORK: "network",
  TRANSACTION: "transaction",
  INTERNAL: "internal",
} as const;

/**
 * Error category value.
 *
 * The default values are provided by `ErrorCategory`, but the type remains
 * open so other packages can introduce package-specific categories.
 */
export type ErrorCategory = (typeof ErrorCategory)[keyof typeof ErrorCategory] | (string & {});
