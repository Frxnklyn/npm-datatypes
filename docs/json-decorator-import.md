# Constructor-JSON mit einem Field-Decorator (opt-in)

Die neue Lösung **ergänzt** die bisherigen Klassen `AbstractImport`,
`AbstractJsonMappable` und `AbstractFactory`, ohne sie zu verändern.
Sie ermöglicht `new AiAgent(json)` ohne Class-Decorator oder
`fromJson()`-Methode. Benötigt werden moderne TypeScript-Decorators
(TypeScript 5+, **ohne** `experimentalDecorators`).

## Anforderungscheckliste

| Anforderung | Umsetzung |
| --- | --- |
| Eine zentrale Basisklasse | ✅ `AbstractJsonObject` |
| Kindklassen markieren nur ihre importierten Felder | ✅ `@JsonField()` |
| Standardwerte wie `systemPrompt = ""` | ✅ Bleiben bei fehlendem JSON bestehen |
| Komplexe Werte über Funktionen | ✅ `@JsonField({ import: "createConnection" })` |
| Nur **ein** Decorator je Feld | ✅ Kein `@JsonFunction` mehr |
| Keine Class-Decorators bei Unterklassen | ✅ Vererbte Felder funktionieren automatisch |
| Direkter Aufruf `new AiAgent(json)` | ✅ |
| Constructor-Interface | ✅ `JsonConstructorInterface<T>` |
| Alte Variante und Factory bleiben bestehen | ✅ Unverändert |

## Beispiel für Kibo

```ts
import {
  AbstractJsonObject,
  JsonField,
  type JsonDataType,
  type JsonConstructorInterface,
} from "@frxnklyn/datatypes";

class AiConnection extends AbstractJsonObject {
  @JsonField() provider = "local";
}

class AiAgent extends AbstractJsonObject {
  // Einfaches JSON: gleicher Schlüssel, Standardwert bleibt erhalten.
  @JsonField() systemPrompt = "";
  @JsonField() temperature = 0.7;

  // Komplexes JSON: genau EIN Decorator mit Methodennamen.
  @JsonField({ import: "createConnection" })
  connection?: AiConnection = undefined;

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
agent.temperature;  // 0.7 (Standard)
agent.connection instanceof AiConnection; // true

const ctor: JsonConstructorInterface<AiAgent> = AiAgent;
const another = new ctor({ systemPrompt: "Hallo" });
```

## Alle Schreibweisen

```ts
@JsonField()                                         // JSON key = field name
systemPrompt = "";

@JsonField("system_prompt")                          // JSON key alias
systemPrompt = "";

@JsonField({ import: "createConnection" })           // named conversion method
connection?: AiConnection = undefined;

@JsonField({ key: "connection_json", import: "createConnection" })
connection?: AiConnection = undefined;               // alias + converter
```

Die beiden `systemPrompt`-Varianten bzw. die beiden
`connection`-Varianten zeigen jeweils **Alternativen**, keine mehrfachen
Deklarationen innerhalb derselben Klasse.

Der Wert von `import` ist der **Methodenname** und nicht der JSON-Key.
Die Methode benötigt **keinen Decorator** und muss den fertigen Feldwert
`return`en. Methoden dürfen `protected` oder `public` sein; JavaScript
`#private`-Methoden sind dafür nicht geeignet. Ein falsch geschriebener
Methodenname führt beim tatsächlichen Import zu einem verständlichen
`TypeError`. TypeScript kann diese String-Verknüpfung derzeit **nicht
automatisch bei der Deklaration überprüfen**.

## Initialisierungsreihenfolge

1. `AbstractJsonObject` speichert das Eingabe-JSON intern in einer `WeakMap`.
2. Wenn die deklarierende Klasse ihre Felder initialisiert, liest jedes
   `@JsonField` den zugehörigen Wert.
3. Ist `import` angegeben, wird die genannte Instanzmethode mit dem
   rohen JSON-Wert aufgerufen. Ihr Rückgabewert wird Feldwert.
4. Danach werden die folgenden Felder bzw. die Felder weiterer Unterklassen
   initialisiert.

**Grenze:** Das geschieht **während** der Feldinitialisierung und nicht
in einer globalen Importphase nach dem letzten Unterklassenkonstruktor.
Ein `createTools()`, das `this.connection` benötigt, setzt voraus, dass
`connection` vorher initialisiert wurde. Insbesondere dürfen aus einer
Basisklasse aufgerufene überschriebene Methoden nicht auf noch nicht
initialisierte Felder ihrer Unterklasse zugreifen.

## Vererbung und erneut deklarierte Felder

- Geerbte Felder behalten ihre Zuordnung ohne weiteren Decorator.
- Wird eine `createConnection`-Methode überschrieben, gilt normale
  dynamische Methodenauswahl. Sie wird aber möglicherweise **vor** der
  Initialisierung von Feldern der Unterklasse ausgeführt.
- Wird eine geerbte Eigenschaft erneut mit einem Initialisierer deklariert,
  muss diese neue Deklaration ebenfalls `@JsonField()` tragen, um das
  JSON bei ihrer Initialisierung erneut zu berücksichtigen.
- Fehlende JSON-Schlüssel behalten den deklarierten Standardwert;
  Konverter werden in diesem Fall nicht aufgerufen.

## Bestehende Variante und Constructor-Interface

`JsonConstructorInterface<T>` beschreibt `new (json: JsonDataType): T`.
Die bestehende Variante bleibt unabhängig:
`new MyFrame().importJson(json)`, `AbstractFactory.create(...)`
und `exportJson()` werden nicht angepasst.

## Validierung und Sicherheit

Direkte Werte werden nur **oberflächlich** mit dem Standardwert verglichen:
String, Number (endlich), Boolean, Array bzw. einfaches Objekt.
Bei `undefined` ist kein Laufzeittyp ableitbar; der Wert wird dann
direkt übernommen. Importfunktionen müssen die erwartete Struktur selbst
validieren. Unbekannte, nicht dekorierte Felder werden nicht übernommen.
Ein Eingabewert muss ein einfaches JSON-Objekt sein (kein Array, `null`
oder primitiver Wert). Das JSON wird nicht als öffentliches Feld abgelegt.
Die neue API hat noch keinen separaten Export-Vertrag.

## Tests

`npm test` baut das Package und kompiliert die TypeScript-Fixtures via
`tsconfig.tests.json`. Die gut lesbaren Node-Tests in
`tests/json-decorators.test.mjs` prüfen direkte und komplexe Werte,
Defaults, Alias-Schlüssel, Vererbung, Methoden-Overrides,
Initialisierungsreihenfolge, unbekannte/ungültige Eingaben und Fehler
bei fehlenden Importmethoden. Die vorherigen Tests bleiben erhalten.
