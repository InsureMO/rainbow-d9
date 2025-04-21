Specify the names of request headers whose values need to be transparently passed from the input
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