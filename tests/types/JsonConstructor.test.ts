import type { JsonConstructorInterface, JsonObject } from "../../src/index.js";

interface AiFactoryInterface { readonly name: string; }
interface KiboEngineClassInterface { readonly kind: string; }

interface KiboEngineClassConstructor<
  T extends KiboEngineClassInterface = KiboEngineClassInterface,
  Args extends unknown[] = [],
> extends JsonConstructorInterface<
  T,
  [factory: AiFactoryInterface, ...args: Args]
> {}

class Basic {
  constructor(public readonly json: JsonObject) {}
}

const basic: JsonConstructorInterface<Basic> = Basic;
new basic({ name: "Kibo" });
// @ts-expect-error Arrays are not JsonObject constructor inputs.
new basic([1, 2]);
// @ts-expect-error Null is not a JsonObject constructor input.
new basic(null);

class KiboAgent implements KiboEngineClassInterface {
  readonly kind = "agent";
  constructor(
    public readonly json: JsonObject,
    public readonly factory: AiFactoryInterface,
    public readonly attempts: number,
    public readonly name: string,
  ) {}
}

const ctor: KiboEngineClassConstructor<KiboAgent, [attempts: number, name: string]> = KiboAgent;
const agent = new ctor({ kind: "agent" }, { name: "local" }, 3, "assistant");
const kind: string = agent.kind;
void kind;
// @ts-expect-error The factory argument is required.
new ctor({ kind: "agent" }, 3, "assistant");
// @ts-expect-error Attempt count is a number.
new ctor({ kind: "agent" }, { name: "local" }, "3", "assistant");

interface WrongConstructor {
  new (json: string): Basic;
}
// @ts-expect-error String-only constructor cannot satisfy the JsonObject contract.
const invalid: JsonConstructorInterface<Basic> = null as unknown as WrongConstructor;
void invalid;
