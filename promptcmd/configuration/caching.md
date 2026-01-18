# Caching

promptcmd includes built-in response caching to reduce API costs and improve response times for identical requests. When caching is enabled, identical prompts with the same parameters return cached responses instead of making new API calls.

## How Caching Works

When you run a prompt:

1. promptcmd generates a cache key based on:
   - Prompt content
   - Model configuration
   - Input parameters
   - STDIN content

2. If a cached response exists and hasn't expired, it's returned immediately
3. Otherwise, the request is sent to the AI provider and the response is cached

## Enabling Caching

### Global Caching

Enable caching for all providers:

```toml
[providers]
cache_ttl = 60  # Cache for 60 seconds
```

Set to `0` to disable caching globally:

```toml
[providers]
cache_ttl = 0  # No caching
```

### Provider-Specific Caching

Override global settings per provider:

```toml
[providers]
cache_ttl = 30  # Global: 30 seconds

[providers.anthropic]
cache_ttl = 60  # Anthropic: 60 seconds

[providers.openai]
cache_ttl = 15  # OpenAI: 15 seconds

[providers.ollama]
cache_ttl = 0  # Ollama: No caching
```

### Variant-Specific Caching

Fine-tune caching per variant:

```toml
[providers]
cache_ttl = 20

[providers.anthropic]
cache_ttl = 40

[providers.anthropic.frequently-used]
cache_ttl = 120  # Cache for 2 minutes

[providers.anthropic.always-fresh]
cache_ttl = 0  # Never cache
```

