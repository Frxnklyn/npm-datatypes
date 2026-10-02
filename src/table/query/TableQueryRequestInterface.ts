import type { TableQueryInterface } from "./TableQueryInterface.js";

/**
 * Bindet eine portable Table-Query an eine registrierte DataSource und eine
 * fachliche Table.
 *
 * source ist ein logischer Registry-Name und ausdrücklich kein Connection
 * String. Dadurch können Consumer insbesondere KI-generierte Requests gegen
 * eine kontrollierte Menge bekannter Datenquellen ausführen.
 */
export interface TableQueryRequestInterface {
  readonly source: string;
  readonly table: string;
  readonly query?: TableQueryInterface;
}
