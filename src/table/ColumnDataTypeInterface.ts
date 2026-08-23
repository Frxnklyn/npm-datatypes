import type { AttributeInterface } from "./AttributeInterface.js";
import type { TableCellValue } from "./TableTypes.js";
import type { TableDataTypeInterface } from "./TableDataTypeInterface.js";

export interface ColumnDataTypeInterface {
  /**
   * Gibt die Table zurück, zu der diese Column gehört.
   */
  getTable(): TableDataTypeInterface;

  /**
   * Gibt den nullbasierten Index dieser Column innerhalb der Table zurück.
   *
   * An diesem Index stehen die Column auch in table.getColumns(), ihr Header
   * in table.getHeaders() und ihr Attribute in table.getAttributes().
   */
  getIndex(): number;

  /**
   * Gibt den sichtbaren Header dieser Column zurück.
   *
   * Der Header entspricht dem Eintrag in table.getHeaders() am Column-Index.
   */
  getHeader(): string;

  /**
   * Gibt die fachliche Beschreibung dieser Column zurück.
   *
   * Das Attribute enthält insbesondere Namen, Datentyp und Nullable-Angabe
   * und entspricht dem Eintrag in table.getAttributes() am Column-Index.
   */
  getAttribute(): AttributeInterface;

  /**
   * Gibt alle Werte dieser Column in Row-Reihenfolge zurück.
   *
   * Der Wert an Position i gehört zur Row mit dem nullbasierten Index i.
   */
  getValues(): readonly TableCellValue[];

  /**
   * Gibt den Wert dieser Column für eine Row anhand ihres nullbasierten Index
   * zurück.
   *
   * Existiert die Row nicht, wird undefined zurückgegeben. Der zurückgegebene
   * Wert muss fachlich demselben Wert wie table.getRow(rowIndex)?.getValue(
   * getIndex()) entsprechen.
   */
  getValue(rowIndex: number): TableCellValue | undefined;
}
