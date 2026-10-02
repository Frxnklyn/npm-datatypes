# @frxnklyn/datatypes

Reine TypeScript-Interfaces und Typen fuer wiederverwendbare Inhalts-DataTypes.

Dieses Package enthaelt keine Datei-Logik, keine Update-Logik und keine Editor-Zustaende. Es beschreibt nur, welche Daten ein DataType verwaltet und welche Inhaltsfunktionen eine Implementierung anbieten soll.

## Ordnerstruktur

```text
src/
  common/
    CommonDataTypeInterface.ts
    index.ts
  json/
    JsonTypes.ts
    JsonArrayInterface.ts
    JsonDataTypeInterface.ts
    KeyDataTypeInterface.ts
    index.ts
  text/
    TextDataTypeInterface.ts
    index.ts
  table/
    TableTypes.ts
    TableDataTypeInterface.ts
    RowDataTypeInterface.ts
    ColumnDataTypeInterface.ts
    AttributeInterface.ts
    RelationInterface.ts
    DataReadInterface.ts
    DataSaveInterface.ts
    filter/
      FilterTypes.ts
      FilterInterface.ts
      index.ts
    query/
      TableQueryTypes.ts
      TableQueryInterface.ts
      TableQueryRequestInterface.ts
      TableQueryExecutorInterface.ts
      TableQueryValidatorInterface.ts
      index.ts
    schema/
      AttributeSchemaInterface.ts
      RelationSchemaInterface.ts
      TableSchemaInterface.ts
      TableSchemaRegistryInterface.ts
      index.ts
    mutation/
      TableMutationTypes.ts
      index.ts
    source/
      TableDataSourceTypes.ts
      TableDataSourceInterface.ts
      TableDataSourceRegistryInterface.ts
      index.ts
    index.ts
  excel/
    ExcelDataTypeInterface.ts
    ExcelSheetDataTypeInterface.ts
    CellDataTypeInterface.ts
    index.ts
  code/
    CodeTypes.ts
    CodeDataTypeInterface.ts
    index.ts
  html/
    HtmlTypes.ts
    HtmlDataTypeInterface.ts
    HtmlEditorDataTypeInterface.ts
    attributes/
      HTMLElementAttributeInterface.ts
      HTMLElementSpecificAttributeInterfaces.ts
      HTMLElementAttributeMapInterface.ts
      HTMLElementTagName.ts
      HTMLElementDataTypeInterface.ts
      HTMLElementEditorDataTypeInterface.ts
      HTMLElementSpecificDataTypeInterfaces.ts
      HTMLContentDataTypeInterfaces.ts
      HTMLButtonDataTypeInterface.ts
      HTMLButtonEditorDataTypeInterface.ts
      HTMLDivDataTypeInterface.ts
      HTMLDivEditorDataTypeInterface.ts
      index.ts
    body/
      HTMLBodyDataTypeInterface.ts
      HTMLBodyEditorDataTypeInterface.ts
      index.ts
    head/
      HTMLIconAttributeInterface.ts
      HTMLIconDataTypeInterface.ts
      HTMLHeadContentDataTypeInterfaces.ts
      HTMLHeadEditorOptionsInterfaces.ts
      HTMLHeadDataTypeInterface.ts
      HTMLHeadEditorDataTypeInterface.ts
      index.ts
    script/
      HTMLScriptLinkDataTypeInterface.ts
      HTMLScriptLinkEditorDataTypeInterface.ts
      HTMLScriptDataTypeInterface.ts
      HTMLScriptEditorDataTypeInterface.ts
      index.ts
    style/
      HTMLStyleLinkDataTypeInterface.ts
      HTMLStyleLinkEditorDataTypeInterface.ts
      HTMLStyleDataTypeInterface.ts
      HTMLStyleEditorDataTypeInterface.ts
      index.ts
    index.ts
  error/
    ErrorDataTypeInterface.ts
    classes/
      AbstractError.ts
    index.ts
  index.ts
```

## Common

`CommonDataTypeInterface<TContent>` enthaelt die Methoden, die jeder DataType anbietet.

Wichtige Funktionen:

- `getContent()`
- `getContentString()`
- `changeContent(newContent)`

