### TypeOrm load one by sql step

Use sql to load data from the database, only one record will be returned.

#### Environment variables

This step does not use any environment variables, unless an environment variable key is used when specifying the data source.

#### Step variables

Use the `sql` property to define a SQL sentence. The returned data will be used as return data for this step.

#### Input

The input data should be an array or a record, representing a row of data to be saved.

```ts
export interface InputData {
	// SQL sentence to load data, should be SELECT
	// If SQL is defined in the parameters, it takes precedence over the SQL predefined in the steps.
	sql?: string;
	// criteira to load
	params?: Array<any> | Record<string, any>;
}
```

#### Returning

Use the return data from sql as the return data for this step, could be a record, or `undefined` when nothing found.

${typeorm}

${transformer}

${errorHandles}
