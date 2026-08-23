export type TableCellValue =
  | string
  | number
  | bigint
  | boolean
  | Date
  | null;

export type AttributeType =
  | "string"
  | "integer"
  | "number"
  | "boolean"
  | "date"
  | "datetime"
  | "unknown";

export type RelationCardinality =
  | "oneToOne"
  | "manyToOne"
  | "oneToMany"
  | "manyToMany";
