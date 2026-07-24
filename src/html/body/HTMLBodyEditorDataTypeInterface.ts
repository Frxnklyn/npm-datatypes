import type { HTMLElementAttributesFor } from "../attributes/HTMLElementAttributeMapInterface.js";
import type { HTMLElementTagName } from "../attributes/HTMLElementTagName.js";

/**
 * Provides write access to an HTML document body.
 */
export interface HTMLBodyEditorDataTypeInterface {
  setContent(content: string): this;
  addElement<TTagName extends HTMLElementTagName>(
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
  insertElement<TTagName extends HTMLElementTagName>(
    index: number,
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
  replaceElement<TTagName extends HTMLElementTagName>(
    index: number,
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
  moveElement(fromIndex: number, toIndex: number): this;
  removeElement(index: number): this;
  clearElements(): this;
}
