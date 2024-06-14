The route of the API, excluding the HTTP protocol scheme, domain name, and port parts. The context of the URL path can also be
specified via the system environment variable `CFG_APP_CONTEXT`.

> It should start with `/`.

`route` syntax can be referenced from [nestjs - routing](https://docs.nestjs.com/controllers#routing)
and [nestjs - route parameters](https://docs.nestjs.com/controllers#route-parameters), as well
as [express](https://expressjs.com/en/guide/routing.html). Generally, there are the following rules:

- Use regex for matching, but it's not recommended.
- Define parameters with `:` prefix, for example `:name`, ensuring parameter names conform to the regex pattern `[A-Za-z0-9_]`.
- For parsing multiple parameters, use `/`, `.`, or `-` as separators. 
