import type { RelationCardinality } from "../TableTypes.js";

/**
 * Beschreibt eine portable Relation ausschließlich über fachliche Namen.
 *
 * Die Relation enthält keine geladenen Rows und löst keinen Join aus.
 */
export interface RelationSchemaInterface {
  getCardinality(): RelationCardinality;
  getSourceTable(): string;
  getSourceAttribute(): string;
  getTargetTable(): string;
  getTargetAttribute(): string;
}
