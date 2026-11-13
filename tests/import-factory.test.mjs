import assert from "node:assert/strict";
import test from "node:test";
import { AbstractImport, AbstractJsonMappable, AbstractFactory } from "../dist/index.js";

class FrameBase extends AbstractJsonMappable {
  width = 100;
  height = 50;
}
class TextFrame extends FrameBase {
  text = "";
  fontSize = 16;
  enabled = true;
  items = [];
  options = { weight: "normal" };
  internal = "protected";
  getImportableKeys() {
    return ["width", "height", "text", "fontSize", "enabled", "items", "options"];
  }
}
class FrameFactory extends AbstractFactory {
  instantiate(json) {
    return this.create(new TextFrame(), json);
  }
  static instantiate(json) {
    return this.create(new TextFrame(), json);
  }
}

test("imports initialized fields from parent and child after construction", () => {
  const frame = FrameFactory.instantiate({
    width: 400, height: 240, text: "hello", fontSize: 24,
    enabled: false, items: [1, "two"], options: { weight: "bold" },
    missing: "ignored", internal: "intrusion",
  });
  assert.equal(frame.width, 400);
  assert.equal(frame.height, 240);
  assert.equal(frame.text, "hello");
  assert.equal(frame.fontSize, 24);
  assert.equal(frame.enabled, false);
  assert.deepEqual(frame.items, [1, "two"]);
  assert.deepEqual(frame.options, { weight: "bold" });
  assert.equal(frame.internal, "protected");
  assert.equal("missing" in frame, false);
});

test("ignores incompatible or absent properties and rejects non-object input", () => {
  const factory = new FrameFactory();
  const frame = factory.instantiate({
    width: "oops", text: 1, enabled: null, options: [], items: {}, fontSize: 10,
  });
  assert.equal(frame.width, 100);
  assert.equal(frame.text, "");
  assert.equal(frame.enabled, true);
  assert.deepEqual(frame.options, { weight: "normal" });
  assert.deepEqual(frame.items, []);
  assert.equal(frame.fontSize, 10);
  assert.throws(() => factory.instantiate([1, 2]), TypeError);
  assert.throws(() => factory.instantiate(null), TypeError);
});

test("instance and static Factory.create delegate once and return the same object", () => {
  class Importable {
    calls = [];
    importJson(json) { this.calls.push(json); return this; }
  }
  class Factory extends AbstractFactory {
    run(instance, json) { return this.create(instance, json); }
    static run(instance, json) { return this.create(instance, json); }
  }
  const instance = new Importable();
  const json = { a: 1 };
  assert.strictEqual(new Factory().run(instance, json), instance);
  assert.strictEqual(Factory.run(instance, json), instance);
  assert.deepEqual(instance.calls, [json, json]);
});

test("exports only allowlisted, current values from parent and child fields", () => {
  const frame = FrameFactory.instantiate({
    width: 400, height: 200, text: "Hallo", fontSize: 30,
    enabled: false, items: ["A"], options: { weight: "bold" },
    internal: "do not expose", unexpected: "ignore",
  });
  const snapshot = frame.exportJson();
  assert.deepEqual(snapshot, {
    width: 400, height: 200, text: "Hallo", fontSize: 30,
    enabled: false, items: ["A"], options: { weight: "bold" },
  });
  frame.width = 800;
  frame.items.push("B");
  frame.options.weight = "normal";
  assert.equal(snapshot.width, 400);
  assert.deepEqual(snapshot.items, ["A"]);
  assert.deepEqual(snapshot.options, { weight: "bold" });
  assert.equal(frame.exportJson().width, 800);
});

test("invalid JSON values and cycles are not exported", () => {
  class State extends AbstractJsonMappable {
    name = "valid";
    zero = 0;
    nothing = null;
    badNumber = Number.NaN;
    badDate = new Date();
    callback = () => "unsafe";
    invalidArray = [undefined];
    invalidObject = { nested: undefined };
    loop = {};
  }
  const state = new State();
  state.loop.self = state.loop;
  assert.deepEqual(state.exportJson(), { name: "valid", zero: 0, nothing: null });
});

test("AbstractImport supports import-only classes without exposing exportJson", () => {
  class ImportOnly extends AbstractImport { value = 0; }
  const item = new ImportOnly().importJson({ value: 42 });
  assert.equal(item.value, 42);
  assert.equal(typeof item.exportJson, "undefined");
});
