### Snippet step

The snippet pipeline step use a snippet (in JavaScript syntax) to process the data. Conceptually, it can be understood as a function that
performs appropriate operations on the given parameters and finally returns the processed result to the memory context for further
processing.

#### Environment variables

This step does not use any environment variables.

#### Step variables

Define the `snippet` attribute, which is a JavaScript script that will ultimately be executed as a JavaScript function. This function
accepts the following input parameters:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

#### Returning

The snippet's return data follows these conventions:

- If it returns `undefined`, `null`, or no value returned, the context of the entire pipeline is considered unchanged,
- If it returns `$.$clearContextData()`, the context is considered cleared (this is actually a specific `Symbol` object that, apart from
  serving as a flag, has no practical significance),
- Other data is directly returned as the response data.

> The returned data can still be further processed during the `Write to output` stage.

${transformer}

${errorHandles}
