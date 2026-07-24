import type { HTMLBodyDataTypeInterface } from "./body/HTMLBodyDataTypeInterface.js";
import type { HTMLHeadDataTypeInterface } from "./head/HTMLHeadDataTypeInterface.js";

export interface HtmlDataTypeInterface {
  getDoctype(): string;
  getHead(): HTMLHeadDataTypeInterface;
  getBody(): HTMLBodyDataTypeInterface;
  getContent(): string;
  getContentString(): string;
  getCode(): string;
  getTitle(): string;
}
