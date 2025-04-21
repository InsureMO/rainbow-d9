#### Environment variables

All environment variable names depend on the definitions of the `System` and `Endpoint` step variables. For convenience, using the
following
definitions, which will be used in the environment variables:

- `SYSTEM`: corresponding to the value of `System`,
- `ENDPOINT`: corresponding to the value of `Endpoint`.

Assuming the value of `System` is `s1` and the value of `Endpoint` is `order`, a system parameter
named `CFG_ENDPOINTS_{SYSTEM}_{ENDPOINT}_URL` would thus be `CFG_ENDPOINTS_S1_ORDER_URL`.

> Note that the values of `System` and `Endpoint` will be converted to uppercase, and any `.` characters will be replaced
> with `_`. Additionally, based on common practices for environment parameter definitions, the values for `System` and `Endpoint`
> cannot include `-`, `=` or whitespace characters.

This step uses the following system environment variables definition:

- `CFG_ENDPOINTS_{SYSTEM}_{ENDPOINT}_URL`: Definition of the endpoint’s URL. This URL can be a fully qualified URL or just a URL context
  or template, depending on whether and how the `Decorate URL` step variable is used to modify and obtain the final effective access URL,
- `CFG_ENDPOINTS_{SYSTEM}_GLOBAL_HEADERS`: HTTP request headers used in the step, which are global and will be used in all requests. Defined
  using the string format `key1=value[;key2=value2...[;keyN=valueN]]`,
- `CFG_ENDPOINTS_{SYSTEM}_{ENDPOINT}_HEADERS`: HTTP request headers used in the step. Defined using the string
  format `key1=value[;key2=value2...[;keyN=valueN]]`. If the same key as defined in the global definition is used, the definition here takes
  precedence, and the value in the global definition will be overwritten,
- `CFG_ENDPOINTS_{SYSTEM}_GLOBAL_TIMEOUT`: Timeout for the HTTP request in seconds. If not defined, the default value is -1, which means no
  timeout,
- `CFG_ENDPOINTS_{SYSTEM}_{ENDPOINT}_TIMEOUT`: Timeout for the HTTP request in seconds. If not defined, use the global definition instead.

> Key of headers are trimmed automatically.

> The timeout definition only takes effect when there is no `timeout` defined in the step variables.

#### Step variables

Making a remote HTTP call requires many parameter definitions, some of which are mandatory and some optional.

##### `System`

Code for accessing the remote system. Generally, a remote system provides a set of APIs. To facilitate the use of the same defined data in
different steps, the remote system needs to be defined in code first. This variable is mandatory and case-insensitive.

##### `Endpoint`

Define an endpoint code for the remote system. This code can represent a single API or a strongly related set of APIs, depending on
how `Decorate URL` is used.

##### `Decorate URL`

This variable is optional and can be used to decorate the URL of the endpoint. The value can be a JavaScript snippet that will be executed
as a JavaScript function. This function accepts the following input parameters:

- `$endpointUrl`: The URL read from the environment based on the `System` and `Endpoint` definitions, can be a fully qualified URL
  or just a
  URL context or template,
- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

This function should return the final URL to be used for the HTTP request. If this snippet is not defined, then use the URL configured in
the environment variables for access.

##### `Http method`

The HTTP method to be used for the request. This variable is mandatory and case-insensitive. It is optional, with a default value of `post`.

##### `Timeout`

The timeout for the HTTP request, in seconds. If not defined, use the timeout configured in the environment variables. If none of these are
defined, use `-1` as default, which means no timeout.

##### `Generate request headers`

This variable is optional and can be used to build the HTTP request headers. The value can be a JavaScript snippet that will be executed
as a JavaScript function. This function accepts the following input parameters:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

This function should return an object (`Record<string, string>`) containing the headers to be used in the HTTP request. If the same key as
defined in the environment definition is used, the definition here takes precedence, and the headers in the environment definition will be
overwritten. If this snippet is not defined, then use the headers in the environment definition.

> Key of headers are NOT trimmed.

Use `transparentHeaderNames` to specify the names of request headers whose values need to be transparently passed from the input
parameters to the downstream service. Separate the names with `;`. The names support using `.` for connection so that values from
multi-level objects can be directly retrieved. For example, `account.name` will retrieve the value of the `name` property from the
`account` property of the input object. When writing the values into the header values, the following rules apply:

- If the value is an array, use `, ` to connect the elements. `null` and empty strings will be filtered out.
- If the value is an object, use the object's keys to generate multiple headers. `null` and empty strings will be filtered out.
- For other values, convert them to strings. `null` and empty strings will be filtered out.
- Note that an empty string does not include blank strings, and no automatic trimming will be performed.

If the `transparentHeaderNames` at the step level is not defined, use the definition in
`endpoints.SYSTEM.ENDPOINT.headers.transparent`. If it is also not defined at the endpoint level, use the definition in
`endpoints.SYSTEM.global.headers.transparent`.

