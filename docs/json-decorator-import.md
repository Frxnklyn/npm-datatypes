# Constructor-JSON mit Decorators (opt-in)

Die neue Lösung **ergänzt** die bisherigen Klassen `AbstractImport`,
`AbstractJsonMappable` und `AbstractFactory` ohne deren Verhalten zu ändern.
Sie ist für `new AiAgent(json)` gedacht und benötigt **keinen**
Class-Decorator, `fromJson()`-Aufruf oder eigenen Import-Aufruf in Kindklassen.
Voraussetzung: moderne TypeScript-Decorators (TypeScript 5+, **ohne**
`experimentalDecorators`).

## Checkliste aus der Anforderung

| Anforderung | Ergebnis |
| --- | --- |
| Eine zentrale Klasse, von der alle erben | ✅ `AbstractJsonObject` |
| Erbende Klassen kennzeichnen nur Variablen / Funktionen | ✅ `@JsonField()`, optional `@JsonFunction("key")` |
| Standardwerte `systemPrompt = ""` bleiben möglich | ✅ Ein JSON-Wert ersetzt den Standardwert erst **bei der Feldinitialisierung** |
| Komplexe JSON-Verarbeitung durch Funktionen | ✅ Die passende `@JsonFunction` liefert eine Klasseninstanz/einen Feldwert zurück |
| Keine weiteren Decorators am Klassennamen | ✅ Auch nicht bei `extends AiAgent` |
| `new AiAgent(json)` statt `fromJson()` | ✅ |
| Alte Variante bleibt vorhanden | ✅ Sie wird nicht verändert |

**Wichtige Regel:** Eine allein gekennzeichnete `@JsonFunction` wird
nicht automatisch aufgerufen. Es braucht ein **passendes**
`@JsonField()` als Auslöser. Die Funktion soll den **fertigen Feldwert
zurückgeben**, statt einen void-Setter zu verwenden.

## Beispiel: einfache Werte, Connection und Vererbung

```ts
import {
  AbstractJsonObject,
  JsonField,
  JsonFunction,
  type JsonDataType,
  type JsonConstructorInterface,
} from "@frxnklyn/datatypes";

class AiConnection extends AbstractJsonObject {
  @JsonField() provider = "local";
}

class AiAgent extends AbstractJsonObject {
  @JsonField() systemPrompt = "";
  @JsonField() temperature = 0.7;
  @JsonField() connection?: AiConnection = undefined;

  @JsonFunction("connection")
  protected createConnection(json: JsonDataType): AiConnection {
    return new AiConnection(json);
  }
}

class CustomAgent extends AiAgent {
  @JsonField() customPrompt = "Standard";
}

const agent = new CustomAgent({
  systemPrompt: "Du bist Kibo",
  connection: { provider: "openai" },
  customPrompt: "Hallo",
});
agent.systemPrompt; // "Du bist Kibo"
agent.temperature; // 0.7, weil JSON keinen Wert vorgibt
agent.connection instanceof AiConnection; // true

// Ein Konstruktor mit JSON-Argument entspricht dem Interface:
const ctor: JsonConstructorInterface<AiAgent> = AiAgent;
const another = new ctor({ systemPrompt: "Hallo" });
```

Mit `@JsonField("system_prompt")` kann ein anderer JSON-Schlüssel
zugeordnet werden. Nicht gekennzeichnete Eigenschaften bleiben geschützt
vor einer automatischen JSON-Zuweisung.

## Reihenfolge: kein zu früher Basis-Import

1. `AbstractJsonObject` speichert das JSON intern in einer `WeakMap`
   beim Aufruf von `super(json)`. Es ruft **noch keine** Kindmethoden auf.
2. Danach werden die Felder der ersten erbenden Klasse in ihrer
   Deklarationsreihenfolge initialisiert. Jedes `@JsonField` liest
   den passenden JSON-Wert und ruft bei Bedarf die `@JsonFunction` auf.
3. Danach initialisieren sich die Felder der nächsten erbenden Klasse.
4. `new CustomAgent(json)` liefert das fertige Objekt zurück.

**Grenze:** Es gibt dabei keine generische Funktion, die *nach allen*
Konstruktoren automatisch ausgeführt wird. Eine Konvertierung wird während
der Initialisierung **ihres Feldes** ausgeführt. Wer z. B. `tools`
aus `connection` baut, muss `connection` im selben Klassenniveau
**vor** `tools` deklarieren. Methoden aus der Elternklasse dürfen keine
noch uninitialisierten Eigenschaften der Kindklasse voraussetzen.

## Vererbung und Überschreiben

- Geerbte `@JsonField`-Felder funktionieren unverändert, ohne neue
  Decorators in der Unterklasse.
- Eine überschriebene `@JsonFunction`-Methode wird über dynamischen
  Methodenaufruf gefunden, auch wenn der Override selbst nicht erneut
  dekoriert ist. Der Aufruf kann aber **vor** den Feldinitialisierungen
  der Kindklasse geschehen.
- Deklariert eine Unterklasse ein Feld **erneut** (z. B.
  `override systemPrompt = "Anderer Standard"`), muss die neue
  Deklaration **erneut `@JsonField()`** tragen; sonst kann sie
  den zuvor importierten Elternwert überschreiben.
- Methoden müssen den importierten Feldwert **zurückgeben**;
  `@JsonFunction` ist keine asynchrone Nach-Konstruktor-Hook.

## Constructor-Interface und bestehende Variante

`JsonConstructorInterface<T>` schreibt `new (json: JsonDataType): T`
als Signatur fest. Damit können Bibliotheken Konstruktoren von
JSON-Modellen typisieren, ohne eine Factory oder separate
`fromJson()`-Methode vorzuschreiben.

Die alte Import-/Export-API bleibt separat und unverändert:
`new MyFrame().importJson(json)`, `AbstractFactory.create(...)`
und `exportJson()` funktionieren wie zuvor.

## Laufzeitvalidierung und Grenzen

Das Konstruktor-JSON muss ein einfaches Objekt sein (kein Array, `null`
oder primitiver Wert). Bei direktem Import werden Werte **oberflächlich**
anhand des Standardwertes verglichen: ein String-Standard akzeptiert
Strings; Zahlen müssen endlich sein; Booleans, Arrays und einfache
Objekte werden grob geprüft. Bei `undefined` lässt sich der Zieltyp
zur Laufzeit nicht erkennen; solche Werte werden direkt übernommen.
Das Ergebnis von `@JsonFunction` wird ebenfalls nicht automatisch
validiert. Komplexe Strukturen müssen in der Importfunktion geprüft werden.

Das Eingabe-JSON wird in einer `WeakMap` abgelegt, nicht als öffentliches
Instanzfeld. Es gibt hier noch **keinen neuen Exportvertrag**.

## Verständliche Tests

`npm test` baut das Package und kompiliert die TypeScript-Beispiele in
`tests/fixtures/JsonDecoratorExamples.ts` mittels
`tsconfig.tests.json`. Die Node-Tests in
`tests/json-decorators.test.mjs` prüfen die Checkliste: direkte
Konstruktion, Defaults, Connection, Vererbung und Overrides,
Initialisierungsreihenfolge, fehlende/unbekannte Werte und
Constructor-Interface. Die vorhandenen Tests bleiben erhalten.
