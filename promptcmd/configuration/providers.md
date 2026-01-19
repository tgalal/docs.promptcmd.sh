# Base Providers

promptcmd supports multiple AI providers, allowing you to use different models
based on your needs, costs, and availability.

## Anthropic (Claude)

### Configuration

```toml
# config.toml
[providers.anthropic]
api_key = "sk-ant-api03-..."
```

### Usage

Reference models using the format `anthropic/model-name`.

Examples:

- `anthropic/claude-sonnet-4`
- `anthropic/claude-opus-4`
- `anthropic/claude-haiku-4`

In prompt file:

```yaml
---
model: anthropic/claude-sonnet-4
---
Your prompt here
```

### Getting an API Key

1. Go to https://console.anthropic.com/settings/keys
2. Sign up or log in to your account
3. Navigate to API Keys and create a new key
4. Copy the key and add it to your configuration file

## OpenAI

### Configuration

In addition to the api_key you can change the endpoint to another
OpenAI-compatible API.

```toml
[providers.openai]
api_key = "sk-..."
endpoint = "https://api.openai.com/v1"
```

### Usage Models

Reference models using the format `openai/model-name`.

Exapmles:

- `openai/gpt-4o`
- `openai/gpt-4o-2024-08-06`
- `openai/gpt-4-turbo`
- `openai/gpt-3.5-turbo`

### Getting an API Key

1. Go to https://platform.openai.com/settings/organization/api-keys
2. Sign up or log in to your account
3. Create a new key
4. Copy the key and add it to your configuration file:

### Usage in Prompts

```yaml
---
model: openai/gpt-4o
---
Your prompt here
```

## Google (Gemini)

### Configuration

```toml
[providers.google]
api_key = "..."
```

### Usage Models

Reference models using the format `google/model-name`.

Examples:

- `google/gemini-pro`
- `google/gemini-flash`
- `google/gemini-ultra`

### Getting an API Key

1. Go to https://aistudio.google.com/api-keys
2. Sign up or log in to your account
3. Create a new key
4. Copy the key and add it to your configuration file:

## OpenRouter

OpenRouter provides access to multiple AI providers through a single API.

### Configuration

```toml
[providers.openrouter]
api_key = "sk-or-..."
```

### Usage Models

OpenRouter supports many models. Reference using `openrouter/provider/model`.

Examples:

- `openrouter/anthropic/claude-sonnet-4`
- `openrouter/openai/gpt-4o`
- `openrouter/google/gemini-pro`
- `openrouter/meta-llama/llama-3-70b`

### Getting an API Key

1. Go to https://openrouter.ai/settings/keys
2. Sign up or log in to your account
3. Create a new key
4. Copy the key and add it to your configuration file:

## Ollama (Local Models)

Run AI models locally without API costs.

### Configuration

```toml
[providers.ollama]
endpoint = "http://localhost:11434"
```

### Usage Models

Reference any model you've pulled by ollama using `ollama/model-name`.

Examples:

- `ollama/llama3`
- `ollama/codellama`
- `ollama/mistral`
- `ollama/phi3`

## Multi-Provider Setup

Configure multiple providers for flexibility:

```toml
[providers]
temperature = 0.7
max_tokens = 1000

# Configure multiple providers
[providers.anthropic]
api_key = "sk-ant-xxx"
model = "claude-sonnet-4" # Default when non specified

[providers.openai]
api_key = "sk-xxxxx"

[providers.google]
api_key = "sk-xxxxx"

[providers.ollama]
endpoint = "http://localhost:11434"
```
