Check if there is a need to execute the subsequent steps. Return `true` if necessary, otherwise skip to the next routing check or enter
`otherwise` route. The following parameters can be used during the build process:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

> This check is performed before `Pick from input`.

> Modifying memory data within this function is not recommended as it may lead to unpredictable data changes.

> It is an async function, so `await` is available inside.
