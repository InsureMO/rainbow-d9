### TypeOrm transactional step

Create a transaction with given name, and execute the sub-steps within the transaction.

#### Environment variables

This step does not use any environment variables, unless an environment variable key is used when specifying the data source.

#### Step variables

This step has no other properties defined except for using the `steps` attribute to define sub-steps.

#### Returning

Use the return from the final sub-step as the return data.

> It can still be further decorated during `Write to output` stage for the return data.

${typeorm}

${transformer}

${errorHandles}
