### Get property step

The get property pipeline step retrieves the value of the specified property name and finally returns the processed result to the memory
context for further processing.

#### Environment variables

This step does not use any environment variables.

#### Step variables

Define the `property` attribute to retrieve the value from a specified position in the input data. The retrieval rules are as follows:

- Property names can use dot (`.`) to connect, allowing access to values from nested objects.
- Values based on `null` or `undefined` will return `null`.
- Values based on any basic type (including `string`, `number`, `bigint`, `boolean`, `Symbol`) will return `null`.
- If there are multiple levels of properties and one level's data is an array, the final result will be an array.

#### Returning

The value of the specified property, can be any value.

> Typically, need to specify a merge property in the `Write to output` step for use in subsequent pipeline steps.

${transformer}

${errorHandles}
