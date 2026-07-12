# AI rules for @frxnklyn/datatypes

## Package goal

`@frxnklyn/datatypes` defines shared TypeScript contracts for reusable data types.

This package should provide:

- public interfaces
- shared type aliases
- small enum-like value sets
- narrow type guards when they belong to the shared type itself
- minimal shared base classes only when they are part of a cross-package contract

This package should not provide:

- package-specific domain implementations
- file, editor, command, persistence, network, or UI behavior
- concrete errors or concrete business classes from other packages
- dependencies on other `@frxnklyn` packages

## Adding a new data type

When adding a new top-level data type, follow the existing domain pattern:

```text
src/<domain>/
  <Domain>DataTypeInterface.ts
  <Domain>Types.ts
  index.ts
```

Use `*Types.ts` only when the domain needs shared aliases, object shapes, enum-like values, or type guards. If the domain only needs one interface, do not add unnecessary files.

Examples already in this repository:

- `src/json/JsonDataTypeInterface.ts`
- `src/text/TextDataTypeInterface.ts`
- `src/table/TableDataTypeInterface.ts`
- `src/code/CodeDataTypeInterface.ts`
- `src/html/HtmlDataTypeInterface.ts`

The main public contract for a domain must be named `<Domain>DataTypeInterface`.

## Interface design

- Extend `CommonDataTypeInterface<TContent>` when the new type represents managed content.
- Keep interfaces focused on data contracts and expected operations.
- Use `unknown` instead of `any`.
- Prefer explicit object interfaces over loose records when the shape is known.
- Keep method names consistent with existing domains: `getContent`, `getContentString`, `changeContent`, `add`, `remove`, `set`, `get`, `clear`, and similar simple verbs.
- Do not include implementation details that belong in consumer packages.

## Supporting files

Supporting files should be named by their role:

- `<Domain>Types.ts` for shared aliases, object shapes, constants, and guards
- `<Specific>Interface.ts` for secondary contracts in the same domain
- `index.ts` for public re-exports of that domain

Nested folders are only useful when a domain grows beyond a flat set of interfaces and types. Do not introduce nested structure by default.

## Exports

Every public type must be exported twice:

1. From the domain barrel, for example `src/<domain>/index.ts`
2. From the package barrel, `src/index.ts`

Imports inside source files should use `.js` extensions because the package builds with `moduleResolution: NodeNext`.

## README

When adding a new data type, update `README.md` with:

- the new folder structure
- a short section that explains the main interface
- the most important methods or type aliases
- a small import example if the public API changes

## Tests and build

- Add tests for behavior that can break exported contracts, type guards, serialization helpers, or shared base classes.
- Run `npm test` before committing.
- The build must stay dependency-free except for TypeScript dev tooling.

## Error data type

The error domain follows the same package conventions:

```text
src/error/
  ErrorDataTypeInterface.ts
  index.ts
```

Additional folders such as `classes/`, `interfaces/`, `renderer/`, or `types/` are allowed only because structured errors need supporting contracts and rendering helpers.

Do not add package-specific concrete error classes here. Concrete errors belong in the package where they are thrown.
