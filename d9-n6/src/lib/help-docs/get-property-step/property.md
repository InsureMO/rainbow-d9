Retrieve the value of a specified property name from the input data. Property names can be connected with dots (`.`) to denote multiple
hierarchical levels.

For example, if there is input data like `{a: {b: [{c: 3}, {c: 4}]}}`, then with the following definition, you can retrieve the
corresponding value:

| Property | Value                   |
|----------|-------------------------|
| `a`      | `{b: [{c: 3}, {c: 4}]}` |
| `a.b`    | `[{c: 3}, {c: 4}]`      |
| `a.b.c`  | `[3, 4]`                |

> Please note that when attempting to retrieve a property value from `null`, `undefined`, or a primitive type (including `string`,
> `number`, `boolean`, `symbol`, `bigint`), will always receive a `null`.
