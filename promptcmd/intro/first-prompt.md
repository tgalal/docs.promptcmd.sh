# Your First Prompt

This detailed tutorial will walk you through creating a practical, real-world prompt from scratch. You'll learn about all the components of a Dotprompt file and best practices for prompt design.

## What We'll Build

We'll create a `commitmsg` prompt that generates git commit messages from staged changes. This demonstrates:

- Reading input from STDIN
- Using conditional logic
- Defining typed parameters with choices
- Writing prompts that integrate with existing tools

## Step 1: Create the Prompt

```bash
promptctl create commitmsg
```

This creates a new file at:

- Linux: `~/.local/share/promptcmd/prompts/commitmsg.prompt`
- macOS: `~/Library/Application Support/promptcmd/prompts/commitmsg.prompt`

Your default editor will open automatically.

## Step 2: Define the Frontmatter

Add the YAML frontmatter to configure the prompt:

```yaml
---
model: openai/gpt-4o-2024-08-06
input:
  schema:
    style: string, Commit message style (conventional or simple)
output:
  format: text
---
```

Let's break this down:

### Model Selection

```yaml
model: openai/gpt-4o-2024-08-06
```

Specifies which AI model to use. You can use:

- Provider-specific models: `openai/gpt-4o`, `anthropic/claude-sonnet-4`
- Variants you've defined: `rust-coder`, `fast-responder`
- Load balancing groups: `balanced`, `weighted`

### Input Schema

```yaml
input:
  schema:
    style: string, Commit message style (conventional or simple)
```

This creates a required `--style` argument that:

- Accepts string values
- Shows help text: "Commit message style (conventional or simple)"
- Is required (no `?` modifier)

### Output Format

```yaml
output:
  format: text
```

Specifies that the output should be plain text (not JSON or other formats).

## Step 3: Write the Template

After the frontmatter delimiter (`---`), add the prompt template:

```handlebars
{{#if (eq style "conventional")}}
Generate a conventional commit message for these changes.
Use the format: type(scope): description

Valid types: feat, fix, docs, style, refactor, test, chore

Rules:
- Keep the first line under 72 characters
- Use present tense
- Don't include markdown formatting
{{else if (eq style "simple")}}
Generate a simple, clear commit message in plain English.
One line, under 72 characters, present tense.
{{/if}}

The output will be used directly as the commit message.

Here are the staged changes:

{{STDIN}}
```

### Template Components

#### Conditional Logic

```handlebars
{{#if (eq style "conventional")}}
  ...instructions for conventional style...
{{else if (eq style "simple")}}
  ...instructions for simple style...
{{/if}}
```

Uses Handlebars conditionals to provide different instructions based on the `--style` parameter.

#### Variable Substitution

```handlebars
{{style}}
```

Inserts the value of the `style` parameter.

#### STDIN Injection

```handlebars
{{STDIN}}
```

This is where piped input is inserted. In our case, it will contain the git diff output.

## Step 4: Save and Test

Save the file and close your editor. Now test your new command:

```bash
# Stage some changes
git add .

# Generate a conventional commit message
git diff --staged | commitmsg --style conventional

# Generate a simple commit message
git diff --staged | commitmsg --style simple
```

## Step 5: Integration with Git

Create a bash alias or function for easy use:

### Review Before Committing

```bash
# Add to ~/.bashrc or ~/.zshrc
gcm() {
  git diff --staged | commitmsg --style conventional | git commit -e -F -
}
```

This will:

1. Get staged changes
2. Generate a commit message
3. Open your editor to review before committing

### Direct Commit

```bash
gcm-quick() {
  git diff --staged | commitmsg --style simple | git commit -F -
}
```

This commits immediately without review.

## Advanced Features

### Adding More Parameters

Enhance the prompt with additional options:

```yaml
---
model: openai/gpt-4o-2024-08-06
input:
  schema:
    style: string, Commit message style (conventional or simple)
    scope: string?, Optional scope for conventional commits
    emoji: boolean?, Include emoji in commit message
output:
  format: text
---
```

Updated template:

```handlebars
{{#if (eq style "conventional")}}
Generate a conventional commit message.
Format: type{{#if scope}}({{scope}}){{/if}}: description
{{#if emoji}}Include a relevant emoji at the start.{{/if}}
{{else if (eq style "simple")}}
Generate a simple commit message.
{{#if emoji}}Include a relevant emoji.{{/if}}
{{/if}}

{{STDIN}}
```

Usage:

```bash
git diff --staged | commitmsg --style conventional --scope api --emoji
```

### Using Enum Types for Validation

Restrict the `style` parameter to specific values:

```yaml
input:
  schema:
    style:
      type: enum
      values: [conventional, simple, angular, gitmoji]
      description: Commit message style
```

Now only the listed values are accepted, and they appear in help text:

```bash
commitmsg --help
# Shows: --style <conventional|simple|angular|gitmoji>
```

### Setting Default Values

You can set defaults in the template:

```handlebars
{{#unless style}}
  {{!-- Default to conventional if not specified --}}
  {{#let style = "conventional"}}
    ...
  {{/let}}
{{/unless}}
```

## Best Practices

### 1. Be Specific About Output Format

```
The output will be used directly as the commit message.
Do NOT include markdown formatting or explanations.
```

This ensures the AI provides exactly what you need.

### 2. Provide Clear Constraints

```
Rules:
- Keep the first line under 72 characters
- Use present tense
- Be concise and descriptive
```

### 3. Give Examples

```
Examples:
- feat(auth): add OAuth2 login support
- fix(api): handle null response in user endpoint
- docs: update API documentation
```

### 4. Handle Edge Cases

```handlebars
{{#if STDIN}}
  {{STDIN}}
{{else}}
  Error: No staged changes found.
  Run 'git add' first.
{{/if}}
```

## Testing Your Prompt

### Dry Run

Test without making API calls:

```bash
git diff --staged | commitmsg --style conventional --dry-run
```

### Check Generated Help

```bash
commitmsg --help
```

Verify that:

- All parameters are documented
- Help text is clear
- Required vs optional is correct

### Test Edge Cases

```bash
# Empty input
echo "" | commitmsg --style simple

# Large diff
git diff --staged HEAD~10 | commitmsg --style conventional
```

## Common Patterns

### Multi-File Processing

```yaml
---
model: anthropic/claude-sonnet-4
input:
  schema:
    file: string!, Input file path
---
Process this file:

{{file}}
```

### Environment Variables

```handlebars
Using environment: {{env.NODE_ENV}}
API endpoint: {{env.API_URL}}
```

### Chaining Prompts

```handlebars
{{prompt "analyze-code" code=STDIN}}

Based on the analysis above, suggest improvements.
```

## Troubleshooting

### Prompt Not Found After Creation

```bash
# List all prompts
promptctl list

# Enable if disabled
promptctl enable commitmsg
```

### Syntax Errors in Template

Use `--dry-run` to validate template rendering:

```bash
echo "test" | commitmsg --style simple --dry-run
```

### Model Not Available

Check your provider configuration:

```bash
promptctl config
```

Ensure the model specified in your prompt is supported by your configured provider.

## Next Steps

Now you understand how to create sophisticated prompts. Explore:

- **[Dotprompt Files](../core-concepts/dotprompt-files.md)** - Complete format reference
- **[Input Schema](../core-concepts/input-schema.md)** - All available types and modifiers
- **[Prompt Composition](../core-concepts/prompt-composition.md)** - Build complex workflows
- **[Advanced Examples](../examples/advanced-examples.md)** - Real-world prompt examples
