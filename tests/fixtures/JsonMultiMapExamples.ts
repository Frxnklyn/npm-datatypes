import type { JsonDataType, JsonObject } from "../../src/json/JsonTypes.js";
import { AbstractJsonObject } from "../../src/common/AbstractJsonObject.js";
import { JsonField } from "../../src/common/JsonDecorators.js";
import { Connection, Agent } from "./JsonDecoratorExamples.js";

export class ToolBox {
  constructor(public tools: string[] = []) {}
  exportJson(): JsonObject { return { tools: [...this.tools] }; }
}

export class MultiAgent extends AbstractJsonObject {
  calls: string[] = [];
  @JsonField([
    { key: "tools", import: "addToolsToToolBox", order: 20 },
    { key: "toolbox", import: "createToolBox", order: 10 },
  ])
  private toolBox: ToolBox = new ToolBox(["default"]);
  getToolBox(): ToolBox { return this.toolBox; }
  protected createToolBox(json: JsonDataType, current: ToolBox): ToolBox {
    this.calls.push(`toolbox:${current.tools.join(",")}`);
    if (json === null || typeof json !== "object" || Array.isArray(json) || !Array.isArray(json.tools)) throw new TypeError("Toolbox format");
    return new ToolBox(json.tools.map(String));
  }
  protected addToolsToToolBox(json: JsonDataType, current: ToolBox): ToolBox {
    this.calls.push(`tools:${current.tools.join(",")}`);
    if (!Array.isArray(json)) throw new TypeError("Tools format");
    return new ToolBox([...current.tools, ...json.map(String)]);
  }
}
export class MultiWithExplicitExport extends AbstractJsonObject {
  @JsonField([
    { key: "tools", import: "addToolsToToolBox", order: 20 },
    { key: "toolbox", import: "createToolBox", order: 10, export: "exportToolBox" },
  ])
  private toolBox: ToolBox = new ToolBox([]);
  getToolBox(): ToolBox { return this.toolBox; }
  protected createToolBox(json: JsonDataType): ToolBox {
    if (json === null || typeof json !== "object" || Array.isArray(json) || !Array.isArray(json.tools)) throw new TypeError("Toolbox format");
    return new ToolBox(json.tools.map(String));
  }
  protected addToolsToToolBox(json: JsonDataType, current: ToolBox): ToolBox {
    if (!Array.isArray(json)) throw new TypeError("Tools format");
    return new ToolBox([...current.tools, ...json.map(String)]);
  }
  protected exportToolBox(value: ToolBox): JsonDataType { return { total: value.tools.length }; }
}
export class EqualOrderAgent extends AbstractJsonObject {
  calls: string[] = [];
  @JsonField([
    { key: "second", order: 5, import: "addSecond" },
    { key: "first", order: 5, import: "addFirst" },
  ]) result = "default";
  protected addFirst(json: JsonDataType, current: string): string { this.calls.push("first"); return `${current}:${json}`; }
  protected addSecond(json: JsonDataType, current: string): string { this.calls.push("second"); return `${current}:${json}`; }
}
export class UnorderedAgent extends AbstractJsonObject {
  calls: string[] = [];
  @JsonField([
    { key: "later", order: 10, import: "addLater" },
    { key: "implicit", import: "addImplicit" },
  ]) result = "";
  protected addImplicit(_j: JsonDataType, current: string): string { this.calls.push("implicit"); return current + "A"; }
  protected addLater(_j: JsonDataType, current: string): string { this.calls.push("later"); return current + "B"; }
}
export class ArrayAgent extends AbstractJsonObject {
  @JsonField({ import: "makeConnections" }) values: Connection[] = [];
  protected makeConnections(json: JsonDataType): Connection[] {
    if (!Array.isArray(json)) throw new TypeError("Not array");
    return json.map(value => new Connection(value));
  }
}
export class UndefinedAgent extends AbstractJsonObject {
  @JsonField() maybe: string | undefined = undefined;
  @JsonField() meta = { valid: "yes", ignored: undefined as string | undefined };
}
export class InvalidNumberAgent extends AbstractJsonObject {
  @JsonField() total = NaN;
}
export class InvalidArrayAgent extends AbstractJsonObject {
  @JsonField() values = [undefined];
}
export class InvalidClassAgent extends AbstractJsonObject {
  @JsonField() date = new Date();
}
export class CycleAgent extends AbstractJsonObject {
  @JsonField() contents: Record<string, unknown> = {};
}
export class CircularModelAgent extends AbstractJsonObject {
  @JsonField() other: AbstractJsonObject | undefined = undefined;
}
export class DuplicateKeyAgent extends AbstractJsonObject {
  @JsonField("same") first = "first";
  @JsonField("same") second = "second";
}
export class ExportFunctionAgent extends AbstractJsonObject {
  @JsonField({ key: "value", export: "transformExport" }) value = 3;
  protected transformExport(value: number): JsonDataType { return { wrapped: value }; }
}
export class MissingExportFunctionAgent extends AbstractJsonObject {
  @JsonField({ export: "missingExport" }) value = 3;
}
export class CustomExportAgent extends AbstractJsonObject {
  @JsonField() name = "default";
  override exportJson(): JsonObject { return { ...super.exportJson(), extra: "yes" }; }
}
export class RedeclaredAgent extends Agent {
  @JsonField("new_prompt") override systemPrompt = "child";
}
export class ExplicitUndefinedAgent extends AbstractJsonObject {
  @JsonField({ export: "noValue" }) value = 1;
  protected noValue(_value: number): undefined { return undefined; }
}

export class DirectMultiAgent extends AbstractJsonObject {
  @JsonField([{ key: "name", order: 10 }, { key: "alias", order: 20 }]) name = "default";
}
