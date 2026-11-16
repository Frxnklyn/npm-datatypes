import assert from "node:assert/strict";
import test from "node:test";
import {
  Agent, Connection, SpecializedAgent, RenamedAgent, AliasConnectionAgent,
  ReinitializedAgent, SameDefaultAgent, OptionalAgent, MissingMethodAgent,
  UnmarkedMethodAgent,
} from "../dist-tests/tests/fixtures/JsonDecoratorExamples.js";

test("new Agent(json): simple fields override their defaults", () => {
  const agent = new Agent({ systemPrompt: "Du bist Kibo", temperature: 0.5 });
  assert.equal(agent.systemPrompt, "Du bist Kibo");
  assert.equal(agent.temperature, 0.5);
});

test("missing JSON keys preserve defaults", () => {
  const agent = new Agent({});
  assert.equal(agent.systemPrompt, "");
  assert.equal(agent.temperature, 0.7);
  assert.equal(agent.connection, undefined);
  assert.deepEqual(agent.tools, []);
});

test("one @JsonField({ import }) builds a real Connection without a second decorator", () => {
  const agent = new Agent({ connection: { provider: "openai" } });
  assert.ok(agent.connection instanceof Connection);
  assert.equal(agent.connection.provider, "openai");
});

test("connection is available when a later tools field initializes", () => {
  const agent = new Agent({ connection: { provider: "local" }, tools: [{ name: "search" }] });
  assert.deepEqual(agent.tools, ["local:search"]);
});

test("subclasses inherit mappings without constructor or class decorator", () => {
  const agent = new SpecializedAgent({
    systemPrompt: "Inherited", customPrompt: "New", connection: { provider: "local" },
  });
  assert.equal(agent.systemPrompt, "Inherited");
  assert.equal(agent.customPrompt, "New");
  assert.ok(agent.connection instanceof Connection);
});

test("overriding the named method uses normal virtual dispatch", () => {
  const agent = new SpecializedAgent({ connection: { provider: "remote" } });
  assert.equal(agent.connection.provider, "special:remote");
});

test("a simple field may use a different JSON key", () => {
  assert.equal(new RenamedAgent({ system_prompt: "Alias" }).systemPrompt, "Alias");
});

test("key alias and converter method may be combined in a single decorator", () => {
  const agent = new AliasConnectionAgent({ connection_data: { provider: "remote" } });
  assert.ok(agent.connection instanceof Connection);
  assert.equal(agent.connection.provider, "remote");
});

test("redeclaring a decorated field keeps JSON priority when redecorated", () => {
  assert.equal(new ReinitializedAgent({ systemPrompt: "JSON wins" }).systemPrompt, "JSON wins");
  assert.equal(new ReinitializedAgent({}).systemPrompt, "Child default");
});

test("unchanged inherited fields stay importable", () => {
  assert.equal(new SameDefaultAgent({ systemPrompt: "Inherited" }).systemPrompt, "Inherited");
});

test("a field with undefined default accepts a value without runtime type metadata", () => {
  assert.equal(new OptionalAgent({ optional: false }).optional, false);
});

test("incompatible direct field values retain defaults", () => {
  const agent = new Agent({ systemPrompt: 42, temperature: "wrong" });
  assert.equal(agent.systemPrompt, "");
  assert.equal(agent.temperature, 0.7);
});

test("unknown and unmarked properties are not imported", () => {
  const agent = new Agent({ arbitrary: "ignored", internalSecret: "malicious" });
  assert.equal("arbitrary" in agent, false);
  assert.equal(agent.internalSecret, "safe");
});

test("non-object constructor input is rejected", () => {
  for (const invalid of [null, [], [1, 2], "json", 5]) {
    assert.throws(() => new Agent(invalid), TypeError);
  }
});

test("missing converter method throws a descriptive error only if the JSON key exists", () => {
  assert.equal(new MissingMethodAgent({}).connection, undefined);
  assert.throws(() => new MissingMethodAgent({ connection: { provider: "local" } }),
    /doesNotExist.*not callable/);
});

test("an unmarked function is not invoked just because it exists", () => {
  assert.equal(new UnmarkedMethodAgent({ name: "ignored" }).called, false);
});