Die allgemeinen Inhalts-DataTypes erweitern dieses Common-Interface mit ihrem
jeweiligen Inhaltstyp. Die HTML-Interfaces trennen dagegen bewusst zwischen
lesendem Zugriff und bearbeitenden Editor-Interfaces.

## JSON

`JsonDataTypeInterface` arbeitet mit `JsonValue`.

Wichtige Funktionen:

- `addKey(newKey)`
- `getKey(key)`
- `requireKey(key)`
- `createKey(newKey, content)`
- `removeKey(key)`
- `push(data)`
- `changeToArray()`
- `changeToJson()`
- `changeContent(newContent)`
- `getKeys()`
- `getAllKeys()`
- `keyExist(key)`
- `isJson()`
- `isArray()`

`KeyDataTypeInterface` ist ebenfalls ein JSON-DataType und arbeitet auch mit `JsonValue`.

Zusatzfunktionen:

- `getName()`
- `getValue()`
- `delete()`

`JsonArrayInterface` arbeitet mit `JsonArray` und kapselt die Array-spezifischen Funktionen.

Wichtige Funktionen:

- `add(data)`
- `push(data)`
- `addJson(content)`
- `addArray(content)`
- `changeToJson()`
- `get(index)`
- `set(index, value)`
- `remove(index)`
- `getLength()`
- `isArray()`

## Text

`TextDataTypeInterface` arbeitet mit `string`.

Wichtige Funktionen:

- `changeContent(newContent)`
- `append(text)`
- `prepend(text)`
- `replace(searchValue, replaceValue)`
- `clear()`
- `getLines()`
- `addLine(line)`
- `insertLine(index, line)`
- `removeLine(index)`
- `replaceLine(index, line)`

## Tabelle

`TableDataTypeInterface` beschreibt den aktuell geladenen Tabellenzustand. Eine
Table ist kein String-DataType und erweitert `CommonDataTypeInterface` nicht.
Sie verbindet Headers, Attributes, Rows, Columns, Relations und Filter mit
austauschbaren Read- und Save-Strategien.

Wichtige Typen:

- `TableCellValue`
- `AttributeType`
- `RelationCardinality`
- `RowDataTypeInterface`
- `ColumnDataTypeInterface`
- `AttributeInterface`
- `RelationInterface`
- `FilterInterface`
- `FilterComparator`
- `DataReadInterface`
- `DataSaveInterface`
- `TableQueryFilter`
- `TableQueryGroup`
- `TableQueryCondition`
- `TableQueryOrder`
- `TableQueryAggregation`
- `TableQueryInterface`
- `TableQueryRequestInterface`
- `TableQueryExecutorInterface`
- `TableQueryValidatorInterface`
- `TableSchemaInterface`
- `AttributeSchemaInterface`
- `RelationSchemaInterface`
- `TableSchemaRegistryInterface`
- `TableMutation`
- `TableDataSourceInterface`
- `TableDataSourceRegistryInterface`
- `TableDataSourceCapability`

Wichtige Funktionen:

- `getName()`
- `getHeaders()`
- `getAttributes()`
- `getRows()`
- `getRow(index)`
- `addRow(row)`
- `getColumns()`
- `getColumn(indexOrHeader)`
- `getRelations()`
- `addRelation(relation)`
- `setRelations(relations)`
- `getFilters()`
- `addFilter(filter)`
- `setFilters(filters)`
- `clearFilters()`
- `getComparator()`
- `setComparator(comparator)`
- `dataRead()`
- `dataSave()`

Eine Row ist die horizontale Sicht auf die Daten. Ihre Headers und Werte sind
positionsgleich: `row.getHeaders()[i]` beschreibt immer
`row.getValues()[i]`. Deshalb kann ein Wert sowohl mit
`row.getValue(columnIndex)` als auch mit `row.getValue(header)` gelesen werden.

Eine Column ist die vertikale Sicht auf dieselben Daten. Die Tabellenstruktur
ist ebenfalls positionsgleich:

```text
table.getColumns()[i]
table.getHeaders()[i]
table.getAttributes()[i]
```

Diese drei Eintraege beschreiben dieselbe Column. Row- und Column-Zugriff
muessen fuer gueltige Indizes fachlich denselben Cell-Wert repraesentieren:

```ts
table
  .getRow(rowIndex)
  ?.getValue(columnIndex);

table
  .getColumn(columnIndex)
  ?.getValue(rowIndex);
```

