# Enabling/Disabling Prompts

Enabling a prompt makes it possible to execute a prompt as if it were a native
command. If your `PATH` is [setup
correctly](/intro/lookup-paths#setting-up-path), an enabled prompt is
executable directly using its name, without the `.prompt` extension.

## Enabling Prompts

Enable prompts using `promptctl enable promptname`:

```
$ promptctl enable translate

Installed /home/user/.promptcmd/bin/translate

$ translate --help

Usage: translate [OPTIONS] --lang <lang>

Prompt inputs:
      --summarize                  Whether to also summarize the text
      --text <text>                Text to translate, defaults to stdin
      --lang <lang>                Target language
      --source-lang <source-lang>  Source language, leave blank to auto detect
```

::: tip
Prompts created with `promptctl create` are automatically enabled and available
as commands.
:::

## Disabling a Prompt

To disable a prompt and make it unavailable as a command:

```bash
$ promptctl disable translate
```

The prompt file remains in your [prompts directory](/intro/lookup-paths), but
the command symlink is removed from `~/.promptcmd/bin/`. You can still execute
disabled prompts using indirect methods (see [Executing
Prompts](/concepts/exec#indirect-execution)).

To re-enable a disabled prompt, use `promptctl enable` again.
