# Look Up Paths

promptcmd uses the following paths:

| Purpose | Linux | macOS | Windows
|---------|-------|-------| -------
| Config | `~/.config/promptcmd/config.toml` | `~/Library/Application Support/promptcmd/config.toml` | |
| Prompts | `~/.config/promptcmd/prompts/` | `~/Library/Application Support/promptcmd/prompts/` | |
| Installed Commands | `~/.promptcmd/bin/` | `~/.promptcmd/bin/` | |
| Database | `~/.promptcmd/stats.db` | `~/Library/Application Support/promptcmd/stats.db` | |

## Setting up PATH

After installation you should be able to directly run `promptctl` and
`promptcmd`, as well as enabled commands. If you get a "command not found"
error after installation, ensure the installation directory is in your PATH:

### Linux/macOS

Add this to your `~/.bashrc`, `~/.zshrc`, or shell config:

```bash
export PATH="$HOME/.promptcmd/bin:$PATH"
```

Then reload your shell:

```bash
source ~/.bashrc  # or ~/.zshrc
```

### Windows

The installer should automatically add to PATH. If not:

1. Search for "Environment Variables" in Windows Settings
2. Edit your user PATH variable
3. Add the promptcmd installation directory
4. Restart your terminal

