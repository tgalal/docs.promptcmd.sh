# Configuration Resolution

While [Model Resolution](./model-resolution) maps to the direct model
configuration as defined in `config.toml`, a final configuration is built from
merging that with others layers of configuration from difference sources. This
gives full flexibility over where every configuration key is defined.

## Configuration Sources

The following configuration sources are supported, ordered by precedence
(replace openai and variant as needed).

1. **Defaults:** These are hardcoded, (hopefully) sane default values for common provider properties.
2. **PROMPTCMD_PROVIDERS_\*:** Non-provider specific environment variables
3. **In `config.toml` under `[providers]`:** Properties common across all providers.
4. **PROMPTCMD_OPENAI_\***: Environment variables
5. **In `config.toml` under `[providers.openai]`:** Properties for OpenAI provider
6. **PROMPTCMD_OPENAI_VARIANT_\***: Environment variables for variant
7. **In `config.toml` under `[providers.openai.variant]`:** Properties for variant
8. **In prompt file's frontmatter**: Properties for variant
9. **Command line argument**: E.g., `--config-temperature`

## General Strategy

Generally, resolution adheres to the following principles:

- Specialized configurations override general ones (e.g., variant vs base provider)
- `config.toml` takes precedence over environment variable.
- A frontmatter-defined configuration overrides both `config.toml` and any environment variable
- A command-line configuration overrides everything.

### Example

If `config.toml` contains:

```toml
[providers.openai]
temperature = 1.0
```
and an environment variable `PROMPTCMD_OPENAI_TEMPERATURE=0.5` is set, the
final configuration honors the `toml` value.

However, if additionally the prompt file contains:

```yaml
---
config:
  temperature: 0.2
---
```

or the prompt is executed with `--config-temperature 0.2`, then these take
precedence over everything else.

## Groups

When [Model Resolution](./model-resolution) results in a group, the above configuration
resolution strategy is applied to its members.


