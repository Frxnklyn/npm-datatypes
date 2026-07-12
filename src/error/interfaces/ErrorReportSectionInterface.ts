/**
 * A structured section that can be appended to generated error reports.
 */
export interface ErrorReportSectionInterface {
  title: string;
  values: Record<string, unknown>;
}
