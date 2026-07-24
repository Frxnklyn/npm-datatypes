import type {
  HTMLBaseDataTypeInterface,
  HTMLLinkDataTypeInterface,
  HTMLMetaDataTypeInterface,
  HTMLNoScriptDataTypeInterface,
  HTMLTemplateDataTypeInterface,
  HTMLTitleDataTypeInterface,
} from "./HTMLHeadContentDataTypeInterfaces.js";
import type { HTMLIconDataTypeInterface } from "./HTMLIconDataTypeInterface.js";
import type { HTMLScriptDataTypeInterface } from "../script/HTMLScriptDataTypeInterface.js";
import type { HTMLScriptLinkDataTypeInterface } from "../script/HTMLScriptLinkDataTypeInterface.js";
import type { HTMLStyleDataTypeInterface } from "../style/HTMLStyleDataTypeInterface.js";
import type { HTMLStyleLinkDataTypeInterface } from "../style/HTMLStyleLinkDataTypeInterface.js";

/**
 * Provides read access to an HTML document head.
 */
export interface HTMLHeadDataTypeInterface {
  getCode(): string;
  getBase(): HTMLBaseDataTypeInterface | undefined;
  getTitle(): HTMLTitleDataTypeInterface | undefined;
  getLanguage(): string | undefined;
  getCharset(): string | undefined;
  getDescription(): string | undefined;
  getViewport(): string | undefined;
  getIcon(): HTMLIconDataTypeInterface | undefined;
  getIcons(): ReadonlyArray<HTMLIconDataTypeInterface>;
  getLinks(): ReadonlyArray<HTMLLinkDataTypeInterface>;
  getMetaElements(): ReadonlyArray<HTMLMetaDataTypeInterface>;
  getScriptLinks(): ReadonlyArray<HTMLScriptLinkDataTypeInterface>;
  getScripts(): ReadonlyArray<HTMLScriptDataTypeInterface>;
  getScript(index: number): HTMLScriptDataTypeInterface | undefined;
  getStyleLinks(): ReadonlyArray<HTMLStyleLinkDataTypeInterface>;
  getStyles(): ReadonlyArray<HTMLStyleDataTypeInterface>;
  getTemplates(): ReadonlyArray<HTMLTemplateDataTypeInterface>;
  getNoScripts(): ReadonlyArray<HTMLNoScriptDataTypeInterface>;
}
