### TypeOrm load many by sql use cursor step

Use sql to load data from the database, return data depends on step definition.

#### Environment variables

This step uses the following system environment variable definition:

- `CFG_TYPEORM_{DB}_FETCH_SIZE`: default fetch size.

#### Step variables

Use the `sql` property to define a SQL sentence. The returned data will be used as input data for sub steps.
By specifying `fetchSize`, each batch of data retrieved will execute sub-steps. Before executing the sub-steps, the data to be passed to it
will be calculated using the `streamTo` function. If `streamTo` is not specified, the batch of data retrieved itself will be passed to the
sub-steps. If the sub-steps is not specified, all retrieved data will be merged and returned.

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

Use the return data from sql as the return data for this step, should be an empty array.

${typeorm}

${transformer}

${errorHandles}