`getRows()`, `getRow()`, `getColumns()` und `getColumn()` lesen nur den bereits
geladenen Zustand und fuehren kein externes I/O aus. Filter und ihr Comparator
werden vor dem Read gesetzt. `"and"` verlangt, dass alle Filter zutreffen;
bei `"or"` reicht ein zutreffender Filter. Erst `dataRead()` liest asynchron
mit diesem Filterzustand. `dataSave()` speichert den aktuellen Row-Zustand
asynchron. Wie die konkrete Table ihre
`DataReadInterface`- und `DataSaveInterface`-Strategien erhaelt, ist bewusst
nicht Teil von `TableDataTypeInterface`; eine Implementierung kann sie etwa
ueber ihren Constructor oder eine Factory erhalten.

Eine Relation besteht aus einem linken Attribute, einem rechten Attribute und
ihrer Kardinalitaet. `getCardinality()` beschreibt, wie die Rows der beiden
ueber die Attributes erreichbaren Tables zueinander stehen:

```text
oneToOne    Left 1 -> 1 Right
manyToOne   Left n -> 1 Right
oneToMany   Left 1 -> n Right
manyToMany  Left n -> n Right
```

Damit kann ein Consumer beispielsweise ableiten, ob auf der rechten Seite ein
einzelner Wert oder eine Liste zu erwarten ist. Die Metadaten fuehren selbst
keinen Join aus und laden keine verwandten Rows.

Mit `getLeftAttribute()` und `getRightAttribute()` sind beide Endpunkte direkt
als `AttributeInterface` erreichbar. Jedes Attribute kennt seine Table und
seinen nullbasierten Index. Dadurch ist die zugehoerige Column ohne zusaetzliche
Relation-Metadaten erreichbar:

```ts
const leftAttribute = relation.getLeftAttribute();
const leftTable = leftAttribute.getTable();
const leftColumn = leftTable.getColumn(leftAttribute.getIndex());

const rightAttribute = relation.getRightAttribute();
const rightTable = rightAttribute.getTable();
const rightColumn = rightTable.getColumn(rightAttribute.getIndex());
```

`RowDataTypeInterface`, `ColumnDataTypeInterface` und `AttributeInterface`
stellen ebenfalls jeweils `getTable()` bereit. Rows und Columns enthalten die
Werte; ein Attribute bleibt die fachliche Schema-Beschreibung und fuehrt selbst
keinen Read aus.

```ts
table.clearFilters();
table.addFilter(filter);
table.setComparator("or");

await table.dataRead();

const row = table.getRow(0);
const column = table.getColumn("name");

table.addRow([1, "Brooklyn", 23]);

await table.dataSave();
```

### Table Queries

`TableQueryInterface` beschreibt einen standardisierten, datenquellenunabhaengigen
Query-Vertrag fuer Tabellen. Eine Query kann rekursiv verschachtelte Filter,
Projektionen, Sortierungen, Gruppierungen, Aggregationen sowie `offset` und
`limit` enthalten. Die Query beschreibt nur das gewuenschte Ergebnis; wie sie
ausgefuehrt wird, bleibt der konkreten Implementierung ueberlassen.

`TableQueryExecutorInterface` bildet den Standardprozess `Table + Query -> Table`
ab. `execute()` darf die Eingabe-Table nicht veraendern und liefert den durch die
Query erzeugten Tabellenzustand als eigene `TableDataTypeInterface` zurueck.

```ts
const query: TableQueryInterface = {
  where: {
    comparator: "and",
    conditions: [
      {
        attribute: "season",
        operator: "equals",
        value: "2032/33",
      },
      {
        comparator: "or",
        conditions: [
          {
            attribute: "club",
            operator: "equals",
            value: "Barcelona",
          },
          {
            attribute: "club",
            operator: "equals",
            value: "Real Madrid",
          },
        ],
      },
    ],
  },
  select: ["season", "club"],
  groupBy: ["season", "club"],
  aggregations: [
    {
      function: "sum",
      attribute: "goals",
      as: "totalGoals",
    },
    {
      function: "count",
      as: "rows",
    },
  ],
  orderBy: [
    {
      attribute: "totalGoals",
      direction: "desc",
    },
  ],
  offset: 0,
  limit: 20,
};

const result = await executor.execute(table, query);
```

