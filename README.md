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
  RowDataTypeInterface,
  ColumnDataTypeInterface,
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
