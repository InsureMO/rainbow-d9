### Parallel sets step

The parallel sets pipeline step includes a set of sub-step definitions, where all the actual processing logic is executed within the
sub-steps. Each substep is executed in parallel, and it can be specified whether to collect only the result of the first completed sub-step
or to collect the results of all sub-steps.The input data for each sub-step is specified by `Pick from input`.

> No matter how the collection of sub-step execution results is specified, if any sub-step throws an exception before the results are
> collected, the entire parallel process is terminated. Note that the completion of a step does not necessarily mean that other
> asynchronously executed substeps will be terminated. Please refer
> to [Promise.race](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise.race) for more details.

> The parallel step relies on the exception raised by the sub-step. If the sub-step encounters an exception and is caught and processed by
> the exception handler without re-throwing an exception, it is considered to have ended normally.

#### Environment variables

This step does not use any environment variables.

#### Step variables

| Variable name | Type    | Description                                                                                                                  |
|---------------|---------|------------------------------------------------------------------------------------------------------------------------------|
| cloneData     | snippet | Provide a snippet to copy data. The return value of this snippet will be used as the input data for each sub-step. Optional. |
| race          | boolean | When set to `true`, only the result data of the first completed sub-step will be received. Optional, default is `false`.     |

> If `cloneData` snippet is not provided, the input data for each sub-step will be the same memory data, which is shared among all
> sub-steps. Therefore, any modification of this memory data by one sub-step may affect the other sub-steps.

#### Returning

Use the return from the first resolved sub-step as the return data. If defined to receive the results of all sub-steps, the data will be an
array; otherwise, it will be the result data returned by the first completed sub-step.

> It can still be further decorated during `Write to output` stage for the return data.

${transformer}

${errorHandles}
