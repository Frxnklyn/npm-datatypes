import type { JsonDataType } from "../../src/json/JsonTypes.js";
import { AbstractJsonObject } from "../../src/common/AbstractJsonObject.js";
import { JsonField } from "../../src/common/JsonDecorators.js";
import type { JsonConstructorInterface } from "../../src/common/JsonConstructorInterface.js";

export class Connection extends AbstractJsonObject {
  @JsonField() provider = "local";
}

export class Agent extends AbstractJsonObject {
  @JsonField() systemPrompt = "";
  @JsonField() temperature = 0.7;
  @JsonField({ import: "createConnection" }) connection: Connection | undefined = undefined;
  @JsonField({ import: "createTools" }) tools: string[] = [];
  internalSecret = "safe";

  protected createConnection(json: JsonDataType): Connection {
    return new Connection(json);
  }

  protected createTools(json: JsonDataType): string[] {
    if (!Array.isArray(json)) return [];
    return json.map(tool => {
      if (tool === null || typeof tool !== "object" || Array.isArray(tool)) return "invalid";
      return `${this.connection?.provider ?? "missing"}:${tool.name}`;
    });
  }
}

export class SpecializedAgent extends Agent {
  @JsonField() customPrompt = "Custom default";

  // Virtual dispatch still works; do not rely on uninitialized child fields.
  protected override createConnection(json: JsonDataType): Connection {
    if (json === null || typeof json !== "object" || Array.isArray(json)) {
      throw new TypeError("Invalid connection");
    }
    return new Connection({ provider: `special:${json.provider}` });
  }
}

export class RenamedAgent extends AbstractJsonObject {
  @JsonField("system_prompt") systemPrompt = "";
}

export class AliasConnectionAgent extends AbstractJsonObject {
  @JsonField({ key: "connection_data", import: "createConnection" })
  connection: Connection | undefined = undefined;

  protected createConnection(json: JsonDataType): Connection {
    return new Connection(json);
  }
}

export class ReinitializedAgent extends Agent {
  @JsonField() override systemPrompt = "Child default";
}

export class SameDefaultAgent extends Agent {
  @JsonField() childOnly = 100;
}

export class OptionalAgent extends AbstractJsonObject {
  @JsonField() optional: boolean | undefined = undefined;
}

export class MissingMethodAgent extends AbstractJsonObject {
  @JsonField({ import: "doesNotExist" }) connection: Connection | undefined = undefined;
}

export class UnmarkedMethodAgent extends AbstractJsonObject {
  called = false;
  protected importName(_json: JsonDataType): string {
    this.called = true;
    return "name";
  }
}

// Checked at compile time: a new(json) signature is required.
export const agentConstructor: JsonConstructorInterface<Agent> = Agent;
export const childConstructor: JsonConstructorInterface<SpecializedAgent> = SpecializedAgent;

class IncorrectConstructor {
  constructor(_json: number) {}
}
// @ts-expect-error A number-only constructor cannot accept arbitrary JsonDataType.
const incorrectConstructor: JsonConstructorInterface<IncorrectConstructor> = IncorrectConstructor;
void incorrectConstructor;
