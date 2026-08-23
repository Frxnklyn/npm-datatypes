import type { TableCellValue } from "./TableTypes.js";
import type { TableDataTypeInterface } from "./TableDataTypeInterface.js";

export interface RowDataTypeInterface {
  /**
   * Gibt die Table zurück, zu deren aktuell geladenem Zustand diese Row gehört.
   */
  getTable(): TableDataTypeInterface;

  /**
   * Gibt den nullbasierten Index dieser Row innerhalb der Table zurück.
   */
  getIndex(): number;

  /**
   * Gibt die Headers der Table in derselben Reihenfolge zurück, in der
   * getValues() die Werte dieser Row liefert.
   *
   * Der Header an Position i beschreibt den Wert an derselben Position i.
   */
  getHeaders(): readonly string[];

  /**
   * Gibt alle Werte dieser Row in Column-Reihenfolge zurück.
   *
   * Der Wert an Position i gehört zu getHeaders()[i].
   */
  getValues(): readonly TableCellValue[];

  /**
   * Gibt den Wert einer Column anhand ihres nullbasierten Index zurück.
   *
   * Existiert die Column nicht, wird undefined zurückgegeben.
   */
  getValue(columnIndex: number): TableCellValue | undefined;

  /**
   * Gibt den Wert einer Column anhand ihres Headers zurück.
   *
   * Der Header wird über getHeaders() aufgelöst. Existiert er nicht,
   * wird undefined zurückgegeben.
   */
  getValue(header: string): TableCellValue | undefined;
}
