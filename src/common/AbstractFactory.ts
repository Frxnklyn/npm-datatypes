import type { JsonDataType } from "../json/JsonTypes.js";
import type { ImportInterface } from "./ImportInterface.js";

/** Factories construct the instance; this base only delegates JSON import. */
export abstract class AbstractFactory {
  protected create<T extends ImportInterface>(instance: T, json: JsonDataType): T {
    return instance.importJson(json);
  }

  protected static create<T extends ImportInterface>(instance: T, json: JsonDataType): T {
    return instance.importJson(json);
  }
}
