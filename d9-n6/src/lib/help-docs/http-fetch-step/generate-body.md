Build HTTP request body. The following parameters can be used during the build process:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

This function could return anything. If the returned data is not `null`, `undefined`, and not a string, use `JSON.stringify` to convert it
to a string. `null` and `undefined` essentially represent the absence of an HTTP body. If this snippet is not defined, the default behavior
is to use `$factor` as the HTTP body after processing it accordingly.

> Regardless, this part can be configured, but in scenarios where the body is not used, the configured snippet will be ignored.

> It is an async function, so `await` is available inside.
