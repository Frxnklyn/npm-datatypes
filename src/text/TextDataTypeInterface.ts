import type { CommonDataTypeInterface } from "../common/index.js";

export interface TextDataTypeInterface extends CommonDataTypeInterface<string> {
  append(text: string): this;
  prepend(text: string): this;
  replace(searchValue: string | RegExp, replaceValue: string): this;
  clear(): this;

  getLines(): string[];
  addLine(line: string): this;
  insertLine(index: number, line: string): this;
  removeLine(index: number): this;
  replaceLine(index: number, line: string): this;
}
