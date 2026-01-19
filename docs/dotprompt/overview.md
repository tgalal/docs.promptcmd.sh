# Dotprompt Files

Dotprompt is specification [created by
Google](https://google.github.io/dotprompt/) for describing executable prompt
templates. It is also the file format used by promptcmd to define
prompts. Each `.prompt` file combines YAML frontmatter for configuration with
Handlebars templates for dynamic content generation.

Example:

```yaml
---
# Frontmatter: YAML configuration
model: anthropic/claude-sonnet-4
input:
  schema:
    param1: type, description
    param2?: type, optional description
output:
  format: text
---
Your prompt text here with {{param1}} and {{param2}}.

Input from stdin: {{STDIN}}
```

During execution, the Frontmatter's input schema is transformed into command line arguments,
and the template part gets rendered with user input.

To learn all the possible ways you can customize a prompt file read on the next pages.
