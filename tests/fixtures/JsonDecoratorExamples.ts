import type { JsonDataType } from "../../src/json/JsonTypes.js";
import { AbstractJsonObject } from "../../src/common/AbstractJsonObject.js";
import { JsonField, JsonFunction } from "../../src/common/JsonDecorators.js";
import type { JsonConstructorInterface } from "../../src/common/JsonConstructorInterface.js";

export class Connection extends AbstractJsonObject {
  @JsonField() provider = "local";
}

export class Agent extends AbstractJsonObject {
  @JsonField() systemPrompt = "";
  @JsonField() temperature = 0.7;
  @JsonField() connection: Connection | undefined = undefined;
  @JsonField() tools: string[] = [];
  internalSecret = "safe";

  @JsonFunction("connection")
  protected importConnection(json: JsonDataType): Connection {
    return new Connection(json);
  }

  @JsonFunction("tools")
  protected importTools(json: JsonDataType): string[] {
    if (!Array.isArray(json)) return [];
    return json.map(tool => {
      if (tool === null || typeof tool !== "object" || Array.isArray(tool)) return "invalid";
      return `${this.connection?.provider ?? "missing"}:${tool.name}`;
    });
  }
}

export class SpecializedAgent extends Agent {
  @JsonField() customPrompt = "Custom default";

  // The base method is decorated. This override needs no second decorator.
  protected override importConnection(json: JsonDataType): Connection {
    if (json === null || typeof json !== "object" || Array.isArray(json)) {
      throw new TypeError("Invalid connection");
    }
    return new Connection({ provider: `special:${json.provider}` });
  }
}

export class RenamedAgent extends AbstractJsonObject {
  @JsonField("system_prompt") systemPrompt = "";
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
export class ProtectedAgent extends AbstractJsonObject {
  called = false;
  @JsonFunction("name") protected getName(_json: JsonDataType): string {
    this.called = true;
    return "name";
  }
}

// The constructor contract is verified during the test TypeScript build.
export const agentConstructor: JsonConstructorInterface<Agent> = Agent;
export const childConstructor: JsonConstructorInterface<SpecializedAgent> = SpecializedAgent;

class IncorrectConstructor {
  constructor(_json: number) {}
}
// @ts-expect-error A number-only constructor does not accept all JSON values.
const incorrectConstructor: JsonConstructorInterface<IncorrectConstructor> = IncorrectConstructor;
void incorrectConstructor;
