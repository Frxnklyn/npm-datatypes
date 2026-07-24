import type { HTMLElementAttributeInterface } from "./HTMLElementAttributeInterface.js";

/**
 * Provides write access to the content and attributes of an HTML element.
 */
export interface HTMLElementEditorDataTypeInterface {
  setContent(content: string): this;
  clearContent(): this;

  setWidth(width: NonNullable<HTMLElementAttributeInterface["width"]>): this;
  setHeight(height: NonNullable<HTMLElementAttributeInterface["height"]>): this;
  setClass(className: NonNullable<HTMLElementAttributeInterface["class"]>): this;
  setId(id: NonNullable<HTMLElementAttributeInterface["id"]>): this;
  setStyle(style: NonNullable<HTMLElementAttributeInterface["style"]>): this;
  setTitleAttribute(title: NonNullable<HTMLElementAttributeInterface["title"]>): this;
  setRole(role: NonNullable<HTMLElementAttributeInterface["role"]>): this;
  setHidden(hidden: NonNullable<HTMLElementAttributeInterface["hidden"]>): this;
  setLanguage(language: NonNullable<HTMLElementAttributeInterface["lang"]>): this;
  setAccessKey(accessKey: NonNullable<HTMLElementAttributeInterface["accesskey"]>): this;
  setAutoCapitalize(autoCapitalize: NonNullable<HTMLElementAttributeInterface["autocapitalize"]>): this;
  setAutoFocus(autoFocus: NonNullable<HTMLElementAttributeInterface["autofocus"]>): this;
  setContentEditable(contentEditable: NonNullable<HTMLElementAttributeInterface["contenteditable"]>): this;
  setDirection(direction: NonNullable<HTMLElementAttributeInterface["dir"]>): this;
  setDraggable(draggable: NonNullable<HTMLElementAttributeInterface["draggable"]>): this;
  setInert(inert: NonNullable<HTMLElementAttributeInterface["inert"]>): this;
  setNonce(nonce: NonNullable<HTMLElementAttributeInterface["nonce"]>): this;
  setPart(part: NonNullable<HTMLElementAttributeInterface["part"]>): this;
  setPopover(popover: NonNullable<HTMLElementAttributeInterface["popover"]>): this;
  setSlot(slot: NonNullable<HTMLElementAttributeInterface["slot"]>): this;
  setSpellCheck(spellCheck: NonNullable<HTMLElementAttributeInterface["spellcheck"]>): this;
  setTabIndex(tabIndex: NonNullable<HTMLElementAttributeInterface["tabindex"]>): this;
  setTranslate(translate: NonNullable<HTMLElementAttributeInterface["translate"]>): this;

  setAttribute(name: string, value: unknown): this;
  removeAttribute(name: string): this;
}
