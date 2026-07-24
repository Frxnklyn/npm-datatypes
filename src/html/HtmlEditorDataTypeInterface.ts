import type { HTMLElementAttributesFor } from "./attributes/HTMLElementAttributeMapInterface.js";
import type { HTMLBodyElementTagName } from "./body/HTMLBodyEditorDataTypeInterface.js";

export interface HtmlEditorDataTypeInterface {
  changeContent(newContent: string): this;
  setTitle(title: string): this;
  setBodyHtml(rawHtml: string): this;
  appendBodyRawHtml(rawHtml: string): this;

  addElement<TTagName extends HTMLBodyElementTagName>(
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
}
