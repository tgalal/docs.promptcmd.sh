---
outline: 'deep'
---
# promptcmd

promptcmd is a **manager** and **executor** for programmable prompts.

::: code-group

```yaml [translate.prompt]
---
input:
  schema:
    to: string, Target language
    summarize?: boolean, Whether to also summarize the text
---

{{#if summarize}}
  Translate the following to {{to}} in a summarized form:
{{else}}
  Translate the following to {{to}}:
{{/if}}

{{stdin}}
```

``` [generated command]
Usage: translate [OPTIONS] --to <to>

Prompt inputs:
      --to <to>       Target language
      --text <text>   Text to translate. will use stdin if not specified
      --summarize     Whether to also summarize the text
```

:::

## Why promptcmd?

### Prompt Management

At the simplest form, promptcmd provides a powerful interface for managing your prompts in one place.
Prompts can be created, edited, and recalled using the simple `promptctl` interface.

### Programmable Prompts

Prompt files use `DotPrompt` format. The prompts are essentially templates with
parameterized inputs that control the generation of a final prompt. This
enables an efficient management of prompts, preventing duplications and
reducing work when multiple prompts share parts in common.

### Execution & Pipeline Integration

In addition to managing prompts, `promptcmd` can transform a prompt into a
familiar command-line program, where the arguments are used in generating the
final prompt. This enables seamless integration of prompts as seemingly native
commands into pipelines. Execution further comes with useful features such as
load balancing across several LLM providers and caching responses.

### Inversion of Control

Inverting control by pre-fetching and embedding necessary information directly
into prompts offers advantages over tool-calling for certain use cases. For
many it provides provides peace of mind through explicit control over what data
the model accesses, eliminating concerns about unintended API calls or resource
consumption. It also improves reproducibility: with all context predetermined,
the same prompt yields consistent results, enabling reliable testing and
debugging.

