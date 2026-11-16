# Constructor-JSON: JsonField, Importreihenfolge und Export

Diese **optionale** API ergänzt die bisherigen `AbstractImport`,
`AbstractJsonMappable` und `AbstractFactory`-Klassen; deren Verhalten
bleibt unverändert. TypeScript 5+ mit modernen Standard-Decorators ist
erforderlich (**ohne** `experimentalDecorators`).

## Checkliste

| Anforderung | Unterstützung |
|---|---|
| Eine zentrale Basisklasse | ✅ `AbstractJsonObject` |
| Kindklassen kennzeichnen nur relevante Variablen | ✅ `@JsonField()` |
| `new AiAgent(json)`, ohne Factory/Class-Decorator | ✅ |
| Standardwerte wie `systemPrompt = ""` | ✅ |
| Komplexe Methoden mit Rückgabewert | ✅ `import: "createConnection"` |
| Mehrere JSON-Keys je Feld | ✅ Optionenarray |
| Import nach `order` | ✅ innerhalb eines Felds |
| Export über erste sortierte Zuordnung | ✅ unabhängig vom importierten Key |
| Optionaler expliziter Export | ✅ `export: "exportToolBox"` |
| Automatische rekursive Serialisierung | ✅ `exportJson()` oder direkte JSON-Werte |
| Geerbte Felder und `super.exportJson()` | ✅ |
| Vorhandene Import-/Export-API unverändert | ✅ |

## Einfache Verwendung

```ts
import { AbstractJsonObject, JsonField } from "@frxnklyn/datatypes";

class AiAgent extends AbstractJsonObject {
  @JsonField() systemPrompt = "";
  @JsonField() temperature = 0.7;
}

const agent = new AiAgent({ systemPrompt: "Du bist Kibo" });
agent.systemPrompt; // "Du bist Kibo"
agent.temperature; // 0.7
agent.exportJson(); // { systemPrompt: "Du bist Kibo", temperature: 0.7 }
```

Der JSON-Schlüssel entspricht normalerweise dem Feldnamen. Alternativ:

```ts
@JsonField("system_prompt")
systemPrompt = "";

@JsonField({ key: "system_prompt" })
systemPrompt = "";
```

Die beiden Beispiele zeigen alternative Deklarationen, nicht zwei Felder
mit identischem Namen in derselben Klasse.

## Komplexes Beispiel: Toolbox + Tools

```ts
import {
  AbstractJsonObject,
  JsonField,
  type JsonDataType,
} from "@frxnklyn/datatypes";

class ToolBox {
  constructor(public tools: string[] = []) {}

  exportJson() {
    return { tools: [...this.tools] };
  }
}

class AiAgent extends AbstractJsonObject {
  @JsonField() systemPrompt = "";

  @JsonField([
    { key: "toolbox", import: "createToolBox", order: 10 },
    { key: "tools", import: "addToolsToToolBox", order: 20 },
  ])
  private toolBox = new ToolBox();

  protected createToolBox(json: JsonDataType, current: ToolBox): ToolBox {
    if (json === null || typeof json !== "object" || Array.isArray(json)
        || !Array.isArray(json.tools)) throw new TypeError("Invalid toolbox");
    return new ToolBox(json.tools as string[]);
  }

  protected addToolsToToolBox(json: JsonDataType, current: ToolBox): ToolBox {
    if (!Array.isArray(json)) throw new TypeError("Invalid tools");
    return new ToolBox([...current.tools, ...(json as string[])]);
  }
}

const agent = new AiAgent({
  toolbox: { tools: ["search"] },
  tools: ["calculate"],
});
agent.exportJson(); // { systemPrompt: "", toolbox: { tools: ["search", "calculate"] } }
```

Die Zuordnungen laufen in sortierter Reihenfolge:

1. `toolbox` (Order 10): `createToolBox(jsonValue, defaultToolBox)`
2. `tools` (Order 20): `addToolsToToolBox(jsonValue, toolBoxFromStep1)`
3. Der Rückgabewert des letzten Schritts ist der Feldwert.

Ist nur `tools` im Eingabe-JSON vorhanden, läuft ausschließlich Schritt 2.
Die Methode erhält dann den **Defaultwert** des Feldes. Ist gar kein
zugeordneter Key vorhanden, bleibt der Standardwert bestehen.

Der Export verwendet **immer die erste sortierte Zuordnung**, hier
`key: "toolbox"`. Auch nach `new AiAgent({ tools: ["search"] })`
entsteht daher ein `toolbox`-Key beim Export.

**Hinweis:** `order` gilt **innerhalb desselben Feldes** und kann nicht
die Initialisierungsreihenfolge *unterschiedlicher* Klassenfelder oder
Vererbungsebenen verändern.

## Optionsformate

| Deklaration | Ergebnis |
|---|---|
| `@JsonField()` | Direkter Import nach Feldname |
| `@JsonField("key")` | Direkter Import nach anderem JSON-Key |
| `@JsonField({ key: "key", import: "method" })` | Eine Importfunktion |
| `@JsonField([{...}, {...}])` | Mehrere Zuordnungen für dasselbe Feld |
| `order?: number` | Kleinere Zahl zuerst; Standard ist **0** |
| `export?: string` | Optionale Instanzmethode zur Exportkonvertierung |

