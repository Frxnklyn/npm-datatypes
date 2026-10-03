import type { TableDataTypeInterface } from "../TableDataTypeInterface.js";
import type { TableQueryInterface } from "./TableQueryInterface.js";

/**
 * Führt eine Table-Query gegen eine bestehende Table aus.
 *
 * Die konkrete Ausführung ist nicht Teil dieses Contracts. Implementierungen
 * dürfen unterschiedliche Datenquellen oder Ausführungsstrategien verwenden.
 * Die Eingabe-Table darf durch execute() nicht mutiert werden. Das Ergebnis
 * repräsentiert den durch die Query erzeugten Tabellenzustand als eigene Table.
 */
export interface TableQueryExecutorInterface {
  execute(
    table: TableDataTypeInterface,
    query?: TableQueryInterface,
  ): Promise<TableDataTypeInterface>;
}
