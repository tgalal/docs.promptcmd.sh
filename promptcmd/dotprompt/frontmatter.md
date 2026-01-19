---
outline: deep
---
# Frontmatter Configuration

The YAML frontmatter defines how your prompt behaves and what parameters it accepts.

```yaml
---
# Frontmatter: YAML configuration
model: model_name
input:
  schema:
    param1: type, description
    param2?: type, optional description
---
Your prompt text here with {{param1}} and {{param2}}.
```

## Model Specification

The `model` field determines which AI provider and model to use:

```yaml
model: anthropic/claude-sonnet-4
```

Options include:

- **Provider/Model format**, e.g., `anthropic/claude-sonnet-4`, `openai/gpt-4o`, `google/gemini-pro`
- **Provider only**, e.g., `anthropic`, `openai`, `google`. The default set model for the selected provider will be used
- **Variant name**: Custom configurations you've defined (e.g., `rust-coder`, `quick-responder`)
- **Group name**: Load balancing groups (e.g., `balanced`, `weighted`)

<div class="tip custom-block" style="padding-top: 8px">

See [Model Resolution](/configuration/model-resolution) for how model names are resolved.

</div>


## Input Schema

The input schema defines the parameters your prompt command accepts. It
controls CLI argument parsing, type validation, and help text generation.

### Basic Schema Syntax

Schemas are defined in the frontmatter's `input.schema` section:

```yaml
---
input:
  schema:
    name: string, User name
    age: integer, User age in years
    verbose?: boolean, Enable detailed output
---
```

### Supported Types

#### String

::: code-group

```yaml [prompt]
---
input:
  schema:
    message: string, Message to process
    author?: string, Optional author name
---
```

```bash [command]
command --message "Hello, world!" --author "Alice"
```

:::

#### Boolean

::: code-group

```yaml [prompt]
---
input:
  schema:
    summarize?: boolean, Summarize the text
    simplify?: boolean, Simplify the text
---
```

```bash [command]
command --summarize        # summarize = true
command --simplify         # simplify = true
command                    # both = false
```

:::

#### Integer

::: code-group

```yaml [prompt]
---
input:
  schema:
    count: integer, Number of items
---
```

```bash [command]
command --count 5
```

:::

#### Number

::: code-group

```yaml [prompt]
---
input:
  schema:
    threshold?: number, Confidence threshold
---
```

```bash [command]
command --threshold 0.95
```

:::

#### Enum (Choices)

::: code-group

```yaml [prompt]
---
input:
  schema:
    level(enum, Log Level)?: [debug, info, warn, error] #optional
    format(enum, How to format the output): [json, yaml, toml]
---
```

```bash [command]
command --level info --format json
```

:::

Help output shows available choices:

```
--format <format>  How to format the output [possible values: json, yaml, toml]
--level <level>    Log Level [possible values: debug, info, warn, error]
```

### Accepting Standard Input (stdin)

Standard Input is accessible directly in the template without explicit declaration
in the input schema. Use the `stdin` helper to retrieve it:

```handlebars
Summarize the following text: {{stdin}}
```

## Output Schema

For models supporting structured output, you can describe the schema of the
output in the Frontmatter.

::: warning
Structured output is tested and working with google models. Support for others
will be added.
:::

::: code-group

```yaml [example]
---
model: google
output:
  format: json
  schema:
    person_name: string
    age: integer
    email: string
    occupation: string
---
Extract the specified information from the text below and return it in JSON
format based on the supplied schema.

Sarah Johnson is a 28-year-old software engineer currently working at TechCorp.
She has expertise in Python, JavaScript, and cloud architecture. You can reach
her at sarah.j@email.com"
```

```json [output]
{
  "email": "sarah.j@email.com",
  "age": 28,
  "occupation": "software engineer",
  "person_name": "Sarah Johnson"
}
```

:::
