import type { TableDataTypeInterface } from "../table/index.js";
import type { ExcelSheetDataTypeInterface } from "./ExcelSheetDataTypeInterface.js";

export interface ExcelDataTypeInterface {
  /**
   * Gibt den fachlichen Namen dieses Workbooks zurück.
   *
   * Der Contract erzwingt weder einen Dateipfad noch eine Dateiendung. Ist
   * kein Name definiert, wird undefined zurückgegeben. Die Methode arbeitet
   * ausschließlich mit dem aktuellen Objektzustand und löst keinen externen
   * Read aus.
   */
  getName(): string | undefined;

  /**
   * Gibt alle aktuell geladenen oder bereits bekannten Sheets in
   * Workbook-Reihenfolge zurück.
   *
   * Im Gegensatz zu getSheet() erzeugt diese Methode keine Referenzen auf
   * beliebige, noch nicht bekannte Sheets. Sie löst keinen externen Read aus.
   * Der vollständige externe Workbook-Zustand wird zuvor über dataRead()
   * geladen.
   */
  getSheets(): readonly ExcelSheetDataTypeInterface[];

  /**
   * Gibt eine lazy Referenz auf das Sheet mit dem angegebenen Namen zurück.
   *
   * Die Methode prüft nicht, ob das Sheet in der externen Datenquelle
   * tatsächlich existiert, und führt keinen externen Read aus. Deshalb wird
   * immer eine Sheet-Referenz und niemals undefined zurückgegeben. Auflösung,
   * Existenzprüfung und Laden erfolgen erst über dataRead() dieser Referenz;
   * dort darf ein nicht vorhandenes oder nicht lesbares Sheet fehlschlagen.
   */
  getSheet(name: string): ExcelSheetDataTypeInterface;

  /**
   * Gibt eine lazy Referenz auf das Sheet mit dem angegebenen nullbasierten
   * Workbook-Index zurück.
   *
   * Die Methode prüft nicht, ob an dieser Position extern ein Sheet existiert,
   * und führt keinen externen Read aus. Deshalb wird immer eine Sheet-Referenz
   * zurückgegeben. Die tatsächliche Auflösung erfolgt erst bei dataRead(); dort
   * darf ein nicht vorhandenes oder nicht lesbares Sheet fehlschlagen.
   */
  getSheet(index: number): ExcelSheetDataTypeInterface;

  /**
   * Gibt die allgemeine tabellarische Sicht auf das Sheet mit dem angegebenen
   * Namen zurück.
   *
   * Dies ist der Convenience-Zugriff für
   * excel.getSheet(sheetName).asTable(). Beide Zugriffe repräsentieren fachlich
   * dieselbe Sheet-Ressource; Objektidentität und Caching bleiben der konkreten
   * Implementierung überlassen. Die Methode führt keinen externen Read und
   * keine Existenzprüfung durch und gibt daher immer eine Table-Sicht zurück.
   * Die tatsächliche Auflösung darf erst bei dataRead() dieser Table
   * fehlschlagen.
   */
  getTable(sheetName: string): TableDataTypeInterface;

  /**
   * Fügt dem aktuellen Workbook-Zustand ein Sheet hinzu.
   *
   * Bei einem String entscheidet die konkrete Implementierung, wie die
   * entsprechende ExcelSheetDataTypeInterface-Instanz erzeugt wird. Alternativ
   * kann direkt eine eigene Implementierung übergeben werden. Die Methode führt
   * weder einen externen Read noch einen Save aus.
   */
  addSheet(
    sheet: string | ExcelSheetDataTypeInterface,
  ): this;

  /**
   * Entfernt ein Sheet anhand seines Namens oder seiner konkreten Instanz aus
   * dem aktuellen Workbook-Zustand.
   *
   * Die Methode führt keinen externen Save aus. Der veränderte Zustand wird
   * erst durch einen späteren Aufruf von dataSave() gespeichert.
   */
  removeSheet(
    sheet: string | ExcelSheetDataTypeInterface,
  ): this;

  /**
   * Liest den vollständigen Workbook-Zustand asynchron über die konkrete
   * Excel-Implementierung.
   *
   * Nach erfolgreichem Abschluss müssen getSheets() und bereits erzeugte
   * Sheet-Referenzen den geladenen Zustand repräsentieren können. Das Promise
   * liefert dieses Workbook zurück. Der Contract schreibt keine öffentliche
   * Reader-Strategie, Datei oder andere interne Lesetechnik vor.
   */
  dataRead(): Promise<this>;

  /**
   * Speichert den aktuellen Workbook-Zustand asynchron über die konkrete
   * Excel-Implementierung.
   *
   * Dazu gehören insbesondere Änderungen an Sheets und deren Cell-Zuständen.
   * Das Promise liefert dieses Workbook nach Abschluss zurück. Der Contract
   * schreibt keine konkrete Persistenzstrategie vor.
   */
  dataSave(): Promise<this>;
}
