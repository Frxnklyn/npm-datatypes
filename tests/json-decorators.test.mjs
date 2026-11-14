import assert from "node:assert/strict";
import test from "node:test";
import {
  Agent, Connection, SpecializedAgent, RenamedAgent,
  ReinitializedAgent, SameDefaultAgent, OptionalAgent, ProtectedAgent,
} from "../dist-tests/tests/fixtures/JsonDecoratorExamples.js";

test("new Agent(json): simple fields override their defaults", () => {
  const agent = new Agent({ systemPrompt: "Du bist Kibo", temperature: 0.5 });
  assert.equal(agent.systemPrompt, "Du bist Kibo");
  assert.equal(agent.temperature, 0.5);
  assert.deepEqual(agent.tools, []);
});

test("missing JSON keys preserve defaults", () => {
  const agent = new Agent({});
  assert.equal(agent.systemPrompt, "");
  assert.equal(agent.temperature, 0.7);
  assert.equal(agent.connection, undefined);
});

test("@JsonFunction builds a real nested Connection instance", () => {
  const agent = new Agent({ connection: { provider: "openai" } });
  assert.ok(agent.connection instanceof Connection);
  assert.equal(agent.connection.provider, "openai");
});

test("connection is available when a later tools field initializes", () => {
  const agent = new Agent({
    connection: { provider: "local" },
    tools: [{ name: "search" }],
  });
  assert.deepEqual(agent.tools, ["local:search"]);
});

test("a subclass inherits parent mappings without a class decorator or constructor", () => {
  const agent = new SpecializedAgent({
    systemPrompt: "Inherited", customPrompt: "New", connection: { provider: "local" },
  });
  assert.equal(agent.systemPrompt, "Inherited");
  assert.equal(agent.customPrompt, "New");
  assert.ok(agent.connection instanceof Connection);
});

test("an undecorated method override still handles a decorated parent mapping", () => {
  const agent = new SpecializedAgent({ connection: { provider: "remote" } });
  assert.equal(agent.connection.provider, "special:remote");
});

test("a field may use a different JSON key", () => {
  assert.equal(new RenamedAgent({ system_prompt: "Alias" }).systemPrompt, "Alias");
});

test("a child re-declaring a field can retain JSON priority with @JsonField", () => {
  assert.equal(new ReinitializedAgent({ systemPrompt: "JSON wins" }).systemPrompt, "JSON wins");
  assert.equal(new ReinitializedAgent({}).systemPrompt, "Child default");
});

test("unmodified inherited fields remain importable in a further subclass", () => {
  assert.equal(new SameDefaultAgent({ systemPrompt: "Inherited" }).systemPrompt, "Inherited");
});

test("an undefined default accepts optional fields without runtime type metadata", () => {
  assert.equal(new OptionalAgent({ optional: false }).optional, false);
});

test("incompatible direct field values do not replace defaults", () => {
  const agent = new Agent({ systemPrompt: 42, temperature: "wrong", tools: {} });
  assert.equal(agent.systemPrompt, "");
  assert.equal(agent.temperature, 0.7);
  assert.deepEqual(agent.tools, []);
});

test("unknown/unmarked properties are ignored", () => {
  const agent = new Agent({ arbitrary: "ignored", internalSecret: "malicious" });
  assert.equal("arbitrary" in agent, false);
  assert.equal(agent.internalSecret, "safe");
});

test("non-object constructor input is rejected", () => {
  for (const invalid of [null, [], [1, 2], "json", 5]) {
    assert.throws(() => new Agent(invalid), TypeError);
  }
});

test("@JsonFunction without a matching @JsonField is not run", () => {
  assert.equal(new ProtectedAgent({ name: "ignored" }).called, false);
});
