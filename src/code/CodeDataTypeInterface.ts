import type { CommonDataTypeInterface } from "../common/index.js";
import type { CodeMethod, CodeProperty } from "./CodeTypes.js";

export interface CodeDataTypeInterface extends CommonDataTypeInterface<string> {
  addImportNamed(moduleName: string, names: string[]): this;
  addImportNamespace(moduleName: string, namespace: string): this;
  removeImport(moduleName: string): this;

  addClass(className: string): this;
  removeClass(className: string): this;
  addProperty(className: string, property: CodeProperty): this;
  addMethod(className: string, method: CodeMethod | string): this;
}
