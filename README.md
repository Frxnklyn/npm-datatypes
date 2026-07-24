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
      HTMLScriptDataTypeInterface.ts
      HTMLScriptEditorDataTypeInterface.ts
      HTMLDivDataTypeInterface.ts
      HTMLDivEditorDataTypeInterface.ts
      index.ts
    body/
      HTMLBodyDataTypeInterface.ts
      HTMLBodyEditorDataTypeInterface.ts
      index.ts
    head/
      HTMLIconAttributeInterface.ts
      HTMLHeadDataTypeInterface.ts
      HTMLHeadEditorDataTypeInterface.ts
      index.ts
    index.ts
  error/
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

`TableDataTypeInterface` arbeitet mit serialisiertem Tabelleninhalt als `string` und bietet Tabellenzugriff ueber Header, Rows und Records.

Wichtige Typen:

- `TableCellValue`
- `TableRow`
- `TableRecord`

Wichtige Funktionen:

- `getHeaders()`
- `setHeaders(headers)`
- `hasHeaders()`
- `getRowsRaw()`
- `getRows()`
- `setRows(rows)`
- `addRowArray(row)`
- `addRowObject(row, autoExtendHeaders)`
- `addRow(row)`
- `addRows(rows)`
- `getRow(index)`
- `updateRow(index, row)`
- `removeRow(index)`
- `clearRows()`
- `getCell(rowIndex, column)`
- `setCell(rowIndex, column, value)`
- `toRecords()`

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

Der generische Attributzugriff bleibt als Fallback fuer dynamische Auswertung erhalten. Der Body wird als geordnete Elementliste gelesen und ueber indexbasierte Einfuege-, Ersetzungs-, Verschiebe- und Loeschmethoden bearbeitet. Der Head bietet dagegen konkrete Zugriffe auf Titel, Links, Metadaten, Skripte, Styles und Templates.

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
} from "@frxnklyn/datatypes";
```

## Fehler

`AbstractError` ist eine minimale Grundlage fuer fachliche Fehlerklassen. Neben den normalen `Error`-Informationen stellt die Klasse einen Erstellungszeitpunkt bereit. Wird ein vorheriger Fehler uebergeben, bleiben dieser als `cause` und sein Stacktrace erhalten.

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
