import type { AttributeInterface } from "./AttributeInterface.js";
import type { RelationCardinality } from "./TableTypes.js";

export interface RelationInterface {
  /**
   * Gibt die Kardinalität dieser Relation von der linken zur rechten Seite
   * zurück.
   *
   * "manyToOne" bedeutet beispielsweise, dass mehrere Rows der Table des
   * linken Attributes auf dieselbe Row der Table des rechten Attributes
   * verweisen können. Die Relation wird dadurch nicht automatisch aufgelöst.
   */
  getCardinality(): RelationCardinality;

  /**
   * Gibt das fachliche Attribute auf der linken Seite dieser Relation zurück.
   *
   * Über das Attribute sind seine Table, sein Index, sein Name, sein Datentyp
   * und seine Nullable-Angabe erreichbar.
   */
  getLeftAttribute(): AttributeInterface;

  /**
   * Gibt das fachliche Attribute auf der rechten Seite dieser Relation zurück.
   *
   * Über das Attribute sind seine Table, sein Index, sein Name, sein Datentyp
   * und seine Nullable-Angabe erreichbar.
   */
  getRightAttribute(): AttributeInterface;
}
