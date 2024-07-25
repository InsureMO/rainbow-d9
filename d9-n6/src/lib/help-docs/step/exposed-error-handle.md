Handle `ExposedUncatchableError` thrown by current step. The following parameters can be used during the error handling process:

- `$code`: Error code. Note that it is always `O01-99999` when using the `AnyError` handler.
- `$error`: Error object itself,
- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

