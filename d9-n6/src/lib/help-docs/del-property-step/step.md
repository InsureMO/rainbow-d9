### Delete property step

The delete property pipeline step remove the specified property name from input data.

#### Environment variables

This step does not use any environment variables.

#### Step variables

Define the `property` attribute to remove a specified property from the input data. Since property does not support multi-level data
structures, when removing a property from a non-top-level data object in the input data, should first use `Pick from input` to retrieve
the non-top-level object.

#### Returning

This step does not return anything.

${transformer}

${errorHandles}
