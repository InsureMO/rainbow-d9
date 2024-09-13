Write back the result of the step execution to memory for use as the request data in the next step. Additional processing of the data can
also be performed during this process. The following parameters can be used during the conversion process:

- `$result`: Result data of the step execution,
- `$request`: Entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

The returned data will be written back to memory as the actual result data for this step.

> How the step's returned data is written back to memory depends on the return result of this process and the chosen write-back strategy.
> Please refer to the merge-back strategy documentation for details.

> It is an async function, so `await` is available inside.
