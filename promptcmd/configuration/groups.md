# Groups & Load Balancing

Load balancing allows you to distribute load across multiple AI providers.
This helps optimize costs and avoid rate limits.

::: info
Distribution is based on the total amount of tokens consumed by
referenced models in the group.
:::



## Defining Load Balancing Groups

Define in your `config.toml` (currently not configurable elsewhere).
The general syntax can be in compact or expanded form as follows:


::: code-group

```toml [compact]
[groups.{group-name}]
models = [model1, model2, ...]
```

```toml [expanded]
[groups.{group-name}]
models = [
  { name = "openai", weight = 1 },
  { name = "anthropic", weight = 2 }
]
```

:::

::: info
The referenced model names are resolved to full model names the same way Model
Resolution takes place. Their respective configuration are as well resolved according
to [Config Resolution](/configuration/config-resolution) rules.
:::

## Example: Equal Distribution

The following defines a group called `balanced` that evenly distributes load
across `anthropic` and `openai`.

```toml
[groups.balanced]
models = ["anthropic", "openai"]
```

### Multiple Providers

```toml
[groups.all-providers]
models = ["anthropic", "openai", "google"]
```

Each provider receives approximately 33% of the load.

## Example: Weighted Distribution

Give more requests to specific providers:

```toml
[groups.weighted]
providers = [
  { name = "openai", weight = 1 },
  { name = "anthropic", weight = 2 }
]
```

In this example:

- **anthropic**: 66% of requests (weight 2 out of 3 total)
- **openai**: 33% of requests (weight 1 out of 3 total)

## Usage of  Groups

A group can be referenced by using its name as the model name whereever a model
name can be configured.

For example in a prompt file:

```yaml
---
model: balanced
---
Your prompt here
```
