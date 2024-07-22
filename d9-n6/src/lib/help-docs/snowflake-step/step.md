### Snowflake step

The snowflake pipeline step is used to generate a unique, incrementing sequence number. This sequence number is typically used for scenarios
such as database primary keys or unique identifiers in memory. The sequence number is of type string and contains only numeric characters.

> Monotonic increment is limited to within a single node.

#### Environment variables

This step uses the following system environment variable definition:

- `CFG_SNOWFLAKE_SHARD_ID`: A number between `0` and `1023`, optional, with a default value of `1`. In a multi-node scenario, each node
  should be assigned a different shard id to ensure that the sequence numbers do not conflict.

#### Step variables

This step does not use any step variables.

#### Returning

A string containing a unique serial number.

> Typically, need to specify a merge property in the `Write to output` step for use in subsequent pipeline steps.

${transformer}

${errorHandles}
