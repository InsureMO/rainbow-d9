### Input and output

Usually, when processing logic, we do not need all the memory contexts, but only need to extract certain fragments for processing and return
the processing results to the context for subsequent logic to continue processing. Therefore, `@rainbow-o23` provides a relevant
implementation, allowing pipeline steps to flexibly access the relevant memory data and write back the processed result data to the context
in the required format.

#### From input

Use the `From Input` property to define a script. The returned data will be used as input data for this step. The script is a function
that takes the following parameters:

- `$factor` represents the incoming data,
- `$request` represents the original request data (including incoming data and a context), it is not recommended,
- `$helpers` represents function supporting, and it has a shortcut `$`.

Here is a simple example:

```ts
// incoming data
const incoming = {name: 'John', age: 23};

// Only the age is needed as a parameter in the step processing, not the name
// Define a transformation script. So in the actual processing logic of the current step, only a number will be received.
return {age: $factor.age};
```

> `return` is not necessary. If the script is only one line (and has no line breaks), the system will consider the result of executing that
> line as the result of the entire function.

> It's important to note that whether modifications to memory data during processing will affect the original input data depends on how the
> transformation is handled. Generally, if deep cloning is not performed, it will affect the data; otherwise, it will not.

#### To output

Use the `To Output` property to define a script. The returned data will be used as output data for this step. The script is a function
that takes the following parameters:

- `$result` represents the outgoing data,
- `$request` represents the original request data (including incoming data and a context), it is not recommended,
- `$helpers` represents function supporting, and it has a shortcut `$`.

Here is a simple example:

```ts
// outgoing data
const outgoing = {name: 'John', age: 23};

// The result data should only include age, not the name.
// Define a transformation script. The age alone will be stored in memory for subsequent use.
return {age: $result.age};
```

> `return` is not necessary. If the script is only one line (and has no line breaks), the system will consider the result of executing that
> line as the result of the entire function.

#### Merge

Here is the translation of your text into English:

After processing the step logic and obtaining the returned data, you can also define how this returned data should be merged into the
context of the entire pipeline. There are several ways to define this, all declared using the `Merge` attribute:

- If not defined, it means the returned data will overwrite the original context and be used as the new context.
- Defined as `true`, it means the returned data will be automatically unpacked and merged into the original context. In this case, the
  returned data must be a JSON object and cannot be a primitive type or an array.
- Defined as a string, it means the returned data will be merged into the original context under the specified name.

Here is a simple example:

```ts
// context data
let context = {name: 'John', age: 0};
const result = {age: 23};

// merge not defined, equivalent to
context = result;

// merge is true, equivalent to
context = {...context, ...result};

// merge is 'person', equivalent to
context = {...context, person: result};
```

> Note that in the latter two cases, there is a possibility of name collision resulting in the original context being overwritten.
> Therefore, it is necessary to have a clear understanding of the data structure in the context.
