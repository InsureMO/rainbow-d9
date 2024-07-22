### Each step

The each pipeline step includes a set of sub-step definitions, where all the actual processing logic is executed within the sub-steps. The
sub-step set will be executed N times, where N is the length of the given sub-step input data array. For each execution of the sub-step set,
the input data are the array element at the current index and original input data itself.

> Ensure that the input data is always an array; otherwise, the sub-steps cannot execute correctly. Additionally, if the given input
> parameter is `null`, `undefined`, or an array with a length of 0, it will be returned directly without affecting the context data and
> without executing the `Write to output` stage.

#### Environment variables

This step does not use any environment variables.

#### Step variables

| Variable name       | Type   | Description                                                                                      |
|---------------------|--------|--------------------------------------------------------------------------------------------------|
| originalContentName | string | The name of the variable that contains the original input data. Optional, default is `$content`. |
| itemName            | string | The name of the variable that contains the current item. Optional, default is `$item`.           |

At the same time, the step provides a semaphore to exit the loop, named `$semaphore`. Therefore, the format of the input data received by
the sub-steps is as follows:

```ts
// Assuming no parameters are specified, all defaults will be used.
interface Data {
	$content: any;          // original input data
	$item: any;             // item at the current index
	$semaphore: Symbol;     // return this semaphore to break and exit the loop
}

// Assuming the parameters are specified as originalContentName=input, itemName=data
interface Data {
	input: any;             // original input data
	data: any;              // item at the current index
	$semaphore: Symbol;     // return this semaphore to break and exit the loop
}
```

#### Returning

An array containing the returns from all execution rounds, maintaining the same order as the given parameter array.

> Typically, need to specify a merge property in the `Write to output` step for use in subsequent pipeline steps.

${transformer}

${errorHandles}
