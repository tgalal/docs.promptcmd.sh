# Configuration File

promptcmd uses a single TOML configuration file to manage all settings,
including provider credentials, global parameters, variants, and load balancing
groups.

## File Location

You can create/edit your configuration simply via:

```bash
promptctl config edit
```

Or by manually creating/editing the file.

### Linux

```
~/.config/promptcmd/config.toml
```

### macOS

```
~/Library/Application Support/promptcmd/config.toml
```

### Windows

```
%APPDATA%\promptcmd\config.toml
```

## Basic Structure

A minimal configuration file looks like:

```toml

[providers.anthropic]
api_key = "sk-ant-api03-..."
```

## Global Provider Settings

Settings that apply to all providers unless overridden:

```toml
[providers]
temperature = 0.7       # Sampling temperature (0.0 - 1.0)
max_tokens = 1000       # Maximum tokens in response
cache_ttl = 20          # Cache time-to-live in seconds
```

### Temperature

Controls randomness in responses:

- **0.0**: Deterministic, focused responses
- **0.5**: Balanced creativity and consistency
- **1.0**: Maximum creativity and randomness

```toml
[providers]
temperature = 0.3  # Lower for code, higher for creative writing
```

### Max Tokens

Maximum length of model responses:

```toml
[providers]
max_tokens = 2000  # Adjust based on your needs
```

### Cache TTL

How long to cache identical requests (in seconds):

```toml
[providers]
cache_ttl = 60  # Cache for 60 seconds
```

Set to `0` to disable caching.

## Provider-specific Configuration

Configure individual AI providers with their specific settings.

### Anthropic (Claude)

```toml
[providers.anthropic]
api_key = "sk-ant-api03-..."
```

Optional settings:

```toml
[providers.anthropic]
api_key = "sk-ant-api03-..."
endpoint = "https://api.anthropic.com"  # Custom endpoint
temperature = 0.5                        # Override global
max_tokens = 4000                       # Override global
cache_ttl = 30                          # Override global
```

### OpenAI (GPT Models)

```toml
[providers.openai]
api_key = "sk-..."
endpoint = "https://api.openai.com/v1"
```

### Google (Gemini)

```toml
[providers.google]
api_key = "..."
```

### OpenRouter

```toml
[providers.openrouter]
api_key = "sk-or-..."
endpoint = "https://openrouter.ai/api/v1"
```

### Ollama (Local Models)

```toml
[providers.ollama]
endpoint = "http://localhost:11434"
```

For Ollama, no API key is needed since it runs locally.

## Configuration Hierarchy

Settings cascade from general to specific:

```toml
# Global defaults
[providers]
temperature = 0.7
max_tokens = 1000
cache_ttl = 20

# Provider-specific overrides
[providers.anthropic]
api_key = "sk-ant-..."
temperature = 0.5      # Overrides global for Anthropic

# Variant-specific overrides
[providers.anthropic.fast-responder]
temperature = 0.3      # Overrides both global and provider
max_tokens = 500
system = "Be extremely brief."
```

Priority order (highest to lowest):

1. **Variant settings** (most specific)
2. **Provider settings**
3. **Global settings** (least specific)

