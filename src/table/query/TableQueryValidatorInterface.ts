import type { TableSchemaInterface } from "../schema/index.js";
import type { TableQueryInterface } from "./TableQueryInterface.js";

export type TableQueryValidationIssue = Readonly<{
  code: string;
  message: string;
  path?: string;
}>;

/**
 * Validiert eine portable Query gegen ein fachliches Table-Schema.
 *
 * Eine leere Ergebnisliste bedeutet, dass der Validator keine Probleme
 * gefunden hat. Die konkrete Validierungsstrategie bleibt dem Consumer
 * überlassen.
 */
export interface TableQueryValidatorInterface {
  validate(
    schema: TableSchemaInterface,
    query: TableQueryInterface,
  ): readonly TableQueryValidationIssue[];
}