Der Contract definiert bewusst keine konkrete Datenquelle, Persistenzform oder
Ausfuehrungsstrategie. Bei `TableQueryOrder` ist `direction` absichtlich
pflichtig, damit portable Queries auf allen Executoren dieselbe Sortiersemantik
haben.

### Schema, DataSources und KI-sichere Requests

Die Schema-Contracts trennen die fachliche Beschreibung einer Tabelle von ihrem
aktuell geladenen Zustand. `TableSchemaInterface` beschreibt Name, Attribute,
Primary-Key-Attribute und Relations. `TableDataTypeInterface` bleibt weiterhin
der konkrete geladene Tabellenzustand.

`TableQueryRequestInterface` bindet eine portable Query explizit an eine
registrierte DataSource und einen fachlichen Tabellennamen:

```ts
const request: TableQueryRequestInterface = {
  source: "football-manager",
  table: "PlayerSeason",
  query: {
    where: {
      attribute: "playerId",
      operator: "equals",
      value: 42,
    },
    groupBy: ["season"],
    aggregations: [
      {
        function: "sum",
        attribute: "goals",
        as: "goals",
      },
    ],
    orderBy: [
      {
        attribute: "season",
        direction: "asc",
      },
    ],
  },
};
```

Eine KI muss dadurch weder Connection Strings noch SQL erzeugen. Sie kann nur
fachliche Namen und die vom Contract erlaubten Operationen beschreiben. Ein
Consumer loest `source` ueber `TableDataSourceRegistryInterface` auf, prueft
die Query gegen das Schema und uebersetzt sie anschliessend
datenquellenspezifisch. SQL-Adapter koennen dabei konsequent parametrisierte
Queries verwenden.

DataSources deklarieren ihre Faehigkeiten explizit, zum Beispiel `read`,
`filter`, `aggregate`, `create`, `update` oder `delete`. Schreibzugriffe
werden ueber `TableMutation` als deklarative Mutations beschrieben. Update und
Delete verlangen absichtlich immer eine `where`-Bedingung; ein unabsichtlicher
ungefilterter Schreibzugriff ist damit im gemeinsamen Contract nicht
darstellbar.

Die Rollen sind damit getrennt:

```text
TableSchema          = Welche fachlichen Tabellen, Attribute und Relations gibt es?
TableQueryRequest    = Welche DataSource und welche Daten werden angefordert?
TableDataSource      = Wie wird die Anfrage technisch ausgefuehrt?
TableDataType        = Welcher Tabellenzustand kam als Ergebnis zurueck?
```

## Excel

Die Excel-Domain beschreibt Workbooks, Sheets und Cells unabhängig von einer
konkreten Excel-Datei oder Library. Sie verwendet lazy Referenzen: `getSheet()`,
`getTable()`, `getCell()` und `asTable()` prüfen keine externe Ressource und
führen keinen Read aus. Erst ein explizites `dataRead()` darf feststellen, dass
ein Workbook oder Sheet nicht existiert beziehungsweise nicht lesbar ist.

Wichtige Interfaces:

- `ExcelDataTypeInterface`
- `ExcelSheetDataTypeInterface`
- `CellDataTypeInterface`

Ein `ExcelSheetDataTypeInterface` ist ein Excel-Zellenraster und keine
`TableDataTypeInterface`. Über `asTable()` bietet es eine alternative allgemeine
Table-Sicht auf dieselbe fachliche Sheet-Ressource. Dies ist keine Konvertierung
oder unabhängige Kopie. `excel.getTable(sheetName)` ist der Convenience-Zugriff
für `excel.getSheet(sheetName).asTable()`; Objektidentität und Caching sind nicht
vorgeschrieben.

```ts
const sheet = excel.getSheet("Kunden");
const cell = sheet.getCell("B4");
const table = sheet.asTable();

// Kein externer Read ist bis hier erfolgt.

await sheet.dataRead();

cell.getValue();

sheet.setCell("B4", "Brooklyn");

await sheet.dataSave();

await table.dataRead();
table.getRows();
```

