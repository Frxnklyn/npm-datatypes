import assert from "node:assert/strict";
import test from "node:test";
import {
  AbstractError,
  ErrorCategory,
  ErrorSeverity,
} from "../dist/index.js";

class TestError extends AbstractError {
  constructor(options = {}) {
    super({
      code: "TEST_ERROR",
      message: "Test failed",
      ...options,
    });
  }
}

class SectionError extends TestError {
  getAdditionalReportSections() {
    return [
      {
        title: "Details",
        values: {
          id: 42,
          nested: { enabled: true },
        },
      },
    ];
  }
}

test("structured error defaults and instanceof checks", () => {
  const error = new TestError();

  assert.equal(error instanceof Error, true);
  assert.equal(error instanceof AbstractError, true);
  assert.equal(error.name, "TestError");
  assert.equal(error.severity, ErrorSeverity.ERROR);
  assert.equal(error.category, ErrorCategory.GENERAL);
  assert.deepEqual(error.context, {});
  assert.equal(error.timestamp instanceof Date, true);
});

test("serializes stable JSON data", () => {
  const error = new TestError({
    category: ErrorCategory.VALIDATION,
    severity: ErrorSeverity.WARNING,
    context: {
      input: "value",
      date: new Date("2026-01-02T03:04:05.000Z"),
    },
  });

  const data = error.toJSON();

  assert.equal(data.name, "TestError");
  assert.equal(data.code, "TEST_ERROR");
  assert.equal(data.message, "Test failed");
  assert.equal(data.category, ErrorCategory.VALIDATION);
  assert.equal(data.severity, ErrorSeverity.WARNING);
  assert.equal(data.context.date, "2026-01-02T03:04:05.000Z");
  assert.match(data.timestamp, /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(typeof data.stack, "string");
});

test("accepts package specific error categories", () => {
  const AppErrorCategory = {
    ...ErrorCategory,
    TRANSCRIPT: "transcript",
  };
  const error = new TestError({
    category: AppErrorCategory.TRANSCRIPT,
  });

  assert.equal(error.category, "transcript");
  assert.equal(error.toJSON().category, "transcript");
  assert.match(error.toMarkdown(), /Kategorie: transcript/);
});

test("renders markdown", () => {
  const error = new TestError({
    context: {
      field: "name",
      count: 2,
    },
  });

  const markdown = error.toMarkdown();

  assert.match(markdown, /^# TestError/m);
  assert.match(markdown, /Fehlercode: TEST_ERROR/);
  assert.match(markdown, /## Kontext/);
  assert.match(markdown, /\| field \| name \|/);
  assert.match(markdown, /## Stacktrace/);
});

test("renders escaped html", () => {
  const error = new TestError({
    message: "<script>alert(1)</script>",
    context: {
      raw: "<b>unsafe</b>",
    },
  });

  const html = error.toHTML();

  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /&lt;b&gt;unsafe&lt;\/b&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /<article class="structured-error">/);
});

test("serializes native error causes", () => {
  const cause = new Error("Native failure");
  const error = new TestError({ cause });
  const data = error.toJSON();

  assert.equal(data.cause.name, "Error");
  assert.equal(data.cause.message, "Native failure");
  assert.equal(typeof data.cause.stack, "string");
});

test("serializes nested structured error causes", () => {
  const cause = new TestError({ code: "INNER", message: "Inner failure" });
  const error = new TestError({ cause });
  const data = error.toJSON();

  assert.equal(data.cause.name, "TestError");
  assert.equal(data.cause.code, "INNER");
  assert.equal(data.cause.message, "Inner failure");
});

test("handles complex and circular context values", () => {
  const circular = { name: "root" };
  circular.self = circular;
  const throwingGetter = {};
  Object.defineProperty(throwingGetter, "broken", {
    enumerable: true,
    get() {
      throw new Error("getter failed");
    },
  });
  const error = new TestError({
    context: {
      circular,
      throwingGetter,
      list: [1, new Date("2026-01-01T00:00:00.000Z")],
      fn() {
        return true;
      },
      big: 1n,
      symbol: Symbol("value"),
    },
  });

  const data = error.toJSON();
  const markdown = error.toMarkdown();
  const html = error.toHTML();

  assert.equal(data.context.circular.self, "[Circular]");
  assert.equal(data.context.throwingGetter, "[Unserializable]");
  assert.equal(data.context.list[1], "2026-01-01T00:00:00.000Z");
  assert.equal(data.context.big, "1");
  assert.equal(data.context.symbol, "Symbol(value)");
  assert.match(markdown, /\[Circular\]/);
  assert.match(html, /\[Circular\]/);
});

test("includes additional report sections", () => {
  const error = new SectionError();
  const data = error.toJSON();

  assert.equal(data.reportSections[0].title, "Details");
  assert.equal(data.reportSections[0].values.id, 42);
  assert.match(error.toMarkdown(), /## Details/);
  assert.match(error.toHTML(), /<h2>Details<\/h2>/);
});

test("omits empty optional report areas", () => {
  const error = new TestError();
  error.stack = undefined;

  const data = error.toJSON();
  const markdown = error.toMarkdown();
  const html = error.toHTML();

  assert.equal("cause" in data, false);
  assert.equal("stack" in data, false);
  assert.doesNotMatch(markdown, /## Ursache/);
  assert.doesNotMatch(markdown, /## Stacktrace/);
  assert.doesNotMatch(html, /Ursache/);
  assert.doesNotMatch(html, /Stacktrace/);
});
