# TODO – Auslagern und Folgearbeiten

Dieser PR führt das neue Decorator-System **additiv** ein. Die bisherige
Variante mit `AbstractImport`, `AbstractJsonMappable`,
`AbstractFactory` und den vorhandenen Interfaces bleibt bestehen.

- [ ] **Auslagern prüfen:** Sobald die Decorator-Laufzeitlogik größer
      wird, `AbstractJsonObject` und `JsonField`
      ggf. in ein eigenes unabhängiges Paket auslagern. Die
      `JsonConstructorInterface`-/JSON-Typen könnten in Datatypes
      bleiben. Vorher Exportpfade, Abhängigkeiten und Migration klären.
- [ ] Compile-Time-Prüfung von `import`-Methodennamen und Rückgabetypen
      untersuchen; der aktuelle String wird zur Laufzeit geprüft.
- [ ] Optionale Validatoren für `undefined`-Felder und Funktionsrückgaben
      überlegen. TypeScript-Typen alleine validieren keine JSON-Werte.
- [ ] Eine getrennte Importphase / Abhängigkeitsreihenfolge nur bei
      konkretem Bedarf für komplexe Objektgraphen designen.
- [ ] Falls notwendig, neuen Constructor-Export-Vertrag entwickeln.
      Nicht stillschweigend alte Export-Logik wiederverwenden.
- [ ] Migrationen von Kibo und Framelet getrennt und ausdrücklich
      planen, ohne bestehende Nutzer der alten Variante umzuschalten.
