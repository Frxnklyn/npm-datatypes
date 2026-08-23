import type { AttributeType } from "./TableTypes.js";
import type { TableDataTypeInterface } from "./TableDataTypeInterface.js";

export interface AttributeInterface {
  /**
   * Gibt die Table zurück, zu deren Schema dieses Attribute gehört.
   */
  getTable(): TableDataTypeInterface;

  /**
   * Gibt den nullbasierten Index dieses Attributes innerhalb der Table zurück.
   *
   * An diesem Index stehen auch der zugehörige Header und die zugehörige Column.
   */
  getIndex(): number;

  /**
   * Gibt den fachlichen Namen dieses Attributes zurück.
   */
  getName(): string;

  /**
   * Gibt den fachlichen Datentyp dieses Attributes zurück.
   */
  getType(): AttributeType;

  /**
   * Gibt zurück, ob die zugehörige Column null als Wert akzeptieren darf.
   */
  isNullable(): boolean;
}
