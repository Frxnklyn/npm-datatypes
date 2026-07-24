import type { HTMLElementAttributeInterface } from "./HTMLElementAttributeInterface.js";
import type { HTMLElementTagName } from "./HTMLElementTagName.js";

/**
 * Provides access to the content and attributes of an HTML element.
 */
export interface HTMLElementDataTypeInterface {
  getTagName(): HTMLElementTagName;
  getContent(): string;
  getCode(): string;

  getWidth(): HTMLElementAttributeInterface["width"];
  getHeight(): HTMLElementAttributeInterface["height"];
  getClass(): HTMLElementAttributeInterface["class"];
  getId(): HTMLElementAttributeInterface["id"];
  getStyle(): HTMLElementAttributeInterface["style"];
  getTitleAttribute(): HTMLElementAttributeInterface["title"];
  getRole(): HTMLElementAttributeInterface["role"];
  getHidden(): HTMLElementAttributeInterface["hidden"];
  getLanguage(): HTMLElementAttributeInterface["lang"];
  getAccessKey(): HTMLElementAttributeInterface["accesskey"];
  getAutoCapitalize(): HTMLElementAttributeInterface["autocapitalize"];
  getAutoFocus(): HTMLElementAttributeInterface["autofocus"];
  getContentEditable(): HTMLElementAttributeInterface["contenteditable"];
  getDirection(): HTMLElementAttributeInterface["dir"];
  getDraggable(): HTMLElementAttributeInterface["draggable"];
  getInert(): HTMLElementAttributeInterface["inert"];
  getNonce(): HTMLElementAttributeInterface["nonce"];
  getPart(): HTMLElementAttributeInterface["part"];
  getPopover(): HTMLElementAttributeInterface["popover"];
  getSlot(): HTMLElementAttributeInterface["slot"];
  getSpellCheck(): HTMLElementAttributeInterface["spellcheck"];
  getTabIndex(): HTMLElementAttributeInterface["tabindex"];
  getTranslate(): HTMLElementAttributeInterface["translate"];

  getAttribute(name: string): unknown;
  hasAttribute(name: string): boolean;
}
