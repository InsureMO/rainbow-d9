Error handling for different HTTP response statuses is generally implemented in a way that only `4xx` and `5xx` statuses trigger
error handling. Each exception handling snippet is designed for a specific status; if a status does not have a defined handler, a
default `UncatchableError` will be thrown, with an error code of `O03-00010`. Error handling can either rethrow the original exception,
wrap the exception and rethrow it, or return data normally. If data is returned normally, it will be used as the output data for this step.

There are two special cases:

- If the request times out, the status is `600`,
- If the exception is not caused by the request itself, such as an exception thrown due to a problem with a certain configuration logic,
  then,
	- If the exception type is `UncatchableError`, no further handling will be performed and the exception will be directly thrown to the
	  outer layer,
	- Otherwise, use the exception handler with status `000` for processing.

> DO NOT rethrow an error that is not an `UncatchableError` from the error handler, as it will be caught again by the error handler with
> status `000`, which could lead to confusion.

The following parameters can be used during the build process:

- `$options`: The content portion of `$errorCode`, `$url`, `$factor`, `$request`, `$response` data,
- `$helpers` or `$`: Data manipulation helpers.

> It is an async function, so `await` is available inside.
