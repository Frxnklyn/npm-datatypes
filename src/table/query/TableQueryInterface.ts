import type {
  TableQueryCondition,
  TableQueryOrder,
} from "./TableQueryTypes.js";

/**
 * Beschreibt eine datenquellenunabhängige Query auf einer Table.
 *
 * Die Query legt nur fest, welche Daten fachlich angefordert werden. Wie eine
 * konkrete Implementierung Filter, Sortierung, Offset und Limit ausführt, ist
 * nicht Teil dieses Contracts.
 */
export interface TableQueryInterface {
  /**
   * Optionale Filterbedingung. Gruppen können rekursiv verschachtelt werden.
   */
  readonly where?: TableQueryCondition;

  /**
   * Sortierungen in Prioritätsreihenfolge.
   */
  readonly orderBy?: readonly TableQueryOrder[];

  /**
   * Anzahl der Ergebnis-Rows, die vor der Rückgabe übersprungen werden.
   */
  readonly offset?: number;

  /**
   * Maximale Anzahl der Ergebnis-Rows.
   */
  readonly limit?: number;
}
