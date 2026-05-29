import type { CommonDataTypeInterface } from "../common/index.js";
import type { HtmlAttributes } from "./HtmlTypes.js";

export interface HtmlDataTypeInterface extends CommonDataTypeInterface<string> {
  getTitle(): string;
  setTitle(title: string): this;

  setBodyHtml(rawHtml: string): this;
  appendBodyRawHtml(rawHtml: string): this;

  addElement(tagName: string, content?: string, attributes?: HtmlAttributes): this;
}
