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
 * Beschreibt eine Sortierung nach einem fachlichen Attribute-Namen.
 */
export type TableQueryOrder = Readonly<{
  attribute: string;
  direction?: TableQueryOrderDirection;
}>;
