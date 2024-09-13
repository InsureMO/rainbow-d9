Obtain a portion of the request data as the input for this step. Additional processing of the data can also be performed during this
process. The following parameters can be used during the conversion process:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

The returned data will be used as the real input data for this step. If no data is returned, there is no input data for this step.

> It is an async function, so `await` is available inside.
