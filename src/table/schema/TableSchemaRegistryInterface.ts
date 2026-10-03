import type { TableSchemaInterface } from "./TableSchemaInterface.js";

/**
 * Registry für fachliche Table-Schemas.
 *
 * Eine Implementierung kann damit insbesondere Schemas für KI- oder
 * Query-Consumer discoverable machen, ohne eine konkrete Datenquelle
 * offenzulegen.
 */
export interface TableSchemaRegistryInterface {
  getSchemas(): readonly TableSchemaInterface[];
  getSchema(name: string): TableSchemaInterface | undefined;
  addSchema(schema: TableSchemaInterface): this;
  removeSchema(name: string): this;
}
