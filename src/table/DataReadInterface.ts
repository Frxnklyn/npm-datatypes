import type {
  FilterComparator,
  FilterInterface,
} from "./filter/index.js";
import type { RowDataTypeInterface } from "./RowDataTypeInterface.js";

export interface DataReadInterface {
  /**
   * Liest Rows asynchron aus der konkreten Datenquelle.
   *
   * Die aktuell an der Table gesetzten Filter und ihr Comparator werden
   * übergeben und von der konkreten Strategie datenquellenspezifisch
   * interpretiert. "and" verlangt die Erfüllung aller Bedingungen, während bei
   * "or" eine erfüllte Bedingung genügt. Der Rückgabewert enthält die gelesenen
   * Rows in Tabellenreihenfolge und wird von dataRead() als neuer geladener
   * Zustand der Table verwendet.
   */
  read(
    filters: readonly FilterInterface[],
    comparator: FilterComparator,
  ): Promise<readonly RowDataTypeInterface[]>;
}
