# Environment Variables

You can configure promptcmd almost entirely using environment variables, and
without a `config.toml` being present on disk. In this page you find all the
environment variables looked up by promptcmd for configuration.

## Common Provider's Env Variables

These correspond to the configuration keys you'd set in the `config.toml` under
`[providers]`, namely:

- `PROMPTCMD_PROVIDERS_TEMPERATURE`
- `PROMPTCMD_PROVIDERS_SYSTEM`
- `PROMPTCMD_PROVIDERS_MAX_TOKENS`
- `PROMPTCMD_PROVIDERS_MODEL`
- `PROMPTCMD_PROVIDERS_CACHE_TTL`
- `PROMPTCMD_PROVIDERS_API_KEY`

The variables are going to be used regardless of the final provider being
selectedd.

## Provider-Specific Env Variables

Use these to configure providers individually (e.g., corresponding to
`[providers.anthropic]` in `config.toml`). Replace `ANTHROPIC` with
your intended provider:

- `PROMPTCMD_ANTHROPIC_TEMPERATURE`
- `PROMPTCMD_ANTHROPIC_SYSTEM`
- `PROMPTCMD_ANTHROPIC_MAX_TOKENS`
- `PROMPTCMD_ANTHROPIC_MODEL`
- `PROMPTCMD_ANTHROPIC_CACHE_TTL`
- `PROMPTCMD_ANTHROPIC_API_KEY`

If both Provider-Specific and Common Provider's env variables are set, the
Provider-Specific ones takes precedence when that provider is being used.

## Variant-Specific Env Variables

Use these to configure variants. Replace `GOOGLE` and `CODER` with
your desired provider and variant name.

- `PROMPTCMD_GOOGLE_CODER_TEMPERATURE`
- `PROMPTCMD_GOOGLE_CODER_SYSTEM`
- `PROMPTCMD_GOOGLE_CODER_MAX_TOKENS`
- `PROMPTCMD_GOOGLE_CODER_MODEL`
- `PROMPTCMD_GOOGLE_CODER_CACHE_TTL`
- `PROMPTCMD_GOOGLE_CODER_API_KEY`

If both Variant-Specific and Provider-Specific variables are set, the
Variance-Specific ones takes precedence when that variant is being used.

## Mixing Environment Variables with Other Configuration Sources

You can specify some configuration using environment variables, and others by
other means. For example, it is common practice to specify an api key as an
environment variable (e.g., when running a docker container), but fix the rest
of the arguments by other means.

To see how different configuration sources merge together, see [Config
Resolution](/configuration/config-resolution).

