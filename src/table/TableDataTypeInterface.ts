import type { AttributeInterface } from "./AttributeInterface.js";
import type { ColumnDataTypeInterface } from "./ColumnDataTypeInterface.js";
import type { RelationInterface } from "./RelationInterface.js";
import type { RowDataTypeInterface } from "./RowDataTypeInterface.js";
import type { TableCellValue } from "./TableTypes.js";
import type {
  FilterComparator,
  FilterInterface,
} from "./filter/index.js";

export interface TableDataTypeInterface {
  /**
   * Gibt den Namen dieser Table zurück.
   *
   * Ist für die Table kein Name definiert, wird undefined zurückgegeben.
   */
  getName(): string | undefined;

  /**
   * Gibt alle sichtbaren Column-Headers in Tabellenreihenfolge zurück.
   *
   * Der Header an Position i gehört zu getColumns()[i], getAttributes()[i]
   * und zu dem Wert an Position i in jeder Row.
   */
  getHeaders(): readonly string[];

  /**
   * Gibt die fachlichen Attribute aller Columns in Tabellenreihenfolge zurück.
   *
   * Das Attribute an Position i beschreibt getColumns()[i] und den Header an
   * derselben Position in getHeaders().
   */
  getAttributes(): readonly AttributeInterface[];

  /**
   * Gibt alle aktuell geladenen Rows in Tabellenreihenfolge zurück.
   *
   * Diese Funktion führt keinen externen Read aus. Neue Daten werden zuvor
   * asynchron über dataRead() geladen.
   */
  getRows(): readonly RowDataTypeInterface[];

  /**
   * Gibt eine aktuell geladene Row anhand ihres nullbasierten Index zurück.
   *
   * Diese Funktion führt keinen externen Read aus. Existiert die Row im
   * aktuellen Zustand nicht, wird undefined zurückgegeben.
   */
  getRow(index: number): RowDataTypeInterface | undefined;

  /**
   * Fügt dem aktuellen Tabellenzustand eine neue Row hinzu.
   *
   * Es kann ein Array von Cell-Werten in Column-Reihenfolge oder eine eigene
   * RowDataTypeInterface-Implementierung übergeben werden. Ein Werte-Array wird
   * von der konkreten Table-Implementierung in eine Row überführt. Die Methode
   * führt weder einen externen Read noch einen Save aus.
   */
  addRow(
    row: readonly TableCellValue[] | RowDataTypeInterface,
  ): this;

  /**
   * Gibt alle Columns dieser Table in Tabellenreihenfolge zurück.
   *
   * Die Column an Position i gehört zu getHeaders()[i] und
   * getAttributes()[i]. Ihre Werte sind die vertikale Sicht auf getRows().
   */
  getColumns(): readonly ColumnDataTypeInterface[];

  /**
   * Gibt eine Column anhand ihres nullbasierten Index zurück.
   *
   * Existiert die Column nicht, wird undefined zurückgegeben. Für jeden
   * gültigen Row-Index muss ihr Wert fachlich getRow(rowIndex)?.getValue(index)
   * entsprechen.
   */
  getColumn(index: number): ColumnDataTypeInterface | undefined;

  /**
   * Gibt eine Column anhand ihres sichtbaren Headers zurück.
   *
   * Existiert kein entsprechender Header, wird undefined zurückgegeben.
   */
  getColumn(header: string): ColumnDataTypeInterface | undefined;

  /**
   * Gibt alle für diese Table definierten Relations zurück.
   *
   * Die Relations sind reine Metadaten und werden durch diesen Zugriff weder
   * aufgelöst noch geladen.
   */
  getRelations(): readonly RelationInterface[];

  /**
   * Fügt den Metadaten dieser Table eine Relation hinzu.
   *
   * Die Relation wird nicht automatisch aufgelöst und löst keinen Read aus.
   */
  addRelation(relation: RelationInterface): this;

  /**
   * Ersetzt alle Relations dieser Table durch die übergebene Liste.
   *
   * Die Relations werden nicht automatisch aufgelöst und lösen keinen Read aus.
   */
  setRelations(relations: readonly RelationInterface[]): this;

  /**
   * Gibt alle aktuell gesetzten Filter zurück.
   *
   * Diese Filter werden beim nächsten Aufruf von dataRead() an die
   * konfigurierte Read-Strategie übergeben.
   */
  getFilters(): readonly FilterInterface[];

  /**
   * Fügt dem aktuellen Filterzustand einen Filter hinzu.
   *
   * Die Methode führt selbst keinen Read aus. Der ergänzte Filter wird beim
   * nächsten dataRead() berücksichtigt.
   */
  addFilter(filter: FilterInterface): this;

  /**
   * Ersetzt den vollständigen aktuellen Filterzustand.
   *
   * Die Methode führt selbst keinen Read aus. Die neuen Filter werden beim
   * nächsten dataRead() berücksichtigt.
   */
  setFilters(filters: readonly FilterInterface[]): this;

  /**
   * Entfernt alle aktuell gesetzten Filter.
   *
   * Die Methode führt selbst keinen Read aus. Der nächste dataRead()-Aufruf
   * erhält dadurch eine leere Filterliste.
   */
  clearFilters(): this;

  /**
   * Gibt den Comparator zurück, mit dem mehrere Filter beim nächsten
   * dataRead() miteinander verknüpft werden.
   *
   * "and" verlangt, dass alle Filterbedingungen erfüllt sind. Bei "or"
   * genügt eine erfüllte Filterbedingung. Bei weniger als zwei Filtern hat der
   * Comparator keine fachliche Auswirkung.
   */
  getComparator(): FilterComparator;

  /**
   * Setzt den Comparator für die Verknüpfung aller aktuell gesetzten Filter.
   *
   * "and" verknüpft die Bedingungen mit UND, "or" mit ODER. Die Methode führt
   * selbst keinen Read aus; der Comparator gilt beim nächsten dataRead().
   */
  setComparator(comparator: FilterComparator): this;

  /**
   * Liest die Daten dieser Table asynchron über ihre
   * DataReadInterface-Implementierung.
   *
   * Die aktuell gesetzten Filter werden an die Strategie übergeben. Nach
   * Abschluss repräsentieren getRows(), getRow(), getColumns() und getColumn()
   * den neu geladenen Zustand. Das Promise liefert diese Table zurück.
   */
  dataRead(): Promise<this>;

  /**
   * Speichert den aktuellen Row-Zustand dieser Table asynchron über die
   * zugehörige DataSaveInterface-Implementierung.
   *
   * Die geladenen und hinzugefügten Rows werden an die Strategie übergeben.
   * Das Promise liefert diese Table nach Abschluss des Saves zurück.
   */
  dataSave(): Promise<this>;
}
