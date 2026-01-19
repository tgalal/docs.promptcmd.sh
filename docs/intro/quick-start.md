# Quick Start

This guide will help you create your first prompt and start using promptcmd.

::: info
Before starting, make sure you have: you have successfully
[installed](installation) promptcmd.
:::

## Minimal Configuration

There are [multiple ways](/configuration/) to configure promptcmd. For
this tutorial we will use a configuration file.
Start by edit your configuration file via the following:

```shell
promptctl config edit
```

This will load a sample configuration in your text editor with all options
commented out.

::: info
You can select a different text editor through the `EDITOR` environment
variable. You can also manually create/edit this file. Use `promptctl config ls`
to determine its location.
:::

A minimal configuration (e.g., for anthropic) should contain something like:

```toml
[providers.anthropic]
api_key = "your-key"
```

## Create Your First Prompt

Let's create a simple prompt that summarizes text:

```bash
promptctl create summarize
```

## Define the Prompt Template

Add the following content to the prompt file:

```yaml
---
model: anthropic/claude-sonnet-4
input:
  schema:
    words?: integer, Summary length
---
Summarize the following text{{#if words}} in {{words}} words{{/if}}:

{{STDIN}}
```

Save and close the editor.

## Use Your New Command

Now you can execute your `summarize` command like any other CLI tool:

::: code-group
``` [help]
$ summarize --help

Usage: summarize [OPTIONS]

Prompt inputs:
      --words <words>   Summary length
```

```bash [execute]
# Summarize a file
cat article.txt | summarize

# Summarize with a specific length
echo "Long text here..." | summarize --words 10
```
:::

## Understanding the Prompt Structure

Let's break down what we just created:

### Frontmatter (YAML Header)

```yaml
---
model: anthropic/claude-sonnet-4
input:
  schema:
    words?: integer, Summary length
---
```

- **`model`**: Specifies which AI model to use
- **`input.schema`**: Defines command-line arguments
- **`words?: integer`**: Creates an optional `--words` argument that accepts integers.

### Template Body

```
Summarize the following text{{#if words}} in {{words}} words{{/if}}:

{{STDIN}}
```

- **<code v-pre>{{#if words}}...{{/if}}</code>**: Conditional logic using Handlebars
- **<code v-pre>{{words}}</code>**: Inserts the value of the `--words` argument
- **<code v-pre>{{STDIN}}</code>**: Where piped input is inserted

## Test Without API Calls

Use dry-run mode to test your prompts without making API calls:

```bash
echo "Test text" | summarize --dry
```

This shows what would be sent to the AI provider without actually sending it.

## Next Steps

Now that you've created your first prompt, explore:

- **[Configuration](/configuration/)** - More on Configuration
- **[Dotprompt Files](/dotprompt/)** - More on Dotprompt format
