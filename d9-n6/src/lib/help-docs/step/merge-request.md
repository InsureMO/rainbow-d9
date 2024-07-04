Define the strategy for writing back step result data to memory:

- `Replace`: means the returned data will overwrite the original context and be used as the new context.
- `Unbox and merge`: means the returned data will be automatically unboxed and merged into the original context. In this
  case, the returned data must be a JSON object and cannot be a primitive type or an array.
- `As specific property`: means the returned data will be merged into the original context under the specified name.
