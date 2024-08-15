### TypeORM

`@rainbow-o23` provides a set of pipeline steps for database operations based on [TypeORM](https://typeorm.io/), including transaction
support, SQL read/write, and simple ORM entity operations. Generally, it is recommended to use SQL for data operations. `@rainbow-o23` has
enhanced SQL syntax to better interact with in-memory data.

#### Datasource

Each TypeOrm step must specify a datasource, which is configured in environment. If using dynamic environment variables for specification,
you need to indicate the key of the environment variable, such as key `db.default` corresponding to the `CFG_DB_DEFAULT` environment
variable name.

#### Transaction

TypeORM steps use transaction names to identify transactions, steps can be grouped under a transaction. If transaction is declared as
autonomous, the step will be executed in the default transaction (autonomous transaction). Essentially, steps within a transaction should be
nested in a TypeORM transactional step and have the same transaction name.

> Transactional steps can be nested, meaning a transactional step can contain another transactional step as a sub-step, even if they have
> different transaction names.

#### Native SQL Support & Enhancement

SQL supports native database syntax. At the same time, `@rainbow-o23` enhances SQL syntax, allowing the use of the `$property` syntax to
retrieve corresponding data from data objects, also supports multi-level property names, connected by `.`. For example, `$person.name`
represents that `person` is an object and `name` is a property under `person`. The following are the supported syntax features:

- `IN ($...names)`: `one-of`, `names` should be an array,
- `LIKE $name%`: `starts-with`,
- `LIKE $%name`: `ends-with`,
- `LIKE $%name%`: `contains`.

> Name mapping is case-sensitive.  
> `LIKE` is case-sensitive.

Since different databases have varying degrees of support for dialects, `@rainbow-o23` also provides appropriate enhanced support for this:

- For pagination, `$.limit($offset, $limit)` will be translated and executed in the appropriate dialect. For example,
	- `MySQL` uses `LIMIT $offset, $limit`,
	- `PostgreSQL` uses `OFFSET $offset LIMIT $limit`.
	- `MSSQL` and `Oracle` use `OFFSET $offset ROWS FETCH NEXT $limit ROWS ONLY`,
		- `MSSQL` requires an `ORDER BY` clause for pagination SQL. If there is no `ORDER BY` clause, will
		  use `ORDER BY 1 OFFSET $offset ROWS FETCH NEXT $limit ROWS ONLY`.
- For JSON column, because some databases (such as MSSQL) do not have a JSON column type, they cannot automatically replace strings in the
  result set with JSON objects,
	- Use `config as "config.@json"` to explicitly indicate that the `config` column is of JSON data type.
	- Use `$config.@json` to explicitly indicate that the `config` property of given parameters is of JSON data type.
- For boolean column which use numeric(int/smallint/tinyint) as storage type, because some databases (such as PostgreSQL) cannot
  automatically convert boolean values in memory to numeric 0 or 1 in the database,
	- Use `enabled as "enabled.@bool"` to explicitly indicate that the `enabled` column is of boolean in-memory and numeric in database data
	  type.
	- Use `$enabled.@bool` to explicitly indicate that the `enabled` property of given parameters is of boolean in-memory and numeric in
	  database data type.
- For datetime (MySQL, MSSQL) / timestamp (Oracle, PostgreSQL) column,
	- Use `created_at as "createdAt.@ts"` to explicitly indicate that the `createdAt` column is of string in-memory and timestamp in
	  database data type.
	- Use `$createdAt.@ts` to explicitly indicate that the `createdAt` property of given parameters is of string in-memory and timestamp in
	  database data type.

> It is recommended that if you need to consider support for multiple database dialects, using enhanced syntax will make it easier to write
> SQL. If you only need to support a specific database, then using its standard syntax is sufficient.

> It is important to note that some databases (such as `PostgreSQL`) do not differentiate column names by case. This can affect the property
> names of the returned objects in the result set (usually recommended in camel case). Therefore, even though it is not a syntax
> enhancement, it is strongly recommended to use aliases to standardize the column names in the returned result set, for
> example, `PERSON_NAME AS "personName"`, please pay attention to the use of quotation marks to correctly preserve the case.
