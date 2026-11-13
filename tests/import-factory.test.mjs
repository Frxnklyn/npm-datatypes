import assert from "node:assert/strict";
import test from "node:test";
import { AbstractImport, AbstractFactory } from "../dist/index.js";

class FrameBase extends AbstractImport {
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
