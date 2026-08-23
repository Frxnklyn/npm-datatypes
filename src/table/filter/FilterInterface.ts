import type { TableCellValue } from "../TableTypes.js";
import type { FilterOperator } from "./FilterTypes.js";

export interface FilterInterface {
  /**
   * Gibt den Namen des Attributes zurück, auf das sich die Bedingung bezieht.
   */
  getAttribute(): string;

  /**
   * Gibt den Operator zurück, mit dem der Filterwert interpretiert wird.
   */
  getOperator(): FilterOperator;

  /**
   * Gibt den Wert oder die Werteliste dieser Filterbedingung zurück.
   *
   * Eine Werteliste kann insbesondere vom Operator "in" interpretiert werden.
   * Ist für die Bedingung kein Wert definiert, wird undefined zurückgegeben.
   * Diese Funktion führt die Filterbedingung nicht selbst aus.
   */
  getValue():
    | TableCellValue
    | readonly TableCellValue[]
    | undefined;
}
