# Model Resolution

When you specify a model name (e.g., in prompt file), promptcmd tries to
resolve it to a specific configuration defined in your `config.toml`.

## Resolution Strategy

Resolution takes place in this order:

1. **Parse as provider/model**: If in `provider/model-name` format, extract the
   provider and model name, otherwise:
2. **Check for variant**: Is there a variant with this name? otherwise:
3. **Check for group**: Is there a load balancing group with this name?

If the resolution result is a group, each group member is resolved by name
again, according to the above strategy (excluding step 3, since there cannot be
nested groups).

::: info
During execution, if resolution results in a group configuration, the Load
Balancer decides which group member to use.
:::

## Test resolution

Use the following command to see what a specified name resolves to:

```bash
promptctl resolve openai
promptctl resolve anthropic/claude-sonnet-4
promptctl resolve group_name
promptctl resolve variant_name
```
