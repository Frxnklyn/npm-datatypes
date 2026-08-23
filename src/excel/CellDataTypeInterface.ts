import type {
  AttributeType,
  TableCellValue,
} from "../table/TableTypes.js";
import type { ExcelSheetDataTypeInterface } from "./ExcelSheetDataTypeInterface.js";

export interface CellDataTypeInterface {
  /**
   * Gibt das Sheet zurück, zu dem diese Cell gehört.
   *
   * Über das Sheet kann zum umgebenden Excel-Workbook oder zu dessen
   * tabellarischer Sicht navigiert werden. Die Methode liest nur den aktuellen
   * Zustand und löst keinen externen Read aus.
   */
  getSheet(): ExcelSheetDataTypeInterface;

  /**
   * Gibt den nullbasierten Row-Index dieser Cell innerhalb ihres Sheets zurück.
   *
   * Beispielsweise besitzt die Cell B4 den Row-Index 3. Die Methode löst keinen
   * externen Read aus.
   */
  getRowIndex(): number;

  /**
   * Gibt den nullbasierten Column-Index dieser Cell innerhalb ihres Sheets
   * zurück.
   *
   * Beispielsweise besitzt die Cell B4 den Column-Index 1. Die Methode löst
   * keinen externen Read aus.
   */
  getColumnIndex(): number;

  /**
   * Gibt die Adresse dieser Cell in Excel-A1-Notation zurück.
   *
   * Die Adresse muss mit getRowIndex() und getColumnIndex() konsistent sein;
   * beispielsweise entspricht B4 den Indizes 3 und 1. Die Methode löst keinen
   * externen Read aus.
   */
  getAddress(): string;

  /**
   * Gibt zurück, ob der fachliche Zustand dieser Cell bereits aufgelöst wurde.
   *
   * Eine über getCell() erzeugte lazy Referenz ist zunächst möglicherweise
   * nicht aufgelöst. Nach erfolgreichem dataRead() des Sheets kann sie
   * aufgelöst sein. Solange false zurückgegeben wird, sind Wert, Datentyp,
   * Formel und Merge-Status noch nicht verlässlich bekannt. Die Methode löst
   * selbst keinen externen Read aus.
   */
  isResolved(): boolean;

  /**
   * Gibt zurück, ob diese Cell Teil eines verbundenen Cell-Bereichs ist.
   *
   * Der Merge-Status ist fachlich erst nach erfolgreicher Auflösung der Cell
   * verlässlich; dieser Zustand kann über isResolved() geprüft werden. Der
   * Merge-Status verändert die normale Cell-API nicht. getValue(), hasFormula(),
   * getFormula(), getType() und die Positionsmethoden bleiben auch für gemergte
   * Cells normal verwendbar. Die konkrete Implementierung entscheidet intern,
   * wie der Merge-Bereich repräsentiert wird. Die Methode liest nur den
   * aktuellen Zustand und löst keinen externen Read aus.
   */
  isMerged(): boolean;

  /**
   * Gibt den aktuell repräsentierten Wert dieser Cell zurück.
   *
   * Ist die Cell noch nicht aufgelöst, wird undefined zurückgegeben. Nach der
   * Auflösung bezeichnet null eine tatsächlich leere Cell. Bei einer Cell mit
   * Formel ist der Wert das aktuelle Ergebnis und nicht die Formel selbst. Auch
   * bei einer gemergten Cell bleibt dies der normale Zugriff auf ihren logisch
   * repräsentierten Wert. Verwendet wird TableCellValue aus dem allgemeinen
   * Table-Bereich. Die Methode löst keinen externen Read aus.
   */
  getValue(): TableCellValue | undefined;

  /**
   * Gibt zurück, ob diese Cell eine Formel besitzt.
   *
   * Diese Information ist unabhängig vom fachlichen Datentyp und vom
   * Merge-Status der Cell. Eine Cell kann beispielsweise hasFormula() === true
   * und gleichzeitig getType() === "number" liefern. Das Ergebnis ist erst bei
   * isResolved() === true fachlich verlässlich. Die Methode liest nur den
   * aktuellen Zustand und löst keinen externen Read aus.
   */
  hasFormula(): boolean;

  /**
   * Gibt die Formel dieser Cell getrennt von ihrem aktuellen Wert zurück.
   *
   * Formeln verwenden beispielsweise die Form "=SUM(B2:B10)", "=A1" oder
   * "=A1*2". Eine direkte Cell-Referenz ist ebenfalls eine normale Formel.
   * Besitzt die Cell keine Formel, wird undefined zurückgegeben. Der Ausdruck
   * bleibt vom Ergebniswert und fachlichen Datentyp getrennt. undefined kann
   * vor der Auflösung einen unbekannten Formelzustand und nach der Auflösung das
   * Fehlen einer Formel bedeuten; isResolved() unterscheidet diese Zustände. Die
   * Methode löst keinen externen Read aus.
   */
  getFormula(): string | undefined;

  /**
   * Gibt die Excel-semantische Art dieser Cell zurück.
   *
   * Verwendet wird AttributeType aus dem allgemeinen Table-Bereich. Eine Formel
   * ist kein eigener Datentyp: Eine Cell mit Formel und numerischem Ergebnis
   * liefert beispielsweise "number". Ob eine Formel existiert, wird separat
   * über hasFormula() beschrieben. Die Methode liest nur den aktuellen Zustand
   * und löst keinen externen Read aus. Ist die Cell noch nicht aufgelöst und
   * der fachliche Typ daher unbekannt, wird undefined zurückgegeben.
   */
  getType(): AttributeType | undefined;
}
