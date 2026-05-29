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
    index.ts
  index.ts
```

## Common

`CommonDataTypeInterface<TContent>` enthaelt die Methoden, die jeder DataType anbietet.

Wichtige Funktionen:

- `getContent()`
- `getContentString()`
- `changeContent(newContent)`

Alle konkreten DataType-Interfaces erweitern dieses Common-Interface mit ihrem jeweiligen Inhaltstyp.

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

`HtmlDataTypeInterface` arbeitet mit HTML-Inhalt als `string`.

Wichtige Funktionen:

- `getTitle()`
- `setTitle(title)`
- `setBodyHtml(rawHtml)`
- `appendBodyRawHtml(rawHtml)`
- `addElement(tagName, content, attributes)`

## Nutzung

```ts
import type {
  CommonDataTypeInterface,
  JsonDataTypeInterface,
  KeyDataTypeInterface,
  JsonValue,
  TextDataTypeInterface,
  TableDataTypeInterface,
} from "@frxnklyn/datatypes";
```

## Build

```bash
npm install
npm run build
```
