import type {
  TableCellValue,
  TableDataTypeInterface,
} from "../table/index.js";
import type { CellDataTypeInterface } from "./CellDataTypeInterface.js";
import type { ExcelDataTypeInterface } from "./ExcelDataTypeInterface.js";

export interface ExcelSheetDataTypeInterface {
  /**
   * Gibt das Excel-Workbook zurück, zu dem diese Sheet-Referenz gehört.
   *
   * Die Methode arbeitet mit dem aktuellen Objektzustand und löst keinen
   * externen Read aus.
   */
  getExcel(): ExcelDataTypeInterface;

  /**
   * Gibt den Namen dieses Sheets zurück, sofern er bereits bekannt ist.
   *
   * Bei einer namensbasierten Referenz ist der Name bereits vor dataRead()
   * bekannt. Bei einer indexbasierten Referenz kann er bis zur erfolgreichen
   * Auflösung unbekannt sein; dann wird undefined zurückgegeben. Die Methode
   * löst selbst keinen externen Read aus.
   */
  getName(): string | undefined;

  /**
   * Gibt den nullbasierten Index dieses Sheets innerhalb des Workbooks zurück.
   *
   * Bei einer noch nicht gelesenen, namensbasierten Sheet-Referenz kann der
   * tatsächliche Workbook-Index unbekannt sein; dann wird undefined
   * zurückgegeben. Nach erfolgreichem dataRead() kann der aufgelöste Index
   * bereitstehen. Die Methode löst selbst keinen externen Read aus.
   */
  getIndex(): number | undefined;

  /**
   * Gibt alle aktuell geladenen oder bereits bekannten Cells dieses Sheets in
   * Row-major order zurück.
   *
   * Die Cells sind zuerst nach ihrem nullbasierten Row-Index und innerhalb
   * jeder Row nach ihrem nullbasierten Column-Index geordnet, beispielsweise
   * A1, B1, C1, A2, B2, C2. Die Methode erzeugt keine beliebigen Cell-Referenzen
   * und löst keinen externen Read aus. Externe Sheet-Daten werden zuvor über
   * dataRead() geladen.
   */
  getCells(): readonly CellDataTypeInterface[];

  /**
   * Gibt eine lazy Cell-Referenz anhand ihres nullbasierten Row- und
   * Column-Index zurück.
   *
   * Die Position (0, 0) entspricht A1. Eine Excel-Position existiert
   * konzeptionell auch dann, wenn sie leer oder noch nicht geladen ist. Deshalb
   * wird immer eine Cell-Referenz und niemals undefined zurückgegeben. Die
   * Methode löst keinen externen Read aus; eine leere Cell repräsentiert ihren
   * Wert über null.
   */
  getCell(
    rowIndex: number,
    columnIndex: number,
  ): CellDataTypeInterface;

  /**
   * Gibt eine lazy Cell-Referenz anhand ihrer Excel-A1-Adresse zurück.
   *
   * Gültige Adressen sind beispielsweise A1, B4 oder AA20. Eine leere oder noch
   * nicht geladene Position wird nicht durch undefined repräsentiert. Deshalb
   * gibt die Methode immer eine Cell-Referenz zurück und löst keinen externen
   * Read aus.
   */
  getCell(address: string): CellDataTypeInterface;

  /**
   * Setzt den Wert einer Cell anhand ihres nullbasierten Row- und Column-Index.
   *
   * Die Position (0, 0) entspricht A1. Die konkrete Implementierung erzeugt
   * oder aktualisiert den Cell-Zustand. Die Methode führt keinen externen Save
   * aus; gespeichert wird über dataSave() dieses Sheets oder des Workbooks.
   */
  setCell(
    rowIndex: number,
    columnIndex: number,
    value: TableCellValue,
  ): this;

  /**
   * Setzt den Wert einer Cell anhand ihrer Excel-A1-Adresse.
   *
   * Die konkrete Implementierung erzeugt oder aktualisiert den Cell-Zustand.
   * Die Methode führt keinen externen Save aus; gespeichert wird über
   * dataSave() dieses Sheets oder des Workbooks.
   */
  setCell(
    address: string,
    value: TableCellValue,
  ): this;

  /**
   * Setzt die Formel einer Cell anhand ihres nullbasierten Row- und
   * Column-Index.
   *
   * Die Position (0, 0) entspricht A1. Die Formel wird getrennt vom aktuellen
   * Ergebniswert der Cell gespeichert und ist daher nicht als normaler
   * String-Cell-Wert zu interpretieren. Die konkrete Implementierung erzeugt
   * oder aktualisiert den Cell-Zustand. Die Methode führt keinen externen Save
   * aus; gespeichert wird über dataSave() dieses Sheets oder des Workbooks.
   */
  setFormula(
    rowIndex: number,
    columnIndex: number,
    formula: string,
  ): this;

  /**
   * Setzt die Formel einer Cell anhand ihrer Excel-A1-Adresse.
   *
   * Die Formel wird getrennt vom aktuellen Ergebniswert der Cell gespeichert
   * und ist daher nicht als normaler String-Cell-Wert zu interpretieren. Die
   * konkrete Implementierung erzeugt oder aktualisiert den Cell-Zustand. Die
   * Methode führt keinen externen Save aus; gespeichert wird über dataSave()
   * dieses Sheets oder des Workbooks.
   */
  setFormula(
    address: string,
    formula: string,
  ): this;

  /**
   * Gibt eine allgemeine Table-Sicht auf dieses Sheet zurück.
   *
   * Das Sheet selbst bleibt ein ExcelSheetDataTypeInterface und erweitert
   * TableDataTypeInterface nicht. Die Table ist keine unabhängige Kopie oder
   * Transformation, sondern eine alternative Sicht auf dieselbe fachliche
   * Sheet-Ressource. Die Methode führt keinen externen Read und keine
   * Existenzprüfung durch. Wie Datenbereich, Headers, Attributes, Rows und
   * Columns abgeleitet werden, entscheidet die konkrete Excel-Implementierung.
   * Filter werden ausschließlich an dieser Table gesetzt und bei deren
   * dataRead() berücksichtigt.
   */
  asTable(): TableDataTypeInterface;

  /**
   * Liest dieses konkrete Sheet asynchron über die konkrete
   * Excel-Implementierung.
   *
   * Erst hier werden Existenz und Lesbarkeit der durch diese Referenz
   * bezeichneten externen Sheet-Ressource geprüft. Ist das Sheet nicht
   * vorhanden oder nicht lesbar, darf dieser Read fehlschlagen. Nach
   * erfolgreichem Abschluss repräsentieren getCells(), getCell() und getIndex()
   * den geladenen Sheet-Zustand. Das Promise liefert dieses Sheet zurück.
   */
  dataRead(): Promise<this>;

  /**
   * Speichert den aktuellen Zustand dieses konkreten Sheets asynchron über die
   * konkrete Excel-Implementierung.
   *
   * Damit kann nur dieses Sheet gespeichert werden, sofern die zugrunde
   * liegende Persistenzform dies unterstützt. Der Contract schreibt keine
   * konkrete Persistenzstrategie vor. Das Promise liefert dieses Sheet zurück.
   */
  dataSave(): Promise<this>;
}
