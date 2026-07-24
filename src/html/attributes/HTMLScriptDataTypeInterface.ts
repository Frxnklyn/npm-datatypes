import type { HTMLElementDataTypeInterface } from "./HTMLElementDataTypeInterface.js";
import type { HTMLScriptAttributeInterface } from "./HTMLElementSpecificAttributeInterfaces.js";

export interface HTMLScriptDataTypeInterface
  extends HTMLElementDataTypeInterface {
  getTagName(): "script";
  getSource(): HTMLScriptAttributeInterface["src"];
  getType(): HTMLScriptAttributeInterface["type"];
  getNoModule(): HTMLScriptAttributeInterface["nomodule"];
  getAsync(): HTMLScriptAttributeInterface["async"];
  getDefer(): HTMLScriptAttributeInterface["defer"];
  getCrossOrigin(): HTMLScriptAttributeInterface["crossorigin"];
  getIntegrity(): HTMLScriptAttributeInterface["integrity"];
  getReferrerPolicy(): HTMLScriptAttributeInterface["referrerpolicy"];
  getBlocking(): HTMLScriptAttributeInterface["blocking"];
  getFetchPriority(): HTMLScriptAttributeInterface["fetchpriority"];
}
