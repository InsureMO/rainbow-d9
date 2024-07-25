The return value of the function will be used as the input data for each sub-step, and this function will be executed before each sub-step.
If the return data contains shared memory data, modifications to this data in any sub-step may affect other sub-steps. The following
parameters can be used during the clone process:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.
