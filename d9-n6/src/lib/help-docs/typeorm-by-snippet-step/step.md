### TypeOrm by snippet step

Use snippets to handle database data.

#### Environment variables

This step does not use any environment variables, unless an environment variable key is used when specifying the data source.

#### Step variables

Use the `snippet` property to define a JavaScript script. The returned data will be used as return data for this step. The script is
a function that takes the following parameters:

- `$runner` represents the [QueryRunner](https://orkhan.gitbook.io/typeorm/docs/query-runner),
- `$factor` represents the incoming data,
- `$request` represents the original request data (including incoming data and a context), it is not recommended,
- `$helpers` represents function supporting, and it has a shortcut `$`.

A TypeOrm Query Runner instance, `$runner`, will be passed to the snippet, and the snippet can use this instance to perform any operation on
the database.

> Do not need to manually start a transaction, whether using autonomous transaction or if it is nested within transaction step sets.
> The `$runner` instance passed to the snippet will automatically start a transaction.

#### Returning

Use the return data from snippet as the return data for this step.

${typeorm}

${transformer}

${errorHandles}
