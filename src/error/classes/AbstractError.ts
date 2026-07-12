import type { ErrorContextInterface } from "../interfaces/ErrorContextInterface.js";
import type { ErrorDataInterface } from "../interfaces/ErrorDataInterface.js";
import type { ErrorOptionsInterface } from "../interfaces/ErrorOptionsInterface.js";
import type { ErrorReportSectionInterface } from "../interfaces/ErrorReportSectionInterface.js";
import type { ErrorDataTypeInterface } from "../ErrorDataTypeInterface.js";
import { ErrorRenderer } from "../renderer/ErrorRenderer.js";
import { ErrorCategory } from "../types/ErrorCategory.js";
import { ErrorSeverity } from "../types/ErrorSeverity.js";

/**
 * Base class for structured package errors.
 *
 * Concrete packages should extend this class with package-specific error names
 * and codes instead of defining shared domain errors in `@frxnklyn/datatypes`.
 */
export abstract class AbstractError extends Error implements ErrorDataTypeInterface {
  public readonly code: string;
  public readonly severity: ErrorSeverity;
  public readonly category: ErrorCategory;
  public readonly context: ErrorContextInterface;
  public readonly timestamp: Date;
  public readonly cause?: unknown;

  protected constructor(options: ErrorOptionsInterface) {
    super(options.message);

    this.name = new.target.name;
    this.code = options.code;
    this.severity = options.severity ?? ErrorSeverity.ERROR;
    this.category = options.category ?? ErrorCategory.GENERAL;
    this.context = options.context ?? {};
    this.timestamp = new Date();
    this.cause = options.cause;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Returns a stable serializable representation of the error.
   */
  public toJSON(): ErrorDataInterface {
    const cause = this.cause === undefined ? undefined : ErrorRenderer.safeValue(this.cause);
    const reportSections = this.getAdditionalReportSections().map((section) => ({
      title: section.title,
      values: ErrorRenderer.safeRecord(section.values),
    }));

    return {
      name: this.name,
      message: this.message,
      code: this.code,
      severity: this.severity,
      category: this.category,
      context: ErrorRenderer.safeRecord(this.context),
      timestamp: this.timestamp.toISOString(),
      ...(cause === undefined ? {} : { cause }),
      ...(this.stack ? { stack: this.stack } : {}),
      ...(reportSections.length === 0 ? {} : { reportSections }),
    };
  }

  /**
   * Renders the error as a Markdown report.
   */
  public toMarkdown(): string {
    return ErrorRenderer.toMarkdown(this.toJSON());
  }

  /**
   * Renders the error as an embeddable HTML report.
   */
  public toHTML(): string {
    return ErrorRenderer.toHTML(this.toJSON());
  }

  /**
   * Adds structured custom sections to generated reports.
   */
  protected getAdditionalReportSections(): ErrorReportSectionInterface[] {
    return [];
  }
}