`getSheets()` liefert nur bereits bekannte oder geladene Sheets in
Workbook-Reihenfolge. `getSheet(nameOrIndex)` liefert dagegen immer eine lazy
Referenz und niemals `undefined`. Bei einer namensbasierten Referenz ist der Name
bekannt, während `sheet.getIndex()` vor erfolgreichem Read noch `undefined` sein
kann. Bei einer indexbasierten Referenz ist der Index bekannt, während
`sheet.getName()` noch `undefined` sein kann. Ein nicht vorhandenes Sheet
verursacht keinen Fehler in `getSheet()`, sondern darf erst beim expliziten
Sheet- oder Table-Read fehlschlagen.

Auch eine Cell-Position existiert konzeptionell unabhängig von ihrem Wert.
`sheet.getCell("B4")` und `sheet.getCell(3, 1)` liefern deshalb immer eine
`CellDataTypeInterface`-Referenz. `cell.isResolved()` unterscheidet eine noch
nicht gelesene Referenz von einem bekannten Cell-Zustand. Vor der Auflösung
liefert `getValue()` beziehungsweise `getType()` `undefined`. Nach der Auflösung
bedeutet `getValue() === null`, dass die Cell tatsächlich leer ist.

```ts
const cell = sheet.getCell("B4");

cell.isResolved();
// false möglich

cell.getValue();
// undefined, solange der Zustand unbekannt ist

await sheet.dataRead();

cell.isResolved();
// true

cell.getValue();
// TableCellValue; null bedeutet jetzt tatsächlich leer
```

Positionsbasierte Cell-Zugriffe verwenden nullbasierte Indizes. Damit entspricht
`getCell(0, 0)` der Adresse A1 und `getCell(3, 1)` der Adresse B4. Die Adresse,
der Row-Index und der Column-Index einer Cell müssen stets konsistent sein.
`getCells()` liefert Cells in Row-major order: zuerst nach Row, innerhalb einer
Row nach Column.

```text
A1, B1, C1, A2, B2, C2
```

Verbundene Cells werden direkt über `CellDataTypeInterface.isMerged()`
gekennzeichnet. Alle normalen Zugriffe auf Position, Wert, Formel und Typ bleiben
unabhängig vom Merge-Status verwendbar. Wie der verbundene Bereich intern
repräsentiert wird, entscheidet die konkrete Excel-Implementierung.

Cell-Werte verwenden `TableCellValue`, fachliche Cell-Typen verwenden
`AttributeType` aus der Table-Domain. Excel-spezifische primitive Value- oder
Type-Unions werden nicht parallel gepflegt. Formel, aktueller Wert und
fachlicher Typ bleiben getrennt. Eine Cell kann beispielsweise gleichzeitig
`hasFormula() === true`, über `getFormula()` den Ausdruck `=SUM(B2:B10)`, über
`getValue()` das Ergebnis `428` und über `getType()` den Typ `"number"` liefern.
Eine Formel wie `=A1` ist ebenfalls eine normale Formel und kein eigener
Referenz- oder Cell-Typ.

Formeln werden auch beim Schreiben getrennt von normalen String-Werten
behandelt:

```ts
sheet.setFormula("C4", "=A4*2");
sheet.setFormula(3, 2, "=A4*2");
```

Beide Methoden verändern nur den aktuellen Sheet-Zustand. Persistiert wird erst
durch `sheet.dataSave()` oder `excel.dataSave()`.

Das Modell unterscheidet drei Read-Ebenen:

```ts
// Vollständigen Workbook-Zustand und Workbook-Metadaten lesen.
await excel.dataRead();

// Eine konkrete Sheet-Ressource und ihre Cells lesen.
const sheet = excel.getSheet("Kunden");
await sheet.dataRead();

// Dasselbe Sheet als Table unter Berücksichtigung der Table-Filter lesen.
const table = excel.getTable("Kunden");
table.addFilter(filter);
await table.dataRead();
```

Filter gehören ausschließlich zur Table-Domain. Weder Workbook noch Sheet
bieten eine Filter- oder Comparator-API. `excel.getTable("Kunden")` und
`excel.getSheet("Kunden").asTable()` müssen fachlich dieselbe Sheet-Ressource
repräsentieren. Wie Headers, Attributes, Rows und Columns aus dem Zellenraster
abgeleitet werden, entscheidet die konkrete Excel-Implementierung.

## Code

`CodeDataTypeInterface` arbeitet mit Quelltext als `string`.

