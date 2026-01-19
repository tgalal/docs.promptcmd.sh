---
outline: deep
---
# Template Syntax

A template is the section of a prompt file following the Frontmatter.

```yaml
---
# Frontmatter: YAML configuration
input:
  schema:
    param1: type, description
    param2?: type, optional description
---
Your templated prompt here with {{param1}} and {{param2}}.
```

Templates uses [Handlebars](https://handlebarsjs.com/) syntax for dynamic
content generation based on the [input schema](frontmatter#input-schema) and
available [helpers](/dotprompt/templates#helpers).

## Template Basics

Within a template you will primarily make use of the parameters defined in your
input schema.

### Variable Substitution

The simplest usage is direct variable substitution where you
directly render the inputs:

```yaml [translate.prompt]
---
input:
  schema:
    lang: string, Target language
    text: string, Text to translate
---
Translate the following text to {{lang}}:

{{text}}
```

### Conditionals

You might also want to conditionally render parts of the template based a boolean
input, or whether an optional parameter has been set:

```yaml [translate.prompt]
---
input:
  schema:
    lang: string, Target language
    source-lang?: string, Source language, leave blank to auto detect
    text: string, Text to translate
    summarize?: boolean, Wheter to also summarize the text
---
{{#if source-lang}}
  Translate the given text from {{source-lang}} to {{lang}}
{{else}}
  Translate the given text to {{lang}}
{{/if}}

{{#if summarize}}
  Produce a summarized version of the translation.
{{/if}}

Here is the text:

{{text}}
```

### Comments

Add comments that won't be included in the generated prompt:

```handlebars
{{!-- This is a comment --}}
```

### Standard Input (stdin)

Standard Input is accessible via the stdin helper:

```yaml [translate.prompt]
---
input:
  schema:
    lang: string, Target language
    text?: string, Text to translate, will default to stdin if not given
---
Translate the following text to {{lang}}:

{{#if text}}
  {{text}}
{{else}}
  {{stdin}}
{{/if}}

```

## Helpers

Template helpers enable customizations in templates that go beyond basic
variable substitution.

### Basic Helpers
- **<code v-pre>{{#if words}}...{{/if}}</code>**: Conditional logic using Handlebars

| Syntax                                                   | Description                                                       |
|----------------------------------------------------------|-------------------------------------------------------------------|
| <code v-pre>{{{{raw}}}}..{{{{/raw}}}}</code>             | Print enclosed Handlebars expressions without rendering           |
| <code v-pre>{{#if ..}}..{{else}}..{{/if}}</code>         | Conditionally render blocks                                       |
| <code v-pre>{{#unless ..}}..{{else}}..{{/unless}}</code> | Conditionally render blocks (if not)                              |
| <code v-pre>{{eq a b}}</code>                            | Check if `a = b`, renders to `true`  or `false`                   |
| <code v-pre>{{ne a b}}</code>                            | Check if `a != b`, renders to `true` or `false`                   |
| <code v-pre>{{gt a b}}</code>                            | Check if `a > b`, renders to `true` or `false`                    |
| <code v-pre>{{gte a b}}</code>                           | Check if `a >= b`, renders to `true` or `false`                   |
| <code v-pre>{{lt a b}}</code>                            | Check if `a < b`, renders to `true` or `false`                    |
| <code v-pre>{{lte a b}}</code>                           | Check if `a <= b`, renders to `true` or `false`                   |
| <code v-pre>{{and a b}}</code>                           | Boolean "And", renders to `true` if both `a` and `b` are `true`   |
| <code v-pre>{{or a b}}</code>                            | Boolean "Or", renders to `true` if either `a` or `b` is `true`    |
| <code v-pre>{{not a}}</code>                             | Boolean "Not", renders to `true` or `false`, the inversion of `a` |

You may use Boolean and Comparison expressions within conditional expressions:

::: code-group
```handlebars [simple]
{{!-- if a > 1000 --}}
{{#if (gt a 1000)}}
...
{{/if}}
```

```handlebars [nested]
{{!-- if a > 1000 && a < 2000  --}}
{{#if (and (gt a 1000) (lt a 2000))}}
...
{{/if}}
```
:::

### String Concatenation

Concatenate any number of strings together using the `concat` helper.

```handlebars
{{concat "string1" var1 "string2"}}
```

### Exec Helper

The `exec` helper enables execution of raw commands and inserting the output
inline in your prompt. Both stdin and stderr are captured.

::: code-group

```handlebars [syntax]
{{exec "command" "arg1" "arg2" "..."}}
{{exec "command" "arg1" var1 "..."}}
{{exec "command" "arg1" (concat var1 "value")}}
```

```yaml [example]
---
input:
  schema:
    repo: string, The github repository name
    branch?: string, Branch name, defaults to "main"
---
You are a github README assistant. Your task is to summarize a given README file,
indicating very briefly what the repo is about and installation instructions.

Here is the README:

{{#if branch}}
{{exec "curl" "-LsSf" (concat "https://raw.githubusercontent.com/" repo  "/refs/heads/" branch "/README.md")}}
{{ else }}
{{exec "curl" "-LsSf" (concat "https://raw.githubusercontent.com/" repo  "/refs/heads/main/README.md")}}
{{/if}}
```
:::

### Prompt Helper

The prompt helper enables execution of other prompt files and inlining the
output within the current prompt, in other words; nested prompting.

::: code-group

```handlebars [syntax]
{{prompt "promptname" key1="value1" key2="value"}}
{{prompt "promptname" key1=var1 key2=var2}}
```

```handlebars [logs-aggregator.prompt]
---
---

You will be given log summaries of several docker containers. Your task is to
summarize their findings in a short markdown report, grouped by container as a
section.

At the end of the report, make sure to highlight any problems, recommendations,
or actions to take.

## Postgres:
{{prompt "docker-inspect-logs" container="postgres"}}

## Nginx
{{prompt "docker-inspect-logs" container="nginx"}}

## Redis
{{prompt "docker-inspect-logs" container="redis"}}
```

```yaml [docker-inspect-logs.prompt]

---
input:
  schema:
    container: string, container name
---
Analyze the following logs and let me know if there are any problems:
{{exec "docker" "logs" container}}
```

:::

### Ask Helper

The Ask Helper enables interactively querying input from the user during execution time.
In the following example, the URL used in `curl` is created from interactively querying the user
for the repo name via `(ask "Repo: " )`, and branch name via `(ask "Branch: " )`.

::: code-group

```handlebars [syntax]
{{ask "Question or Desc: "}}
```

```yaml [example]
---
---
You are a github README assistant. Your task is to summarize a given README file,
indicating very briefly what the repo is about and installation instructions.

Here is the README:

{{exec "curl" "-LsSf" (concat "https://raw.githubusercontent.com/" (ask "Repo: ")  "/refs/heads/" (ask "Branch: ") "/README.md")}}
:::
