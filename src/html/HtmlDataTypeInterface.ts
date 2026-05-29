import type { CommonDataTypeInterface } from "../common/index.js";
import type { HtmlAttributes } from "./HtmlTypes.js";

export interface HtmlDataTypeInterface extends CommonDataTypeInterface<string> {
  getTitle(): string;
  setTitle(title: string): this;

  getBody(): string;
  setBody(content: string): this;
  appendBody(content: string): this;

  addElement(tagName: string, content?: string, attributes?: HtmlAttributes): this;
  removeElement(selector: string): this;
  setAttribute(selector: string, name: string, value: string | number | boolean): this;
}
