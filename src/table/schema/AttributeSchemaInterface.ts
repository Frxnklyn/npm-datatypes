import type { AttributeType } from "../TableTypes.js";

/**
 * Beschreibt ein fachliches Attribute unabhängig von geladenen Table-Daten.
 */
export interface AttributeSchemaInterface {
  getName(): string;
  getType(): AttributeType;
  isNullable(): boolean;
  isPrimaryKey(): boolean;
}
