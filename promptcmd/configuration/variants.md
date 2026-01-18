# Variants

Variants are specialized model configurations that inherit from [Base
Providers](providers). They allow you to create reusable configurations with
custom system prompts (e.g., for different personalities), temperature
settings, and other parameters tailored for specific tasks.

## What Are Variants?

Instead of specifying provider settings in each prompt, variants let you:

- **Define once, use everywhere**: Create specialized configs like `rust-coder`, `quick-responder`, or `formal-writer`
- **Override settings**: Change temperature, cache_ttl, ..etc
- **Simplify prompts**: Reference by name instead of full provider/model paths
- **Maintain consistency**: Ensure the same settings across related prompts

## Creating Variants

Variants are defined in your `config.toml` as subsections of providers:

```toml
[providers.{provider}.{variant-name}]
```

### Basic Variant

```toml
[providers.anthropic.quick]
system = "Be extremely brief and direct."
temperature = 0.3
max_tokens = 500
```

Usage in prompts:

```yaml
---
model: quick  # Instead of anthropic/claude-sonnet-4
---
{{STDIN}}
```

You can create as many variants per base provider as you need.

## Variant Configuration Options

All provider settings can be overridden in variants:

```toml
[providers.anthropic.my-variant]
system = "Custom system prompt"
temperature = 0.7
max_tokens = 2000
cache_ttl = 60
```

## Using Variants in Prompts

Reference variants by name in your prompt frontmatter:

```yaml
---
model: rust-coder
---
Generate a Rust function that {{STDIN}}
```

This is equivalent to but much simpler than:

```yaml
---
model: anthropic/claude-sonnet-4
temperature: 0.2
max_tokens: 3000
system: |
  Rust coding assistant.
  Follow Rust idioms and best practices...
---
Generate a Rust function that {{STDIN}}
```

## Next Steps

- **[Caching](caching.md)** - Optimize variant responses with caching
- **[Configuration Reference](/configuration/sample)** - Complete config options
- **[Load Balancing](load-balancing.md)** - Distribute requests across multiple providers
