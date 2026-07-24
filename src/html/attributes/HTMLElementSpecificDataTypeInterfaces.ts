import type { HTMLElementDataTypeInterface } from "./HTMLElementDataTypeInterface.js";

export interface HTMLAnchorDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "a";
}

export interface HTMLImageDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "img";
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

export interface HTMLIFrameDataTypeInterface extends HTMLElementDataTypeInterface {
  getTagName(): "iframe";
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