Bei gleicher `order` bleibt die Reihenfolge im Array erhalten. Die erste
sortierte Zuordnung bestimmt auch den Export-Key. Fehlende Eingabe-Keys
werden übersprungen. Mehrere direkte Zuordnungen können denselben
Feldwert nacheinander ersetzen.

## Exportregeln

`AbstractJsonObject.exportJson()` berücksichtigt **ausschließlich
dekorierte Felder** (auch `private` im TypeScript-Sinne). Für jedes Feld
wird genau die erste sortierte Zuordnung gewählt:

1. **Explizit:** Steht `export: "exportToolBox"` in dieser Zuordnung,
   wird die benannte Methode mit dem aktuellen Feldwert aufgerufen.
2. **Automatisch:** Andernfalls ruft die Serialisierung
   `fieldValue.exportJson()` auf, wenn vorhanden.
3. **Direkt:** Andernfalls wird der JSON-kompatible Wert kopiert.

Ein expliziter Export sieht z. B. so aus:

```ts
@JsonField([
  { key: "toolbox", import: "createToolBox", order: 10, export: "exportToolBox" },
  { key: "tools", import: "addToolsToToolBox", order: 20 },
])
private toolBox = new ToolBox();

protected exportToolBox(value: ToolBox): JsonDataType {
  return { total: value.tools.length };
}
```

Das Ergebnis hat den Key `toolbox` und den Wert
`{ total: number }`. Ein **separater Export-Key ist nicht nötig**.
Eine `export`-Methode ist stets optional.

Arrays, verschachtelte Plain Objects und Klasseninstanzen mit
`exportJson()` werden rekursiv in unabhängige JSON-Werte umgewandelt.
`undefined`-Felder sowie `undefined`-Eigenschaften in normalen
Objekten werden ausgelassen. `undefined` **innerhalb eines Arrays**,
nicht-endliche Zahlen, nicht unterstützte Klasseninstanzen (z. B.
`Date` ohne `exportJson()`) und zirkuläre Referenzen führen zu
einem aussagekräftigen `TypeError`. Doppelte Export-Keys zweier Felder
werden ebenfalls als Fehler behandelt, nicht stillschweigend
überschrieben.

## Vererbung

```ts
class BaseAgent extends AbstractJsonObject {
  @JsonField("system_prompt") systemPrompt = "";
}

class CustomAgent extends BaseAgent {
  @JsonField() temperature = 0.7;

  override exportJson() {
    return { ...super.exportJson(), extra: "own value" };
  }
}

const agent = new CustomAgent({ system_prompt: "Kibo" });
agent.exportJson();
// { system_prompt: "Kibo", temperature: 0.7, extra: "own value" }
```

Unveränderte geerbte dekorierte Felder bleiben im Import und Export aktiv.
Wird ein Feld in einer Unterklasse **erneut mit `@JsonField` deklariert**,
ersetzt seine Zuordnung diejenige der Basisklasse beim Export.
Ohne neuen Decorator kann eine Unterklassen-Feldinitialisierung
zuvor importierte Elternwerte überschreiben; daher bei erneuter
Deklaration erneut `@JsonField` verwenden.

## Laufzeit und Grenzen

- Der `AbstractJsonObject`-Konstruktor speichert das Eingabe-JSON in
  einer `WeakMap`; die Feldinitialisierer übernehmen die Werte.
- Importmethoden erhalten `(jsonValue, currentValue)`; sie
  **müssen** den gewünschten Feldwert zurückgeben, statt `void`.
- Importmethoden laufen **während der Initialisierung dieses Felds**,
  nicht nach dem Konstruktor der letzten Unterklasse.
- Fehlende Importmethoden werden nur bei vorhandenem JSON-Schlüssel
  beanstandet, fehlende explizite Exportmethoden bei `exportJson()`.
- Strings in `import`/`export` werden derzeit **zur Laufzeit** geprüft.
  Die TypeScript-Typprüfung validiert die Methodennamen nicht.
- Direkte Feldwerte werden anhand ihres Standardwerts nur oberflächlich
  auf passende Primitive/Arrays/Objekte geprüft. Für `undefined` gibt
  es keine Laufzeit-Typinformation. Komplexe Konverter sollten ihren
  Eingang explizit validieren.
- Die JSON-Ausgabe wird neu erzeugt und nicht aus dem ursprünglichen
  Eingabe-JSON übernommen.
- Die bestehende `AbstractJsonMappable`-Export-API bleibt unverändert;
  `AbstractJsonObject` verwendet eine **separate** neue Umsetzung.

## Tests

`npm test` kompiliert TypeScript inklusive der Fixtures und führt
die bestehenden Node-Tests sowie `tests/json-multimap.test.mjs` aus.
Diese prüfen beide Eingabe-Keys, abweichende Orders, gleiche Orders,
Weitergabe des Zwischenwerts, fehlende Keys, Exportauswahl,
optional expliziten Export, automatische `exportJson()`-Aufrufe in
Arrays, `undefined`, Zyklen, ungültige Werte, geerbte und neu deklarierte
Felder und `super.exportJson()`.
