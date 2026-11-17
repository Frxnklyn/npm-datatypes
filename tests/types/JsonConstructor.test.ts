import type { JsonConstructorInterface, JsonObject } from "../../src/index.js";

class Basic {
  constructor(public readonly json: JsonObject) {}
}

const basic: JsonConstructorInterface<Basic> = Basic;
new basic({ value: 1 });
// @ts-expect-error Arrays cannot be used as JsonObject.
new basic([1, 2]);
// @ts-expect-error Null cannot be used as JsonObject.
new basic(null);

interface Factory { id: number }
interface Item { readonly value: string }

interface ItemConstructor<
  T extends Item = Item,
  Args extends unknown[] = [],
> extends JsonConstructorInterface<T, [factory: Factory, ...args: Args]> {}

class Extended implements Item {
  readonly value = "test";
  constructor(
    public readonly json: JsonObject,
    public readonly factory: Factory,
    public readonly count: number,
  ) {}
}

const ctor: ItemConstructor<Extended, [count: number]> = Extended;
const result = new ctor({ value: 1 }, { id: 1 }, 3);
const value: string = result.value;
void value;
// @ts-expect-error Factory argument is required.
new ctor({ value: 1 }, 3);
// @ts-expect-error Count is a number.
new ctor({ value: 1 }, { id: 1 }, "3");

interface WrongConstructor {
  new (json: string): Basic;
}
// @ts-expect-error String-only constructor cannot satisfy JsonObject contract.
const invalid: JsonConstructorInterface<Basic> = null as unknown as WrongConstructor;
void invalid;
