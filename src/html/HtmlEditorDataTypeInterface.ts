import type { HTMLElementAttributesFor } from "./attributes/HTMLElementAttributeMapInterface.js";
import type { HTMLElementTagName } from "./attributes/HTMLElementTagName.js";

export interface HtmlEditorDataTypeInterface {
  changeContent(newContent: string): this;
  setTitle(title: string): this;
  setBodyHtml(rawHtml: string): this;
  appendBodyRawHtml(rawHtml: string): this;

  addElement<TTagName extends HTMLElementTagName>(
    tagName: TTagName,
    content?: string,
    attributes?: HTMLElementAttributesFor<TTagName>,
  ): this;
}
