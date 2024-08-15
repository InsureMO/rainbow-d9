### TypeOrm load one by sql step

Use sql to load data from the database, only one record will be returned.

#### Environment variables

This step does not use any environment variables, unless an environment variable key is used when specifying the data source.

#### Step variables

Use the `sql` property to define a SQL sentence. The returned data will be used as return data for this step.

#### Returning

Use the return data from snippet as the return data for this step.

${typeorm}

${transformer}

${errorHandles}
