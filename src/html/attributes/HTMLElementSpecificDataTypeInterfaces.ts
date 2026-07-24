import type { HTMLElementDataTypeInterface } from "./HTMLElementDataTypeInterface.js";

export interface HTMLAnchorDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "a";
}

export interface HTMLBaseDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "base";
}

export interface HTMLImageDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "img";
}

export interface HTMLLinkDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "link";
}

export interface HTMLInputDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "input";
}

export interface HTMLFormDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "form";
}

export interface HTMLTextAreaDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "textarea";
}

export interface HTMLSelectDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "select";
}

export interface HTMLOptionDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "option";
}

export interface HTMLAudioDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "audio";
}

export interface HTMLVideoDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "video";
}

export interface HTMLSourceDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "source";
}

export interface HTMLStyleDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "style";
}

export interface HTMLTitleDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "title";
}

export interface HTMLTemplateDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "template";
}

export interface HTMLNoScriptDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "noscript";
}

export interface HTMLIFrameDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "iframe";
}

export interface HTMLMetaDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "meta";
}

export interface HTMLLabelDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "label";
}

export interface HTMLDetailsDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "details";
}

export interface HTMLOrderedListDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "ol";
}

export interface HTMLListItemDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "li";
}

export interface HTMLTableCellDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "td" | "th";
}

export interface HTMLTimeDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "time";
}
