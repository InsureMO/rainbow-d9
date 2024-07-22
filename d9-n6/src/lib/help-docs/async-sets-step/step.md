### Async sets step

The async sets pipeline step includes a set of sub-step definitions, where all the actual processing logic is executed within the sub-steps,
asynchronously. The input data for the first sub-step is specified by `Pick from input`.

> Note that the sub-steps are executed in sequence, asynchronous is relative to this async sets step. This also means that modifications to
> memory within sub-steps cannot be directly reflected in the current process, so must handle it with caution. Generally, direct
> modifications to input data or context data within sub-steps should be avoided unless it can be confirmed that the data will not be used
> in the current process.

#### Environment variables

This step does not use any environment variables.

#### Step variables

This step has no other properties defined except for using the `steps` attribute to define sub-steps.

#### Returning

This step does not return anything.

${transformer}

${errorHandles}