Wichtige Funktionen:

- `addImportNamed(moduleName, names)`
- `addImportNamespace(moduleName, namespace)`
- `removeImport(moduleName)`
- `addClass(className)`
- `removeClass(className)`
- `addProperty(className, property)`
- `addMethod(className, method)`

## HTML

`HtmlDataTypeInterface` stellt den lesenden Zugriff auf ein vollständiges
HTML-Dokument bereit. Änderungen werden getrennt über
`HtmlEditorDataTypeInterface` beschrieben.

Wichtige Reader-Funktionen:

- `getTitle()`
- `getDoctype()`
- `getHead()`
- `getBody()`
- `getContent()`
- `getCode()`

Wichtige Editor-Funktionen:

- `setTitle(title)`
- `setBodyHtml(rawHtml)`
- `appendBodyRawHtml(rawHtml)`
- `addElement(tagName, content, attributes)`

`HTMLElementDataTypeInterface` stellt nur lesenden Zugriff auf gemeinsame Inhalte und Attribute eines HTML-Elements bereit. Schreibende Methoden liegen getrennt in `HTMLElementEditorDataTypeInterface`. Konkrete Interfaces erweitern jeweils genau eines dieser Basis-Interfaces ohne generische Parameter. Tagnamen werden in den konkreten Readern eingeschraenkt; tagspezifische Attributobjekte werden beim Erstellen oder Einfuegen eines Elements exakt typisiert.

Der generische Attributzugriff bleibt als Fallback fuer dynamische Auswertung erhalten. Der Body wird als geordnete Inhaltsliste gelesen und ueber indexbasierte Einfuege-, Ersetzungs-, Verschiebe- und Loeschmethoden bearbeitet. Externe Skripte werden dabei ueber `HTMLScriptLinkDataTypeInterface` mit ihrer Source beschrieben; eingebettete Skripte verwenden `HTMLScriptDataTypeInterface` mit ihrem Content. Externe und eingebettete Styles werden entsprechend durch `HTMLStyleLinkDataTypeInterface` und `HTMLStyleDataTypeInterface` getrennt.

Der Head bietet konkrete Zugriffe auf Titel, Links, Metadaten, Skripte, Styles und Templates. Diese speziellen Dokumentdaten erben nicht vom allgemeinen `HTMLElementDataTypeInterface`, sondern stellen nur die fuer ihren Zweck relevanten Werte bereit.

Jedes HTML-Element stellt ueber `getCode()` seinen vollstaendig serialisierten HTML-Code bereit. `HtmlDataTypeInterface.getCode()` liefert das gesamte Dokument; `getDoctype()`, `getHead()` und `getBody()` erlauben den strukturierten Zugriff auf seine Hauptbestandteile.

## Nutzung

```ts
import type {
  CommonDataTypeInterface,
  JsonArrayInterface,
  JsonDataTypeInterface,
  KeyDataTypeInterface,
  JsonValue,
  TextDataTypeInterface,
  TableDataTypeInterface,
  TableQueryInterface,
  TableQueryExecutorInterface,
  RowDataTypeInterface,
  ColumnDataTypeInterface,
  ExcelDataTypeInterface,
  ExcelSheetDataTypeInterface,
  CellDataTypeInterface,
} from "@frxnklyn/datatypes";
```

## Fehler

`ErrorDataTypeInterface` stellt Name, Nachricht, Stacktrace und
Erstellungszeitpunkt ueber klar benannte Getter bereit.
`AbstractError` implementiert dieses Interface als minimale Grundlage fuer
fachliche Fehlerklassen und bleibt gleichzeitig ein normaler nativer `Error`.
Wird ein vorheriger Fehler uebergeben, bleiben dieser als `cause` und sein
Stacktrace erhalten.

```ts
import { AbstractError } from "@frxnklyn/datatypes";

export class FileWriteError extends AbstractError {
  public constructor(path: string, cause?: Error) {
    super(`Die Datei "${path}" konnte nicht geschrieben werden.`, cause);
  }
}

const originalError = new Error("Permission denied");
const error = new FileWriteError("./data/config.json", originalError);

console.log(error.name);
console.log(error.message);
console.log(error.timestamp);
console.log(error.stack);
console.log(error.cause);
```

## Build

```bash
npm install
npm run build
npm test
```
