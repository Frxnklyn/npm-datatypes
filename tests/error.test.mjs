import assert from "node:assert/strict";
import test from "node:test";
import { AbstractError } from "../dist/index.js";

class TestError extends AbstractError {
  constructor(message = "Test failed", cause) {
    super(message, cause);
  }
}

test("provides standard error information and a timestamp", () => {
  const error = new TestError();

  assert.equal(error instanceof Error, true);
  assert.equal(error instanceof AbstractError, true);
  assert.equal(error.name, "TestError");
  assert.equal(error.message, "Test failed");
  assert.equal(error.timestamp instanceof Date, true);
  assert.equal(typeof error.stack, "string");
  assert.match(error.stack, /^TestError: Test failed/);
});

test("keeps a previous native error and uses its stack", () => {
  const cause = new Error("Native failure");
  const error = new TestError("Wrapped failure", cause);

  assert.equal(error.cause, cause);
  assert.equal(error.stack, cause.stack);
  assert.equal(error.timestamp instanceof Date, true);
});

test("keeps the original timestamp through an AbstractError chain", () => {
  const cause = new TestError("Original failure");
  const error = new TestError("Wrapped failure", cause);

  assert.equal(error.cause, cause);
  assert.equal(error.timestamp, cause.timestamp);
  assert.equal(error.stack, cause.stack);
});
