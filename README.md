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
    index.ts
  error/
    ErrorDataTypeInterface.ts
    classes/
      AbstractError.ts
    interfaces/
      ErrorContextInterface.ts
      ErrorDataInterface.ts
      ErrorOptionsInterface.ts
      ErrorReportSectionInterface.ts
    renderer/
      ErrorRenderer.ts
    types/
      ErrorCategory.ts
      ErrorSeverity.ts
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
  JsonArrayInterface,
  JsonDataTypeInterface,
  KeyDataTypeInterface,
  JsonValue,
  TextDataTypeInterface,
  TableDataTypeInterface,
} from "@frxnklyn/datatypes";
```

## Strukturierte Fehler

`AbstractError` stellt eine gemeinsame Grundlage fuer strukturierte Fehler bereit. Fachliche Fehlerklassen bleiben in dem Package, in dem sie entstehen.

```ts
import {
  AbstractError,
  ErrorCategory,
  ErrorSeverity,
} from "@frxnklyn/datatypes";

export class FileWriteError extends AbstractError {
  public constructor(path: string, cause?: unknown) {
    super({
      code: "FILE_WRITE_FAILED",
      message: `Die Datei "${path}" konnte nicht geschrieben werden.`,
      category: ErrorCategory.FILESYSTEM,
      severity: ErrorSeverity.ERROR,
      cause,
      context: {
        path,
        operation: "write",
      },
    });
  }
}

const originalError = new Error("Permission denied");
const error = new FileWriteError("./data/config.json", originalError);

console.log(error.toJSON());
console.log(error.toMarkdown());
console.log(error.toHTML());
```

Eigene Packages koennen zusaetzliche Kategorien definieren, ohne `@frxnklyn/datatypes` zu erweitern:

```ts
import { ErrorCategory } from "@frxnklyn/datatypes";

export const AppErrorCategory = {
  ...ErrorCategory,
  TRANSCRIPT: "transcript",
  AUDIO: "audio",
} as const;
```

`category` akzeptiert sowohl die Standardwerte aus `ErrorCategory` als auch eigene String-Kategorien.

## Build

```bash
npm install
npm run build
npm test
```
