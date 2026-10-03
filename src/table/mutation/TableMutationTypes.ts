import type { TableCellValue } from "../TableTypes.js";
import type { TableQueryCondition } from "../query/TableQueryTypes.js";

export type TableMutationValues = Readonly<Record<string, TableCellValue>>;

export type TableCreateMutation = Readonly<{
  operation: "create";
  values: TableMutationValues;
}>;

export type TableUpdateMutation = Readonly<{
  operation: "update";
  where: TableQueryCondition;
  values: TableMutationValues;
}>;

export type TableDeleteMutation = Readonly<{
  operation: "delete";
  where: TableQueryCondition;
}>;

/**
 * Portable, deklarative Schreiboperation.
 *
 * Update und Delete benötigen absichtlich immer eine where-Bedingung. Ein
 * ungefiltertes Update oder Delete ist damit in diesem gemeinsamen Contract
 * nicht darstellbar.
 */
export type TableMutation =
  | TableCreateMutation
  | TableUpdateMutation
  | TableDeleteMutation;
