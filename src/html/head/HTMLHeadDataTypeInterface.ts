import type {
  HTMLBaseDataTypeInterface,
  HTMLLinkDataTypeInterface,
  HTMLMetaDataTypeInterface,
  HTMLNoScriptDataTypeInterface,
  HTMLStyleDataTypeInterface,
  HTMLTemplateDataTypeInterface,
  HTMLTitleDataTypeInterface,
} from "../attributes/HTMLElementSpecificDataTypeInterfaces.js";
import type { HTMLScriptDataTypeInterface } from "../attributes/HTMLScriptDataTypeInterface.js";

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
  getIcon(): HTMLLinkDataTypeInterface | undefined;
  getIcons(): ReadonlyArray<HTMLLinkDataTypeInterface>;
  getLinks(): ReadonlyArray<HTMLLinkDataTypeInterface>;
  getMetaElements(): ReadonlyArray<HTMLMetaDataTypeInterface>;
  getScripts(): ReadonlyArray<HTMLScriptDataTypeInterface>;
  getStyles(): ReadonlyArray<HTMLStyleDataTypeInterface>;
  getTemplates(): ReadonlyArray<HTMLTemplateDataTypeInterface>;
  getNoScripts(): ReadonlyArray<HTMLNoScriptDataTypeInterface>;
}