After obtaining the transparently passed request headers, check the definition of `omittedTransparentHeaderNames`. If it is defined,
remove the corresponding headers from the headers. `omittedTransparentHeaderNames` is case-insensitive. Similarly, if the
`omittedTransparentHeaderNames` at the step level is not defined, use the definition in
`endpoints.SYSTEM.ENDPOINT.headers.transparent.omitted`. If it is also not defined at the endpoint level, use the definition in
`endpoints.SYSTEM.global.headers.transparent.omitted`.

For example:
If the input data contains `{account: {name: 'John', token: '******'}}` and `transparentHeaderNames` is defined as `account`, then two
transparently passed headers will be obtained: `name=John` and `token=******`. At this time, if `omittedTransparentHeaderNames` is defined
as `name`, the headers that will be finally transparently passed to the downstream service are `token=******`, and `name` will be ignored.

So there are three ways to transmit request headers to downstream services. In order of priority from high to low, they are
`headersGenerate`,
`headers.transparent`, and `headers`. If a header appears in a higher-priority method, the header with the same name generated by a
lower-priority method will be ignored. Note that the matching is case-sensitive.

Normally, if you need to transparently pass the request headers from the client to the downstream service, you should use `headers: true` in
the pipeline definition. Then you can directly use `transparentHeaderNames: headers` to obtain all the request headers, and then use
`omittedTransparentHeaderNames` for necessary filtering.

> It should be noted that since the fetch step initiates a new request to the downstream service, its request structure and data will be
> modified or reset according to requirements. Therefore, even if you need to transparently pass the request headers, some of the headers
> are still not applicable. So by default, the two headers `content-encoding` and `content-length` will be filtered out. No matter how the
> request headers are generated in the above process, these two headers are always automatically generated by `node-fetch`.

##### `Use request body`

Specify whether the HTTP request uses the HTTP body content. This variable is optional and follows these rules:

- Not defined: For requests other than `GET`, use the HTTP body by default,
- `true`: Always use the HTTP body, regardless of the request method,
- `false`: Always avoid using the HTTP body, regardless of the request method.

> How to generate the HTTP body content is referenced by the definition of the `generateBody` variable.

##### `Generate request body`

This variable is optional and can be used to build the HTTP request body. The value can be a JavaScript snippet that will be executed
as a JavaScript function. This function accepts the following input parameters:

- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

This function could return anything. If the returned data is not `null`, `undefined`, and not a string, use `JSON.stringify` to convert it
to a string. `null` and `undefined` essentially represent the absence of an HTTP body. If this snippet is not defined, the default behavior
is to use `$factor` as the HTTP body after processing it accordingly.

##### `Read response body`

This variable is optional and can be used to read the HTTP response. The value can be a JavaScript snippet that will be executed
as a JavaScript function. This function accepts the following input parameters:

- `$response`: The response (`Response`, check [node-fetch](https://www.npmjs.com/package/node-fetch) for more details) object from the HTTP
  request,
- `$factor`: The content portion of the request data, excluding context data,
- `$request`: The entire request data, including both content and context,
- `$helpers` or `$`: Data manipulation helpers.

This function could return anything, and the returned data will be used as output data of this step. If this snippet is not defined, the
response should be read as JSON by `Response.json()`. It is important to note that the response body will only be read if the response
status is in the normal range (`1xx`, `2xx`, `3xx`); otherwise, it will skip to the error handling.

> It is an async function, so `await` is available inside.

##### `Response error handling`

Error handling for different HTTP response statuses is generally implemented in a way that only `4xx` and `5xx` statuses trigger
error handling. Each exception handling snippet is designed for a specific status; if a status does not have a defined handler, a
default `UncatchableError` will be thrown, with an error code of `O03-00010`. Error handling can either rethrow the original exception,
wrap the exception and rethrow it, or return data normally. If data is returned normally, it will be used as the output data for this step.

There are two special cases:

- If the request times out, the status is `600`,
- If the exception is not caused by the request itself, such as an exception thrown due to a problem with a certain configuration logic,
  then,
	- If the exception type is `UncatchableError`, no further handling will be performed and the exception will be directly thrown to the
	  outer layer,
	- Otherwise, use the exception handler with status `000` for processing.

> DO NOT rethrow an error that is not an `UncatchableError` from the error handler, as it will be caught again by the error handler with
> status `000`, which could lead to confusion.

The following parameters can be used during the build process:

- `$options`: The content portion of `$errorCode`, `$url`, `$factor`, `$request`, `$response` data,
- `$helpers` or `$`: Data manipulation helpers.

> All handlers are async functions, so `await` is available inside.

#### Returning

The step's return data is from the response of the HTTP request or error handling.

> The returned data can still be further processed during the `Write to output` stage.

${transformer}

${errorHandles}
