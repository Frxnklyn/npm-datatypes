import type { HTMLElementAttributesFor } from "./HTMLElementAttributeMapInterface.js";
import type { HTMLElementEditorDataTypeInterface } from "./HTMLElementEditorDataTypeInterface.js";
import type { HTMLElementTagName } from "./HTMLElementTagName.js";

export interface HTMLDivEditorDataTypeInterface
  extends HTMLElementEditorDataTypeInterface {
  addElement<TTagName extends HTMLElementTagName>(
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
  removeElement(index: number): this;
  clearElements(): this;
}
