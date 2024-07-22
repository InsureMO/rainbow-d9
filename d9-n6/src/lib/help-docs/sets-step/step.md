### Sets step

The sets pipeline step includes a set of sub-step definitions, where all the actual processing logic is executed within the sub-steps. The
input data for the first sub-step is specified by `Pick from input`.

#### Environment variables

This step does not use any environment variables.

#### Step variables

This step has no other properties defined except for using the `steps` attribute to define sub-steps.

#### Returning

Use the return from the final sub-step as the return data.

> It can still be further decorated during `Write to output` stage for the return data.

${transformer}

${errorHandles}
