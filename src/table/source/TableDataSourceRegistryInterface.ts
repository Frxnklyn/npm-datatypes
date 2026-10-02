import type { TableDataSourceInterface } from "./TableDataSourceInterface.js";

/**
 * Registry für logisch benannte Table-DataSources.
 *
 * Consumer können darüber einen source-Namen aus einem
 * TableQueryRequestInterface auf eine kontrolliert registrierte DataSource
 * auflösen.
 */
export interface TableDataSourceRegistryInterface {
  getDataSources(): readonly TableDataSourceInterface[];
  getDataSource(name: string): TableDataSourceInterface | undefined;
  addDataSource(dataSource: TableDataSourceInterface): this;
  removeDataSource(name: string): this;
}
