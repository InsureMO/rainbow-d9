Delete specified property or properties from the input data. If there are multiple attributes, use `,` to connect them.

For example, if there is input data like `{a: 1, b: 2, c: 3}`, then with the following definition, you can retrieve the
corresponding value:

| Property | After deletion  |
|:---------|:----------------|
| `a`      | `{b : 2, c: 3}` |
| `a, b`   | `{c: 3}`        |

> If the specified property name does not exist on the given data object, there will be no side effects.
