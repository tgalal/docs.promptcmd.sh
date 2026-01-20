# Monitoring Usage

Track API usage, token consumption, and performance metrics across all your
prompts and providers using `promptctl stats`.

## View All Statistics

Track usage across all providers and models:

```bash
$ promptctl stats

provider      model                     runs     prompt tokens     completion tokens     avg tps
anthropic     claude-opus-4-5           15       1988              1562                  31
openai        gpt-5-mini-2025-08-07     2        88                380                   42
```

This shows:
- **provider**: The LLM provider used
- **model**: The specific model invoked
- **runs**: Number of times the prompt was executed
- **prompt tokens**: Total input tokens consumed
- **completion tokens**: Total output tokens generated
- **avg tps**: Average tokens per second (throughput, indicating generation speed)

::: info
Statistics are stored in `~/.promptcmd/stats.db`. See [Lookup
Paths](/intro/lookup-paths) for more details on file locations.
:::

## View Last Execution

View statistics for the most recent prompt execution:

```bash
$ promptctl stats --last

provider      model               prompt tokens     completion tokens     time
anthropic     claude-opus-4-5     206               168                   5
```

The **time** column shows the execution duration in seconds. This is useful for
debugging or understanding the token usage and performance of a specific prompt
run.

## Dry Run Testing

You can test prompts using `promptctl run --dry` to preview what will be sent
without calling the API:

```bash
$ promptctl run --dry PROMPTNAME -- [PROMPT ARGS]
```

This lets you validate your prompt template and arguments without consuming
tokens or incurring API costs. See [Executing
Prompts](/usage/exec#dry-run-mode) for more details on dry run mode with
other execution methods.

## Caching

See [Caching](/configuration/caching)
