Use snippet processing for data processing. The following parameters can be used during the conversion process:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

> It is an async function, so `await` is available inside.
