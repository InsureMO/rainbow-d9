Retrieve the value of a specified property name from the input data. Property names can be connected with dots (`.`) to denote multiple
hierarchical levels. For example,

```ts
const x = {a: {b: [{c: 3}, {c: 4}]}};
// define property as 'a', get { b: [ { c: 3 }, { c: 4 } ] }
// define property as 'a.b', get [ { c: 3 }, { c: 4 } ]
// define property as 'a.b.c', get [ 3, 4 ]
```
