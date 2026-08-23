import type { RowDataTypeInterface } from "./RowDataTypeInterface.js";

export interface DataSaveInterface {
  /**
   * Speichert den aktuellen Row-Zustand der Table asynchron über die konkrete
   * Datenquelle.
   *
   * Die Rows werden in Tabellenreihenfolge übergeben. Die konkrete Strategie
   * bestimmt die Persistenz und erfüllt das Promise nach Abschluss des Saves.
   */
  save(rows: readonly RowDataTypeInterface[]): Promise<void>;
}
