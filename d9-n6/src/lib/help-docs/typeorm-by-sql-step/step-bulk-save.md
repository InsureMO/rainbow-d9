### TypeOrm bulk save by sql step

Use sql to save a collection of data to the database.

#### Environment variables

This step does not use any environment variables, unless an environment variable key is used when specifying the data source.

#### Step variables

Use the `sql` property to define a SQL sentence. The returned data will be used as return data for this step.

#### Input

The input data should be an array of array or object, each item represents a row of data to be saved.

```ts
export interface InputData {
	// SQL sentence to save data, could be INSERT, UPDATE or DELETE.
	// If SQL is defined in the parameters, it takes precedence over the SQL predefined in the steps.
	sql?: string;
	// data to save
	items?: Array<Array<any> | Record<string, any>>;
}
```

#### Returning

Use the return data from sql as the return data for this step, returned data follows the following types:

```ts
export type ReturnedOfInserts = Array<string | number | bigint>;
export type ReturnedOfUpdatesOrDeletes = Array<number>;
```

> for MSSQL, the return data could be anything, depends on the `OUTPUT` statement in SQL.

${typeorm}

${transformer}

${errorHandles}
