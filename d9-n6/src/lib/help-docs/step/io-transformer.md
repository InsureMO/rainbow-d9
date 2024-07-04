### Input and output

Usually, when processing logic, we do not need all the memory contexts, but only need to extract certain fragments for processing and return
the processing results to the context for subsequent logic to continue processing. Therefore, `@rainbow-o23` provides a relevant
implementation, allowing pipeline steps to flexibly access the relevant memory data and write back the processed result data to the context
in the required format.

#### Pick from input

Use the `Pick from input` property to define a script. The returned data will be used as input data for this step. The script is a function
that takes the following parameters:

- `$factor` represents the incoming data,
- `$request` represents the original request data (including incoming data and a context), it is not recommended,
- `$helpers` represents function supporting, and it has a shortcut `$`.

Here is a simple example:

```ts
// incoming data
const incoming = {name: 'John', age: 23};

// Only the age is needed as a parameter in the step processing, not the name.
// Define a transformation script, so in the actual processing logic of the current step, only the age will be collected, and there won't be a field for the name attribute.
return {age: $factor.age};
```

> `return` is not necessary. If the script is only one line (and has no line breaks), the system will consider the result of executing that
> line as the result of the entire function.

> It's important to note that whether modifications to memory data during processing will affect the original input data depends on how the
> transformation is handled. Generally, if deep cloning is not performed, it will affect the data; otherwise, it will not.

#### Write to output

Use the `Write to output` property to define a script. The returned data will be used as output data for this step. The script is a function
that takes the following parameters:

- `$result` represents the outgoing data,
- `$request` represents the original request data (including incoming data and a context), it is not recommended,
- `$helpers` represents function supporting, and it has a shortcut `$`.

Here is a simple example:

```ts
// outgoing data
const outgoing = {name: 'John', age: 23};

// The result data should only include age, not the name.
// Define a transformation script, the age alone will be stored in memory for subsequent use.
return {age: $result.age};
```

> `return` is not necessary. If the script is only one line (and has no line breaks), the system will consider the result of executing that
> line as the result of the entire function.

>

#### Merge-back Strategy

After processing the step logic and obtaining the returned data, you can also define how this returned data should be merged into the
context of the entire pipeline. There are several ways to define this, all declared using the `Merge-back strategy` attribute:

- Defined as `Replace`, it means the returned data will overwrite the original context and be used as the new context.
- Defined as `Unbox and merge`, it means the returned data will be automatically unboxed and merged into the original context. In this
  case, the returned data must be a JSON object and cannot be a primitive type or an array.
- Defined as `As specific property`, it means the returned data will be merged into the original context under the specified name.

Here is a simple example:

```ts
// context data
let context = {name: 'John', age: 0};
const result = {age: 23};

// merge not defined, equivalent to
context = result;
// context is {age: 23}

// merge is "unbox and merge", equivalent to
context = {...context, ...result};
// context is {name: 'John', age: 23}

// merge is 'person', equivalent to
context = {...context, person: result};
// context is {name: 'John', age: 0, person: {age: 23}}
```

> Note that in the latter two cases, there is a possibility of name collision resulting in the original context being overwritten.
> Therefore, it is necessary to have a clear understanding of the data structure in the context.

#### Keep or clear

In the following `Write to output` scenarios, and in cases where merge-back strategy is specified as `Replace`:

- Returning `null` or `undefined` (recommended to use `(void 0)` to represent `undefined`) indicates that the original request data will
  continue to be used as the request data for the next step without any modifications.
- Returning a flag created by `$helpers.$clearContextData()` to clear context data will be used as the request data for the next step, while
  all other data is cleared.

> Please note that "without any modifications" is a conceptual reference. If the data has already been altered by the logic executed in the
> step, the data passed to the next step may not be identical to the input data of this step.
