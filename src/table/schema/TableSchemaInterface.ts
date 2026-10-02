import type { AttributeSchemaInterface } from "./AttributeSchemaInterface.js";
import type { RelationSchemaInterface } from "./RelationSchemaInterface.js";

/**
 * Beschreibt die fachliche Struktur einer Table unabhängig von ihrem aktuell
 * geladenen Datenzustand und unabhängig von einer konkreten DataSource.
 */
export interface TableSchemaInterface {
  getName(): string;
  getAttributes(): readonly AttributeSchemaInterface[];
  getAttribute(name: string): AttributeSchemaInterface | undefined;
  getPrimaryKeyAttributes(): readonly AttributeSchemaInterface[];
  getRelations(): readonly RelationSchemaInterface[];
}
