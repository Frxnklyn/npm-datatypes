import type { CommonDataTypeInterface } from "../common/index.js";
import type { TableCellValue, TableRecord, TableRow } from "./TableTypes.js";

export interface TableDataTypeInterface extends CommonDataTypeInterface<TableRow[]> {
  getHeaders(): string[];
  setHeaders(headers: string[]): this;
  hasHeaders(): boolean;

  getRows(): TableRow[];
  setRows(rows: TableRow[]): this;
  addRow(row: TableRow | TableRecord): this;
  addRows(rows: Array<TableRow | TableRecord>): this;
  getRow(index: number): TableRow | undefined;
  updateRow(index: number, row: TableRow | TableRecord): this;
  removeRow(index: number): this;

  getCell(rowIndex: number, column: number | string): TableCellValue | undefined;
  setCell(rowIndex: number, column: number | string, value: TableCellValue): this;

  toRecords(): TableRecord[];
}
