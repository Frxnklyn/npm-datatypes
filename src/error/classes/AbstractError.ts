/**
 * Minimal base class for package-specific errors.
 */
export abstract class AbstractError extends Error {
  public readonly timestamp: Date;
  public readonly cause?: Error;
  public override stack!: string;

  protected constructor(message?: string, cause?: Error) {
    super(message);

    this.name = new.target.name;
    this.timestamp = cause instanceof AbstractError ? cause.timestamp : new Date();
    this.cause = cause;
    this.stack = cause?.stack ?? this.stack ?? `${this.name}: ${this.message}`;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
