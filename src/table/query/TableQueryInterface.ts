import type {
  TableQueryAggregation,
  TableQueryCondition,
  TableQueryOrder,
} from "./TableQueryTypes.js";

/**
 * Beschreibt eine datenquellenunabhängige Query auf einer Table.
 *
 * Die Query legt nur fest, welche Daten fachlich angefordert werden. Wie eine
 * konkrete Implementierung Filter, Projektion, Gruppierung, Aggregation,
 * Sortierung, Offset und Limit ausführt, ist nicht Teil dieses Contracts.
 */
export interface TableQueryInterface {
  /**
   * Optionale Liste fachlicher Attribute, die im Ergebnis benötigt werden.
   */
  readonly select?: readonly string[];

  /**
   * Optionale Filterbedingung. Gruppen können rekursiv verschachtelt werden.
   */
  readonly where?: TableQueryCondition;

  /**
   * Attribute, nach denen das Ergebnis gruppiert werden soll.
   */
  readonly groupBy?: readonly string[];

  /**
   * Aggregationen, die auf dem Ergebnis ausgeführt werden sollen.
   */
  readonly aggregations?: readonly TableQueryAggregation[];

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
