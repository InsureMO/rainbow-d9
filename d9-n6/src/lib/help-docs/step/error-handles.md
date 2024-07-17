### Error handling

Error handling is a critical part of any step. It is important to handle errors properly to ensure that your step is robust
and reliable. `@rainbow-o23` provided a standard exception handling process, including the following four types of exceptions:

- `CatchableError`: Catchable exception. Generally refers to exceptions thrown in pipeline steps expected to be caught and handled
  externally,
- `ExposedUncathableError`: Uncatchable exception which identified as exposed. Generally refers to exceptions thrown in pipeline steps not
  expected to be handled additionally externally, and should be exposed to the caller,
- `UncatchableError`: Uncatchable exception. Generally refers to exceptions thrown in pipeline steps not expected to be handled additionally
  externally,
- `AnyError`: Any exception. Generally refers to any exception thrown in pipeline steps.

It is important to note that exception handling is mutually exclusive. If an exception has already been caught by a handler, it will not be
caught by any other handlers. After throwing an exception, the pipeline steps will detect exception type in the above order. As long as the
exception matches the catch type and the processor for that catch type has been defined, the defined processing logic will be entered. In
practical scenarios, exception catching needs to be done according to requirements. Generally, there are some recommended practices:

- Generally, `CatchableError` is expected to be caught and handled. For whether the pipeline step will throw this exception, please refer to
  the corresponding step documentation,
- In most pipeline steps, since custom snippet can be used to define logic (in addition to the step itself, can use snippet to
  define the logic for `pick from input` and `write to output`), any type of exception can be thrown in these snippets, so whether or not
  you need to catch it depends on the specific definition of the custom snippet for this step,
- Generally speaking, `ExposedUncatchableError` and `UncatchableError` do not require further processing,
- Also, can use `AnyError` to catch all types of exceptions, including `Node.js` standard exceptions

`@rainbow-o23` provides two ways to handle exceptions, which will be demonstrated below.

#### Using snippet

Use snippet processing for handling error. The following parameters can be used during the conversion process:

- `$code`: Error code. Note that it is always `O01-99999` when using the `AnyError` handler.
- `$error`: Error object itself,
- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

After handling the exception in the snippet, can either return normally, rethrow the original exception, or construct and throw a new
exception. The following examples will provide some references:

```ts
// simply log the exception.
$.$logger.error(`An exception[code=${$code}] caught.`, $error);

// return normally
return 'Everything is OK now.';

// or check exception type, decide to rethrow or construct a new exception
if ($.$errors.isCatchable($error)) {
	// construct and throw a new exception
	$.$errors.exposed({status: 500, code: $code, reason: $error.message});
} else {
	// rethrow the original exception
	throw $error;
}
```

> In most cases, special exception handling is not necessary, as @rainbow-o23 will handle all exceptions consistently when returning to the
> API caller.

> When choosing to return normally, meaning no exception is thrown anymore, the returned data will go through the `write to output` process
> and will be consistent with the normal logic of returning data in the pipeline steps. However, if an exception is thrown and caught during
> the `write to output` process, and choose to return normally again, the returned data will not go through the `write to output`
> processing.

Here are some commonly used utility function examples for exception handling in `$helpers`. For detailed specifications, please refer to
the `@rainbow-o23` documentation.

```ts
// log exception
$.$logger.log(`An exception[code=${$code}] caught.`, $error);
$.$logger.warn(`An exception[code=${$code}] caught.`, $error);
// If the log function has two or more parameters, and the last one is a string, then the last parameter will be used as the log category
$.$logger.error(`An exception[code=${$code}] caught.`, $error, 'SomeLogCategory');

// check error type
// note exposed uncatchable error is also an uncatchable error
// so if want to check exposed uncatchable error, should check it first
$.$errors.isCatchable($error);       // check it is a catchable error
$.$errors.isExposed($error);         // check it is an exposed uncatchable error
$.$errors.isUncatchable($error);     // check it is an uncatchable error

// construct a new error and rethrow it
// for catchable
$.$errors.catchable({code: $code, reason: 'I am catchable.'});
// for exposed uncatchable, a status field is required
// status is exactly following the HTTP status code, code is the error code, reason is the error message
$.$error({status: 500, code: $code, reason: 'Unpredicated error occurred.'});
$.$errors.exposed({status: 500, code: $code, reason: 'Unpredicated error occurred.'});
// for uncatchable
$.$errors.uncatchable({code: $code, reason: 'I am uncatchable.'});
```

#### Using sub-steps

In practice, if an exception requires additional handling and is not thrown after processing, it is recommended to configure this using
pipeline steps. When choosing to handle exceptions using pipeline steps, the format of the request data received by the step is as follows

```ts
interface Data {
	$code: string;        // error code 
	$error: Error;        // error itself 
	$factor: any;         // original factor data, return by the pick from input process
	$request: any;        // original request data, with both input data and pipeline context
}
```

