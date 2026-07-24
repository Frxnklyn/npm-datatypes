import type { HTMLElementAttributesFor } from "./HTMLElementAttributeMapInterface.js";
import type { HTMLElementEditorDataTypeInterface } from "./HTMLElementEditorDataTypeInterface.js";
import type { HTMLStandardElementTagName } from "./HTMLElementTagName.js";

export interface HTMLDivEditorDataTypeInterface
  extends HTMLElementEditorDataTypeInterface {
  addElement<TTagName extends HTMLStandardElementTagName>(
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
  removeElement(index: number): this;
  clearElements(): this;
}
