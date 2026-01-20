# Integration with Other Tools

You can utilize only the prompt management system of promptcmd, but delegate
processing of generated prompts to a different tool of your choosing (as long
as it supports `stdin` for input).

To do so, use the "render only" option available in commands, or globally in
your configuration file. If set, the prompt content is only rendered with user
inputs, and immediately outputs to `stdout`; no API calls are made. You can then
pipe this output to another tool, like claude or llm:

::: code-group

```bash [llm example]
readforme.md --repo tgalal/promptcmd --info installation --render | llm
```

```bash [claude example]
readforme.md --repo tgalal/promptcmd --info summary --render | claude
```

::: warning [Limitations]

- Nested prompts render as is in the calling prompt (instead of
generating a response via the external tool).
- Caching and statistics are not available
- Load balancing is not available
- Output schemas are not available, must be manually specified for the external tool

To support the above, a deeper integration with external tools is planned.
:::
