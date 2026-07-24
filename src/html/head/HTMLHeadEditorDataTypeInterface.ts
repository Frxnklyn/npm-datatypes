import type {
  HTMLBaseOptionsInterface,
  HTMLLinkOptionsInterface,
  HTMLMetaOptionsInterface,
  HTMLStyleOptionsInterface,
  HTMLTemplateOptionsInterface,
} from "./HTMLHeadEditorOptionsInterfaces.js";
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
  setBase(options: HTMLBaseOptionsInterface): this;
  removeBase(): this;
  setIcon(attributes: HTMLIconAttributeInterface): this;
  addIcon(attributes: HTMLIconAttributeInterface): this;
  removeIcon(index: number): this;
  clearIcons(): this;
  addLink(options: HTMLLinkOptionsInterface): this;
  removeLink(index: number): this;
  addMeta(options: HTMLMetaOptionsInterface): this;
  removeMeta(index: number): this;
  addScriptLink(source: string): this;
  removeScriptLink(index: number): this;
  addScript(content: string): this;
  removeScript(index: number): this;
  addStyleLink(source: string, media?: string): this;
  removeStyleLink(index: number): this;
  addStyle(
    content: string,
    options?: HTMLStyleOptionsInterface,
  ): this;
  removeStyle(index: number): this;
  addTemplate(
    content: string,
    options?: HTMLTemplateOptionsInterface,
  ): this;
  removeTemplate(index: number): this;
  addNoScript(content: string): this;
  removeNoScript(index: number): this;
}
