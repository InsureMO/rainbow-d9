## Overview

The core concept of `rainbow-o23` is pipeline, where all logic is defined through pipeline and its steps. There are three different forms of
pipeline based on how it is defined:

- Standard pipeline, which can optionally be exposed as a RESTful API. To differentiate, we generally refer to pipelines that are exposed as
  RESTful APIs as `pipeline`, and pipelines that are not exposed as RESTful APIs as `independent pipeline`. In all documents, we will use
  this name to refer to it. If not specifically labeled as `independent`, it means that this pipeline has been exposed as a RESTful API.
- Set of steps, composed of a group of steps,
- Independent step: based on the definition of a single step.

If a pipeline is exposed as an API, it does not allow other pipeline steps to call it, otherwise it does. Therefore, if certain logic
combinations can be reused, they should be defined as an independent pipeline/set of steps/independent step.

## Common attributes

All definitions should have the following attributes:

- A `code` attribute for identification within the system, so the value of the `code` attribute is globally unique.
- A `type` attribute is used to indicate the type of this definition, and the value of the `type` attribute must be one
  of `pipeline`, `step-sets`, or `step`.
- An `enabled` attribute is used to indicate whether this definition is effective, and the value of the `enabled` attribute must be
  either `true` or `false`. If not defined, this definition is considered to be effective by default.

## Pipeline

If the definition contains a `route` attribute and specifies a URI, it is considered to be published as a RESTful API. A pipeline published
as a RESTful API includes all standard HTTP protocol elements:

- `route`, URI of API. Excluding the scheme, domain name, and port in the URL, the application configuration can also specify the path
  context,
	- To facilitate the definition and parsing of data contained in the `route`, you can use `pathParams` for definition. `pathParams` can
	  be a list of parameters, or you can use `true` to define receiving all valid path parameters. Please note that the definition of path
	  parameters must conform to the [nestjs](https://docs.nestjs.com/controllers#route-parameters) standard.
- `method`, supporting `get`, `post`, `put`, `patch`, and `delete`,
- `headers`, a list of headers that need to be parsed, or `true` to parse all headers,
- `queryParams`, a list of query parameters that need to be parsed, or `true` to parse all query parameters,
- `body`, the content of the HTTP body is in JSON format. To better adapt to common practices of RESTful API usage:
	- When `method` is specified as `get` and the `body` parameter is not explicitly set to `true`, the system defaults to ignoring the HTTP
	  body content,
	- When `method` is not specified as `get` and the `body` parameter is not explicitly set to `false`, the system defaults to parsing the
	  HTTP body content,
- 