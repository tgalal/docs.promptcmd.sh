---
outline: 'deep'
---
# Executing Prompts

Once a prompt is created and enabled, it becomes a regular command-line program that you can execute directly.

## Basic Execution

Execute a prompt by calling it as a command with the required arguments:

```bash
$ echo "Hello world!" | translate --to German
Hallo Welt
```

## Command Help

Every prompt automatically generates a help message based on its schema:

```bash
$ translate --help

Usage: translate --to <to>

Options:
      --to <to>   Target language
  -h, --help     Print help
```

## Dry Run Mode

Test a prompt without actually calling the API using the `--dry` flag:

```bash
$ translate --to German --dry
```

This shows you what would be sent to the LLM without consuming tokens or making an API call.

::: tip
The `--dry` flag works with all execution methods: direct execution, `promptcmd`, and `promptctl run`.
:::

## Indirect Execution

There are several alternative ways for executing prompts that do not require
explicit enabling first, i.e., they still work even for "disabled" prompts.

### Using promptcmd

Pass the prompt name or path to the prompt file to `promptcmd`, together with
the prompt arguments.

```
promptcmd promptname --arg1 --arg2
promptcmd /path/to/promptfile.prompt --arg1 --arg2
```

### Using promptctl

You can also execute prompts through `promptctl run`:

```bash
$ promptctl run promptname [--dry] -- --arg1 --arg2
```

Note that when executing using `promptctl` the prompt arguments must be
separated from `promptctl run` arguments via `--`.

### Using Shebang

You can execute a prompt file as a script by adding a `shebang` line at the top,
similar to shell scripts. The file must be made executable with `chmod +x`.

::: code-group

```yaml [myprompt.prompt]
#!/usr/bin/env promptcmd
---
schema:
  input:
    message: string
---

{{message}}
```

``` [usage]
$ chmod +x myprompt.prompt
$ ./myprompt.prompt --help

Usage: promptcmd [OPTIONS] --message <message> [promptname]

Arguments:
  [promptname]

Prompt inputs:
      --message <message>

```

:::

::: info
The `chmod +x` command makes the file executable on Unix-like systems. The help
output includes `[promptname]` because `promptcmd` normally expects a prompt
name as its first argument, but this can be ignored when executing the file
directly via shebang.
:::
