---
outline: deep
---
# Installation

promptcmd can be installed on Linux, macOS, and Windows using several methods. Choose the installation method that works best for your platform.

## Linux/macOS (Shell)

The fastest way to install promptcmd on Linux or macOS:

```bash
curl -LsSf https://installer.promptcmd.sh | sh
```

This installer will:

- Download the latest version for your platform
- Install the `promptcmd` and `promptctl` binaries
- Add the installation directory to your PATH

## macOS (Homebrew)

If you prefer using Homebrew:

```bash
brew install tgalal/tap/promptcmd
```

This method integrates with Homebrew's update system:

```bash
# Update promptcmd
brew upgrade promptcmd
```

## Windows (PowerShell)

Run this command in PowerShell

```powershell
irm https://installer-ps.promptcmd.sh | iex
```

This will download and install promptcmd to your system.

## Windows (MSI)

Download the MSI installer from the [releases
page](https://github.com/tgalal/promptcmd/releases) and run it.

1. Go to [GitHub Releases](https://github.com/tgalal/promptcmd/releases/latest)
2. Download the `.msi` file for Windows
3. Double-click to install
4. Follow the installation wizard

## Verifying Installation

After installation, verify that promptcmd is correctly installed by checking
the version installed.

```bash
promptctl --version
```

::: info
Depending on the installation method, you
may need to restart your shell first.
:::


## Troubleshooting

### Command Not Found

If you get a "command not found" error after installation, ensure the installation directory is in your PATH:

#### Linux/macOS

Add this to your `~/.bashrc`, `~/.zshrc`, or shell config:

```bash
export PATH="$HOME/.promptcmd/bin:$PATH"
```

Then reload your shell:

```bash
source ~/.bashrc  # or ~/.zshrc
```

#### Windows

The installer should automatically add to PATH. If not:

1. Search for "Environment Variables" in Windows Settings
2. Edit your user PATH variable
3. Add the promptcmd installation directory
4. Restart your terminal

### Permission Denied

On Linux/macOS, if you encounter permission errors:

```bash
chmod +x ~/.local/bin/promptcmd ~/.local/bin/promptctl
```

## Next Steps

- [Quick Start Guide](quick-start.md) - Create your first prompt
- [Configuration](../configuration/providers.md) - Set up AI providers
- [Your First Prompt](first-prompt.md) - Detailed tutorial
