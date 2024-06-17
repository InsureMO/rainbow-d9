To accept uploaded files, multiple attributes are required:

- Specify name: Each line represents a name. For multiple names, define them on separate lines,
- Each name can specify a max count by appending a colon followed by a number after the name,
	- `<= 0` indicates unlimited files for that name,
	- `>= 1` indicates a maximum count,
- Specify maximum file size: Use plain numbers for bytes, or append `k`, `K`, `m`, `M` for kilobytes and megabytes,
- Specify file type [mime type](https://docs.nestjs.com/techniques/file-upload#file-validation): Separate multiple types with commas or
  semicolons.

> The maximum file size and file type specifications apply to all files.

> When defining upload file parameters, due to HTTP protocol specifications requiring the use of Form Data, the `body` supports only
> key-value pairs. Therefore, the parsed data forms a single-layer JSON object and no longer retains a multi-layered structure.
