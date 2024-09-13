Reprocess the endpoint URL read from the environment. The following parameters can be used during the decoration process:

- `$endpointUrl`: The URL read from the environment based on the `System` and `Endpoint` definitions, can be a fully qualified URL
  or just a
  URL context or template,
- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

Should return the final URL to be used for the HTTP request. If this snippet is not defined, then use the URL configured in
the environment variables for access.

> It is an async function, so `await` is available inside.
