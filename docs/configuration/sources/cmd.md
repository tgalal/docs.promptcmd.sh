# Configuration via Command-line Arguments

You can configure most of the (provider) options by passing configuration
parameters during execution of any prompt.

Here is an excerpt from the help output of a prompt command:

```
Optional Configuration Overrides:
  -m, --config-model <model>
      --config-stream
      --config-no-stream
      --config-cache-ttl <cache_ttl>
      --config-temperature <temperature>
      --config-max-tokens <max_tokens>
      --config-system <system>
```

Supported Command-line configuration correspond to [Global Provider
Settings](./config.toml#global-provider-settings) section in the configuration
file.

::: warning Resolution Priority
Configurations passed via command line have the highest precedence across all
configuration sources. For more info see [Config
Resolution](/configuration/config-resolution).
:::


