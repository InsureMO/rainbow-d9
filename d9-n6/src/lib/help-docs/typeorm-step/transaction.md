TypeORM steps use transaction names to identify transactions, steps can be grouped under a transaction. Essentially, steps within a
transaction should be nested in a TypeORM transactional step and have the same transaction name.

> Transactional steps can be nested, meaning a transactional step can contain another transactional step as a sub-step, even if they have
> different transaction names.
