import type { TableDataTypeInterface } from "../TableDataTypeInterface.js";
import type { TableMutation } from "../mutation/index.js";
import type { TableQueryInterface } from "../query/index.js";
import type { TableSchemaInterface } from "../schema/index.js";
import type { TableDataSourceCapability } from "./TableDataSourceTypes.js";

/**
 * Abstrakter Zugriff auf eine registrierbare Table-Datenquelle.
 *
 * Der Name ist ein logischer Identifier. Connection Strings, Credentials oder
 * datenquellenspezifische Query-Sprachen sind nicht Teil dieses Contracts.
 */
export interface TableDataSourceInterface {
  getName(): string;

  /**
   * Gibt die von der DataSource unterstützten Operationen zurück.
   *
   * Bei Angabe einer Table darf eine Implementierung table-spezifische
   * Einschränkungen zurückgeben.
   */
  getCapabilities(table?: string): readonly TableDataSourceCapability[];

  /**
   * Gibt das fachliche Schema einer von dieser DataSource angebotenen Table
   * zurück, sofern es bekannt ist.
   */
  getSchema(table: string): TableSchemaInterface | undefined;

  /**
   * Führt eine portable Query aus und liefert das Ergebnis als eigenen
   * Table-Zustand zurück.
   */
  query(
    table: string,
    query?: TableQueryInterface,
  ): Promise<TableDataTypeInterface>;

  /**
   * Führt eine portable Mutation aus. Read-only DataSources müssen diese
   * optionale Operation nicht anbieten.
   */
  mutate?(
    table: string,
    mutation: TableMutation,
  ): Promise<void>;
}
