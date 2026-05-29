import type { CommonDataTypeInterface } from "../common/index.js";
import type { TableCellValue, TableRecord, TableRow } from "./TableTypes.js";

export interface TableDataTypeInterface extends CommonDataTypeInterface<string> {
  getHeaders(): string[];
  setHeaders(headers: string[]): this;
  hasHeaders(): boolean;

  getRowsRaw(): TableRow[];
  getRows(): TableRecord[];
  setRows(rows: TableRow[]): this;
  addRowArray(row: TableRow): this;
  addRowObject(row: TableRecord, autoExtendHeaders?: boolean): this;
  addRow(row: TableRow | TableRecord): this;
  addRows(rows: Array<TableRow | TableRecord>): this;
  getRow(index: number): TableRow | undefined;
  updateRow(index: number, row: TableRow | TableRecord): this;
  removeRow(index: number): this;
  clearRows(): this;

  getCell(rowIndex: number, column: number | string): TableCellValue | undefined;
  setCell(rowIndex: number, column: number | string, value: TableCellValue): this;

  toRecords(): TableRecord[];
}
