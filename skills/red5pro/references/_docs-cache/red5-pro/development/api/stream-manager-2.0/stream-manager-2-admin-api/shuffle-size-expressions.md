_From: Stream Manager 2.0 Admin API_

## Shuffle Size Expressions

A **Shufle Size Expression** uses a single metric (or none at all): `nodeCount`. The result is an integer value, which represents the maximum number of the available servers to consider "best" before shuffling for return in **Get Server For Publish** or **Get Server For Subscribe** requests (see Streams doc.)

The **operators** `+`, `-`, `*`, and `/` are allowed, with conventional precedence. As well as parentheses `(` and `)` to specify order of precedence.

Two mathematical **functions** are implemented:

`min`: `min(a, b)` retuns the minimum value, a or b.

`max`: `max(a, b)` returns the maximum value, a or b.

### Rule of Thumb for Shuffle

As a rule of thumb, if your NodeGroup will be small you may as well use a constant value. If you have more nodes, then use a percentage of the available nodes (which will be determined when a request for a server arrives). Use the `max()` function to guarantee the value will be no less than  -- paradoxically -- some minimum.

Consider how many nodes that might be considered "available" for a given request by the streams service. That is, consider the sum of all `max` for all roles in all regions that have capability `PUBLISH`, and separately the corresponding sum for nodes with capability `SUBSCRIBE`. Consider the maximum of these two sums. This is the maximum number of nodes that could theoretically ever be "available" for any given request.

If the number of nodes is less than or equal to five, use 
```
"shuffleSizeExpression": "1"
```

If the number of nodes is more than five but less than or equal to ten, use
```
"shuffleSizeExpression": "2"
```

If the number of nodes is more than ten, use
```
"shuffleSizeExpression": "max(nodeCount*0.1, 2)"
```

### Example Shuffle Size Expressions

**Expression:** `2`
**Result:** `2`

**Expression:** `nodeCount * 0.1`
**Result:** `3`

**Expression:** `min(nodeCount * 0.1, 5)`
**Result:** `5`

**Expression:** `max(nodeCount * 0.1, 2)`
**Result:** `3`

### Metric values for above examples

`nodeCount`: `30`
