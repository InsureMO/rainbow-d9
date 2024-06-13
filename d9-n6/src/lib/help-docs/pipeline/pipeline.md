## Overview

The core concept of `@rainbow-o23` is pipeline, where all logic is defined through pipeline and its steps. There are three different forms
of
pipeline based on how it is defined:

- Pipeline, which can optionally be exposed as an API. To differentiate, we generally refer to pipelines that are exposed as
  APIs as `Pipeline as API`, and pipelines that are not exposed as APIs as `pipeline`. In all documents, we will use
  this name to refer to it. If not specifically labeled as `as API`, it means that this pipeline has not been exposed as an API.
- Step set, composed of a group of steps,
- Step: based on the definition of a single step.

If defined as a pipeline and is exposed as an API, it does not allow other pipeline steps to call it, otherwise it does. Therefore, if
certain logic combinations can be reused, they should be defined as a pipeline/steps set/step.

## Common attributes

All definitions should have the following attributes:

- A `code` attribute for identification within the system, so the value of the `code` attribute is globally unique.
- A `type` attribute is used to indicate the type of this definition, and the value of the `type` attribute must be one
  of `pipeline`, `step-sets`, or `step`.
- An `enabled` attribute is used to indicate whether this definition is effective, and the value of the `enabled` attribute must be
  either `true` or `false`. If not defined, this definition is considered to be effective by default.

## Pipeline as API

If the definition contains a `route` attribute and specifies a URI, it is considered to be published as an API. A pipeline published
as an API includes all standard HTTP protocol elements:

- `route`, URI of API. Excluding the scheme, domain name, and port in the URL, the application configuration can also specify the path
  context,
	- To facilitate the definition and parsing of data contained in the `route`, you can use `pathParams` for definition. `pathParams` can
	  be a list of parameters, or you can use `true` to define receiving all valid path parameters. Please note that the definition of path
	  parameters must conform to the [nestjs](https://docs.nestjs.com/controllers#route-parameters) standard.
- `method`, supporting `get`, `post`, `put`, `patch`, and `delete`,
- `headers`, a list of headers that need to be parsed, or `true` to parse all headers,
- `queryParams`, a list of query parameters that need to be parsed, or `true` to parse all query parameters,
- `body`, the content of the HTTP body is in JSON format. To better adapt to common practices of HTTP API usage:
	- When `method` is specified as `get` and the `body` parameter is not explicitly set to `true`, the system defaults to ignoring the HTTP
	  body content,
	- When `method` is not specified as `get` and the `body` parameter is not explicitly set to `false`, the system defaults to parsing the
	  HTTP body content,
- `files`, a list of files that need to be parsed, or `true` to parse all files.

There are also some HTTP response definitions:

- `exposeHeaders`, a set of headers that need to be pushed to the client,
- `exposeFile`, indicating whether the response data is a file.

## Pipeline

If the definition does not contain a `route` attribute, it is considered a pipeline. A pipeline can be called by other pipeline steps.

A pipeline always includes at least one step, and its behavior is entirely determined by the steps defined within it.

A pipeline also has a special property `initOnly`, which if declared as `true`, indicates that this pipeline will only be
executed when the application starts, and the application will not provide any parameters during execution.

## Step set

Step set, as the name suggests, can define a set of steps. They can also define how their built-in steps are executed, typically in the
following ways:

- Synchronous serial,
- Asynchronous serial,
- Synchronous parallel,
- Conditional execution,
- Loop execution (only for input data as an array),
- Start a database transaction.

By combining the various types of step collections mentioned above, you can construct execution sequences suitable for different scenarios.

## Step

Steps can be any type of step definition, including step sets. Logically, a step set is a step which includes a set of sub steps, and
different step sets define the way their sub steps are executed. Steps are implemented by different standard step components for
different purposes. Here are some built-in standard steps:

- Retrieve values from models or remove attributes,
- Execute scripts,
- Generate snowflake IDs,
- Call predefined pipelines or steps,
- Make remote HTTP API calls,
- Read from or write to databases.

Additionally, you can also obtain the following steps support through the `@rainbow-o23` standard extension library:

- Print PDF, Word, Excel, CSV,
- Manipulate AWS S3 objects.

> The latest step support can be found on [Github](https://github.com/InsureMO/rainbow-o23).
