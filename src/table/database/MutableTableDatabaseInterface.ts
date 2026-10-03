import type { TableDataTypeInterface } from "../TableDataTypeInterface.js";
import type { TableSchemaInterface } from "../schema/index.js";
import type { TableDatabaseInterface } from "./TableDatabaseInterface.js";

/**
 * Erweiterung einer TableDatabase um strukturelle Schreiboperationen.
 *
 * Das Interface beschreibt nur die fachliche Absicht. Wie ein Schema physisch
 * umgesetzt wird, entscheidet die konkrete Implementierung. Google Sheets kann
 * beispielsweise ein Sheet mit Header-Zeile erzeugen, während SQL daraus eine
 * datenbankspezifische CREATE-TABLE-Operation ableiten kann.
 */
export interface MutableTableDatabaseInterface
  extends TableDatabaseInterface {
  /**
   * Fügt dem aktuellen Database-Zustand eine neue Table gemäß Schema hinzu.
   *
   * Die Methode führt selbst keinen externen Save aus. Persistiert wird erst
   * über dataSave(). Das Schema bestimmt insbesondere den fachlichen
   * Table-Namen und die Attribute.
   */
  addTable(schema: TableSchemaInterface): TableDataTypeInterface;

  /**
   * Entfernt eine Table anhand ihres Namens oder ihrer konkreten Referenz aus
   * dem aktuellen Database-Zustand.
   *
   * Die Methode führt selbst keinen externen Save aus.
   */
  removeTable(
    table: string | TableDataTypeInterface,
  ): this;

  /**
   * Persistiert strukturelle Änderungen am Database-Zustand über die konkrete
   * Implementierung.
   */
  dataSave(): Promise<this>;
}
