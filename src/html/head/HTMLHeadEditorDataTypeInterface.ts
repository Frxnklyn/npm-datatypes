import type {
  HTMLBaseAttributeInterface,
  HTMLLinkAttributeInterface,
  HTMLMetaAttributeInterface,
  HTMLScriptAttributeInterface,
  HTMLStyleAttributeInterface,
  HTMLTemplateAttributeInterface,
} from "../attributes/HTMLElementSpecificAttributeInterfaces.js";
import type { HTMLIconAttributeInterface } from "./HTMLIconAttributeInterface.js";

/**
 * Provides write access to an HTML document head.
 */
export interface HTMLHeadEditorDataTypeInterface {
  setDocumentTitle(title: string): this;
  removeDocumentTitle(): this;
  setLanguage(language: string): this;
  setCharset(charset: string): this;
  removeCharset(): this;
  setDescription(description: string): this;
  removeDescription(): this;
  setViewport(viewport: string): this;
  removeViewport(): this;
  setBase(attributes: HTMLBaseAttributeInterface): this;
  removeBase(): this;
  setIcon(attributes: HTMLIconAttributeInterface): this;
  addIcon(attributes: HTMLIconAttributeInterface): this;
  removeIcon(index: number): this;
  clearIcons(): this;
  addLink(attributes: HTMLLinkAttributeInterface): this;
  removeLink(index: number): this;
  addMeta(attributes: HTMLMetaAttributeInterface): this;
  removeMeta(index: number): this;
  addScript(
    content?: string,
    attributes?: HTMLScriptAttributeInterface,
  ): this;
  removeScript(index: number): this;
  addStyle(
    content: string,
    attributes?: HTMLStyleAttributeInterface,
  ): this;
  removeStyle(index: number): this;
  addTemplate(
    content: string,
    attributes?: HTMLTemplateAttributeInterface,
  ): this;
  removeTemplate(index: number): this;
  addNoScript(content: string): this;
  removeNoScript(index: number): this;
}
