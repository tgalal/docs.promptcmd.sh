# Executing Prompts

## Direct Execution

TODO

## Via promptcmd

TODO

## Via shebang

Make your prompt directly executable with a shebang:

```yaml
#!/usr/bin/env promptcmd
---
model: anthropic/claude-sonnet-4
input:
  schema:
    text: string!, Text to process
---
Process: {{text}}
```

Make it executable:

```bash
chmod +x my-prompt.prompt
./my-prompt.prompt --text "Hello"
```
