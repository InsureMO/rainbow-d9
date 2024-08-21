### Conditional step

The conditional pipeline step provides two routes. The first route has a check, and if the check passes, the set of steps defined for the
first route is executed. If the check fails, it proceeds to the other (`otherwise`) route. The `otherwise` route is allowed to be absent.

#### Environment variables

This step does not use any environment variables.

#### Step variables

Define the `check` attribute, which is a JavaScript script that will ultimately be executed as a JavaScript function. This function
accepts the following input parameters:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

> It is important to note that the `$factor` passed to `check` is provided by `Pick from input`, but `Pick from input` does not affect the
> input parameters of the sub-steps (unless memory data is modified).

#### Returning

The return data for this step is determined by the return data of the route executed at runtime.

${transformer}

${errorHandles}
