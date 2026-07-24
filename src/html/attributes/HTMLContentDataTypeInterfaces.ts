import type { HTMLElementDataTypeInterface } from "./HTMLElementDataTypeInterface.js";

export type HTMLPhrasingElementTagName =
  | "abbr"
  | "b"
  | "bdi"
  | "bdo"
  | "br"
  | "canvas"
  | "cite"
  | "code"
  | "data"
  | "del"
  | "dfn"
  | "em"
  | "i"
  | "img"
  | "ins"
  | "kbd"
  | "mark"
  | "meter"
  | "output"
  | "picture"
  | "progress"
  | "q"
  | "ruby"
  | "s"
  | "samp"
  | "slot"
  | "small"
  | "span"
  | "strong"
  | "sub"
  | "sup"
  | "time"
  | "u"
  | "var"
  | "wbr";

export interface HTMLTextDataTypeInterface {
  getText(): string;
  getCode(): string;
}

export interface HTMLPhrasingElementDataTypeInterface
  extends HTMLElementDataTypeInterface {
  getTagName(): HTMLPhrasingElementTagName;
}

export type HTMLPhrasingContentDataType =
  | HTMLTextDataTypeInterface
  | HTMLPhrasingElementDataTypeInterface;
