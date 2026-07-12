# AI rules for @frxnklyn/datatypes

## Structured error naming

- `ErrorInterface` is the main public contract for structured errors.
- Do not use the `DataType` suffix for the main structured error contract.
- The `*DataTypeInterface` suffix is reserved for content data types such as JSON, text, table, code, and HTML.
- Structured errors are not content data types. They use `ErrorInterface`, `ErrorDataInterface`, `ErrorOptionsInterface`, and related error-specific interfaces.

## Structured error folders

Keep the error module separated by role:

```text
src/error/
  classes/
  interfaces/
  renderer/
  types/
  index.ts
```

- Classes belong in `classes/`.
- Public contracts and serialized shapes belong in `interfaces/`.
- Enum-like values and open string-union types belong in `types/`.
- Rendering helpers belong in `renderer/`.
- Re-export public API through `src/error/index.ts` and then `src/index.ts`.

## Error categories

- `ErrorCategory` must stay extensible.
- Keep it as a `const` object plus open string type, not as a closed enum.
- Other packages must be able to add package-specific categories by spreading `ErrorCategory`.
