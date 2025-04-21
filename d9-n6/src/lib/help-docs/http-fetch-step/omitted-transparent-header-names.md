After obtaining the transparently passed request headers, check the definition of `omittedTransparentHeaderNames`. If it is defined,
remove the corresponding headers from the headers. `omittedTransparentHeaderNames` is case-insensitive. Similarly, if the
`omittedTransparentHeaderNames` at the step level is not defined, use the definition in
`endpoints.SYSTEM.ENDPOINT.headers.transparent.omitted`. If it is also not defined at the endpoint level, use the definition in
`endpoints.SYSTEM.global.headers.transparent.omitted`.

For example:
If the input data contains `{account: {name: 'John', token: '******'}}` and `transparentHeaderNames` is defined as `account`, then two
transparently passed headers will be obtained: `name=John` and `token=******`. At this time, if `omittedTransparentHeaderNames` is defined
as `name`, the headers that will be finally transparently passed to the downstream service are `token=******`, and `name` will be ignored.
