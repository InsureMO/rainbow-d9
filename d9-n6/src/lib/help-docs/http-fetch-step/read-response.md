Read HTTP response. The following parameters can be used during the build process:

- `$response`: The response (`Response`, check [node-fetch](https://www.npmjs.com/package/node-fetch) for more details) object from the HTTP
  request,
- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

This function could return anything. It is important to note that the response body will only be read if the response status is in the
normal range (`1xx`, `2xx`, `3xx`); otherwise, it will skip to the error handling.

> It is an async function, so `await` is available inside.
