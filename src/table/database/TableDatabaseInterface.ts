import type { TableDataTypeInterface } from "../TableDataTypeInterface.js";

/**
 * Beschreibt eine neutrale Sammlung fachlicher Tables.
 *
 * Der Contract definiert weder eine konkrete Persistenzform noch eine
 * datenbankspezifische Query-Sprache. Implementierungen können zum Beispiel
 * Google Sheets, SQL-Datenbanken oder andere tabellarische Backends abbilden.
 */
export interface TableDatabaseInterface {
  /**
   * Gibt den fachlichen Namen dieser Database zurück, sofern er bekannt ist.
   */
  getName(): string | undefined;

  /**
   * Gibt alle Tables zurück, die im aktuellen Database-Zustand bekannt sind.
   *
   * Die Methode führt keinen externen Read aus. Für eine autoritative Sicht auf
   * eine externe Datenquelle muss zuvor dataRead() ausgeführt werden.
   */
  getTables(): readonly TableDataTypeInterface[];

  /**
   * Gibt eine logische Referenz auf die Table mit dem angegebenen Namen zurück.
   *
   * Die Methode führt keinen externen Read und keine Existenzprüfung durch.
   * Eine konkrete Implementierung darf deshalb eine lazy Table-Referenz
   * zurückgeben. Ob die Table extern existiert, wird erst durch den jeweiligen
   * Read beziehungsweise durch den geladenen Database-Zustand bestimmt.
   */
  getTable(name: string): TableDataTypeInterface;

  /**
   * Gibt zurück, ob eine Table mit diesem Namen im aktuell bekannten
   * Database-Zustand vorhanden ist.
   *
   * Die Methode führt keinen externen Read aus. Vor dataRead() darf das Ergebnis
   * daher unvollständig sein.
   */
  hasTable(name: string): boolean;

  /**
   * Lädt den fachlichen Database-Zustand aus der konkreten Datenquelle.
   *
   * Nach erfolgreichem Abschluss müssen getTables() und hasTable() den
   * geladenen Zustand repräsentieren können.
   */
  dataRead(): Promise<this>;
}
