Build HTTP request headers. The following parameters can be used during the build process:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

This function should return an object (`Record<string, string>`) containing the headers to be used in the HTTP request. If the same key as
defined in the environment definition is used, the definition here takes precedence, and the headers in the environment definition will be
overwritten. If this snippet is not defined, then use the headers in the environment definition.

> Key of headers are NOT trimmed.

> It is an async function, so `await` is available inside.
