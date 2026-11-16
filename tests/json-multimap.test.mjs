import assert from "node:assert/strict";
import test from "node:test";
import { Connection } from "../dist-tests/tests/fixtures/JsonDecoratorExamples.js";
import {
  MultiAgent, MultiWithExplicitExport, EqualOrderAgent,
  UnorderedAgent, ArrayAgent, UndefinedAgent, InvalidNumberAgent,
  InvalidArrayAgent, InvalidClassAgent, CycleAgent, CircularModelAgent,
  DuplicateKeyAgent, ExportFunctionAgent, MissingExportFunctionAgent,
  CustomExportAgent, RedeclaredAgent, ExplicitUndefinedAgent, DirectMultiAgent,
} from "../dist-tests/tests/fixtures/JsonMultiMapExamples.js";

test("different orders: toolbox is built before adding tools, despite option order", () => {
  const a = new MultiAgent({ tools: ["new"], toolbox: { tools: ["old"] } });
  assert.deepEqual(a.calls, ["toolbox:default", "tools:old"]);
  assert.deepEqual(a.getToolBox().tools, ["old", "new"]);
});
test("if only tools exist, merge them into default toolbox", () => {
  const a = new MultiAgent({ tools: ["new"] });
  assert.deepEqual(a.calls, ["tools:default"]);
  assert.deepEqual(a.getToolBox().tools, ["default", "new"]);
});
test("missing keys skip their converter", () => {
  const a = new MultiAgent({});
  assert.deepEqual(a.calls, []);
  assert.deepEqual(a.getToolBox().tools, ["default"]);
});
test("export uses first sorted mapping even when only later key was imported", () => {
  const a = new MultiAgent({ tools: ["new"] });
  assert.deepEqual(a.exportJson(), { toolbox: { tools: ["default", "new"] } });
});
test("explicit export method applies only to first sorted mapping", () => {
  const a = new MultiWithExplicitExport({ tools: ["a", "b"] });
  assert.deepEqual(a.exportJson(), { toolbox: { total: 2 } });
});
test("same order retains declaration order for import and export", () => {
  const a = new EqualOrderAgent({ first: "A", second: "B" });
  assert.deepEqual(a.calls, ["second", "first"]);
  assert.equal(a.result, "default:B:A");
  assert.deepEqual(a.exportJson(), { second: "default:B:A" });
});
test("order omitted defaults to 0 and runs before order 10", () => {
  const a = new UnorderedAgent({ later: true, implicit: true });
  assert.deepEqual(a.calls, ["implicit", "later"]);
  assert.deepEqual(a.exportJson(), { implicit: "AB" });
});
test("arrays of nested instances automatically call exportJson", () => {
  const a = new ArrayAgent({ values: [{ provider: "a" }, { provider: "b" }] });
  assert.ok(a.values[0] instanceof Connection);
  assert.deepEqual(a.exportJson(), { values: [{ provider: "a" }, { provider: "b" }] });
});
test("undefined fields and nested plain-object properties are skipped", () => {
  assert.deepEqual(new UndefinedAgent({}).exportJson(), { meta: { valid: "yes" } });
});
test("explicit export method overrides the direct output", () => {
  assert.deepEqual(new ExportFunctionAgent({ value: 5 }).exportJson(), { value: { wrapped: 5 } });
});
test("missing explicit export method fails with useful error", () => {
  assert.throws(() => new MissingExportFunctionAgent({}).exportJson(), /missingExport.*not callable/);
});
test("non-finite number is rejected", () => {
  assert.throws(() => new InvalidNumberAgent({}).exportJson(), /not a JSON-compatible value/);
});
test("undefined array items are rejected instead of silently converted to null", () => {
  assert.throws(() => new InvalidArrayAgent({}).exportJson(), /values\[0\]/);
});
test("unsupported Date without exportJson throws", () => {
  assert.throws(() => new InvalidClassAgent({}).exportJson(), /non-JSON object/);
});
test("plain-object circular reference throws", () => {
  const a = new CycleAgent({});
  a.contents.loop = a.contents;
  assert.throws(() => a.exportJson(), /circular reference/);
});
test("circular model export throws without infinite recursion", () => {
  const a = new CircularModelAgent({});
  const b = new CircularModelAgent({});
  a.other = b;
  b.other = a;
  assert.throws(() => a.exportJson(), /circular reference/);
});
test("colliding field export keys produce error instead of overriding", () => {
  assert.throws(() => new DuplicateKeyAgent({}).exportJson(), /duplicate JSON key/);
});
test("custom exportJson can extend super.exportJson()", () => {
  assert.deepEqual(new CustomExportAgent({ name: "Kibo" }).exportJson(), { name: "Kibo", extra: "yes" });
});
test("redeclared child mapping supplants parent for both import and export", () => {
  const a = new RedeclaredAgent({ systemPrompt: "parent", new_prompt: "child" });
  assert.equal(a.systemPrompt, "child");
  assert.equal(a.exportJson().new_prompt, "child");
  assert.equal("systemPrompt" in a.exportJson(), false);
});
test("export converter returning undefined omits field", () => {
  assert.deepEqual(new ExplicitUndefinedAgent({}).exportJson(), {});
});
test("multiple direct mappings apply sequentially and export first mapping", () => {
  const a = new DirectMultiAgent({ name: "first", alias: "second" });
  assert.equal(a.name, "second");
  assert.deepEqual(a.exportJson(), { name: "second" });
});
