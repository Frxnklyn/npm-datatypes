import type { HTMLElementAttributesFor } from "./HTMLElementAttributeMapInterface.js";
import type { HTMLElementEditorDataTypeInterface } from "./HTMLElementEditorDataTypeInterface.js";
import type { HTMLPhrasingElementTagName } from "./HTMLContentDataTypeInterfaces.js";

export interface HTMLButtonEditorDataTypeInterface
  extends HTMLElementEditorDataTypeInterface {
  addText(text: string): this;
  addElement<TTagName extends HTMLPhrasingElementTagName>(
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
  removeContent(index: number): this;
}
