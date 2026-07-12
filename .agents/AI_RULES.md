# AI rules for @frxnklyn/datatypes

## DataType interface naming

- Every top-level domain in this package exposes its main contract as `*DataTypeInterface`.
- The error domain follows the same rule: the main public error contract is `ErrorDataTypeInterface`.
- Do not introduce a shortened main error contract name; it does not match this repository's naming convention.
- Supporting error shapes keep their precise names, for example `ErrorDataInterface`, `ErrorOptionsInterface`, and `ErrorContextInterface`.

## Structured error folders

Keep the error module separated by role:

```text
src/error/
  ErrorDataTypeInterface.ts
  classes/
  interfaces/
  renderer/
  types/
  index.ts
```

- The main domain interface belongs directly under `src/error/`, matching `JsonDataTypeInterface.ts`, `TextDataTypeInterface.ts`, and the other domain interfaces.
- Classes belong in `classes/`.
- Supporting interfaces and serialized shapes belong in `interfaces/`.
- Enum-like values and open string-union types belong in `types/`.
- Rendering helpers belong in `renderer/`.
- Re-export public API through `src/error/index.ts` and then `src/index.ts`.

## Error categories

- `ErrorCategory` must stay extensible.
- Keep it as a `const` object plus open string type, not as a closed enum.
- Other packages must be able to add package-specific categories by spreading `ErrorCategory`.
