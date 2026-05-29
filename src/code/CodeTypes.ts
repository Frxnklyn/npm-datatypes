export type ImportName = string;

export interface NamedImport {
  moduleName: string;
  names: ImportName[];
}

export interface NamespaceImport {
  moduleName: string;
  namespace: string;
}

export interface CodeProperty {
  name: string;
  type?: string;
  value?: string;
  access?: "public" | "protected" | "private";
  readonly?: boolean;
  static?: boolean;
}

export interface CodeMethod {
  name: string;
  body: string;
  parameters?: string[];
  returnType?: string;
  access?: "public" | "protected" | "private";
  static?: boolean;
  async?: boolean;
  doc?: string;
}
