import type { HTMLElementEditorDataTypeInterface } from "./HTMLElementEditorDataTypeInterface.js";
import type { HTMLScriptAttributeInterface } from "./HTMLElementSpecificAttributeInterfaces.js";

export interface HTMLScriptEditorDataTypeInterface
  extends HTMLElementEditorDataTypeInterface {
  setSource(source: NonNullable<HTMLScriptAttributeInterface["src"]>): this;
  setType(type: NonNullable<HTMLScriptAttributeInterface["type"]>): this;
  setNoModule(noModule: NonNullable<HTMLScriptAttributeInterface["nomodule"]>): this;
  setAsync(async: NonNullable<HTMLScriptAttributeInterface["async"]>): this;
  setDefer(defer: NonNullable<HTMLScriptAttributeInterface["defer"]>): this;
  setCrossOrigin(crossOrigin: NonNullable<HTMLScriptAttributeInterface["crossorigin"]>): this;
  setIntegrity(integrity: NonNullable<HTMLScriptAttributeInterface["integrity"]>): this;
  setReferrerPolicy(
    referrerPolicy: NonNullable<HTMLScriptAttributeInterface["referrerpolicy"]>,
  ): this;
  setBlocking(blocking: NonNullable<HTMLScriptAttributeInterface["blocking"]>): this;
  setFetchPriority(
    fetchPriority: NonNullable<HTMLScriptAttributeInterface["fetchpriority"]>,
  ): this;
}
