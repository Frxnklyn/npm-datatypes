import type { FilterComparator, FilterOperator } from "../filter/index.js";
import type { TableCellValue } from "../TableTypes.js";

/**
 * Beschreibt eine einzelne Filterbedingung innerhalb einer Table-Query.
 */
export type TableQueryFilter = Readonly<{
  attribute: string;
  operator: FilterOperator;
  value?: TableCellValue | readonly TableCellValue[];
}>;

/**
 * Verknüpft mehrere Query-Bedingungen rekursiv mit AND oder OR.
 */
export type TableQueryGroup = Readonly<{
  comparator: FilterComparator;
  conditions: readonly TableQueryCondition[];
}>;

/**
 * Eine Query-Bedingung ist entweder ein Filter oder eine verschachtelte Gruppe.
 */
export type TableQueryCondition =
  | TableQueryFilter
  | TableQueryGroup;

/**
 * Sortierrichtung für eine Table-Query.
 */
export type TableQueryOrderDirection =
  | "asc"
  | "desc";

/**
 * Beschreibt eine Sortierung nach einem fachlichen Attribute- oder Alias-Namen.
 *
 * direction ist absichtlich verpflichtend, damit portable Queries unabhängig
 * vom konkreten Executor dieselbe Sortiersemantik besitzen.
 */
export type TableQueryOrder = Readonly<{
  attribute: string;
  direction: TableQueryOrderDirection;
}>;

/**
 * Unterstützte Aggregationsfunktionen für portable Table-Queries.
 */
export type TableQueryAggregationFunction =
  | "sum"
  | "avg"
  | "count"
  | "min"
  | "max";

type TableQueryValueAggregation = Readonly<{
  function: Exclude<TableQueryAggregationFunction, "count">;
  attribute: string;
  as: string;
}>;

type TableQueryCountAggregation = Readonly<{
  function: "count";
  attribute?: string;
  as: string;
}>;

/**
 * Beschreibt eine Aggregation. count darf ohne Attribute die Ergebnis-Rows
 * zählen; alle wertbasierten Aggregationen benötigen ein Attribute.
 */
export type TableQueryAggregation =
  | TableQueryValueAggregation
  | TableQueryCountAggregation;
