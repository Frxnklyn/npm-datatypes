import type { TableDataTypeInterface } from "../TableDataTypeInterface.js";
import type { TableQueryInterface } from "../query/index.js";
import type { TableSchemaInterface } from "../schema/index.js";

/**
 * Einheitlicher Einstiegspunkt für tabellarische Datenquellen.
 *
 * getTable() erzeugt ausschließlich eine lazy Table-Referenz. Die optionale
 * Query wird von der konkreten Table beim späteren dataRead() berücksichtigt.
 * Dadurch bleibt der Source-Contract unabhängig davon, ob die Daten aus Google
 * Sheets, SQL oder einer anderen tabellarischen Quelle stammen.
 */
export interface TableSourceInterface {
  /**
   * Erzeugt oder liefert eine lazy Referenz auf eine fachliche Table.
   *
   * Die Methode führt kein externes I/O und keine Existenzprüfung aus.
   */
  getTable(
    name: string,
    query?: TableQueryInterface,
  ): TableDataTypeInterface;

  /**
   * Prüft asynchron, ob die benannte Table in der konkreten Quelle existiert.
   */
  hasTable(name: string): Promise<boolean>;

  /**
   * Legt eine neue Table anhand ihres fachlichen Schemas in der konkreten
   * Quelle an und liefert anschließend eine Table-Referenz zurück.
   */
  addTable(
    schema: TableSchemaInterface,
  ): Promise<TableDataTypeInterface>;

  /**
   * Entfernt die benannte Table aus der konkreten Quelle.
   */
  removeTable(name: string): Promise<void>;
}
