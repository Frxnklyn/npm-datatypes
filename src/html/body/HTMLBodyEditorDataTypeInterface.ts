import type { HTMLElementAttributesFor } from "../attributes/HTMLElementAttributeMapInterface.js";
import type { HTMLStandardElementTagName } from "../attributes/HTMLElementTagName.js";

export type HTMLBodyElementTagName = HTMLStandardElementTagName;

/**
 * Provides write access to an HTML document body.
 */
export interface HTMLBodyEditorDataTypeInterface {
  setContent(content: string): this;
  addElement<TTagName extends HTMLBodyElementTagName>(
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
  insertElement<TTagName extends HTMLBodyElementTagName>(
    index: number,
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
  replaceElement<TTagName extends HTMLBodyElementTagName>(
    index: number,
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
  moveElement(fromIndex: number, toIndex: number): this;
  removeElement(index: number): this;
  clearElements(): this;
  addScriptLink(source: string): this;
  removeScriptLink(index: number): this;
  addScript(content: string): this;
  removeScript(index: number): this;
}
