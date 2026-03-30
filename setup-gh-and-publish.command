#!/bin/bash
# Step 1: Install GitHub CLI + publish the module
# Double-click this file in Finder to run.

echo "============================================"
echo "  GitHub CLI Setup + Publish Module"
echo "============================================"
echo ""

# ── Step 1: Install Homebrew if missing ──────────
if ! command -v brew &>/dev/null; then
    echo "Installing Homebrew (this may take a few minutes)..."
    echo ""
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Add Homebrew to PATH for Apple Silicon Macs
    if [ -f "/opt/homebrew/bin/brew" ]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    echo "✓ Homebrew already installed"
fi

# ── Step 2: Install gh if missing ────────────────
if ! command -v gh &>/dev/null; then
    echo ""
    echo "Installing GitHub CLI (gh)..."
    brew install gh
else
    echo "✓ GitHub CLI already installed"
fi

# ── Step 3: Login to GitHub ───────────────────────
echo ""
echo "Logging into GitHub..."
echo "(A browser window will open — sign in to your Bamagastudios account)"
echo ""
gh auth login

# ── Step 4: Run the publish script ───────────────
echo ""
echo "Now publishing to GitHub..."
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

REPO_NAME="companion-module-allenheath-qu567"
GITHUB_USER="Bamagastudios"

# Init git repo if needed
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

# Stage files
git add README.md LICENSE .gitignore package.json
git add index.js actions.js feedbacks.js presets.js 2>/dev/null || true
git add companion/manifest.json
git add module-output/main.js module-output/package.json module-output/companion/manifest.json
git add install-module.command publish-to-github.command setup-gh-and-publish.command

# Commit
if ! git diff --cached --quiet; then
    git commit -m "Initial release: Allen & Heath Qu-5/6/7 Companion module v1.0.0"
fi

# Create repo and push
echo ""
echo "Creating GitHub repo and pushing..."
gh repo create "$REPO_NAME" \
    --public \
    --description "Bitfocus Companion module for Allen & Heath Qu-5, Qu-6, and Qu-7 mixers (MIDI over TCP)" \
    --source=. \
    --remote=origin \
    --push 2>/dev/null

if [ $? -ne 0 ]; then
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
    git push -u origin main
fi

echo ""
echo "============================================"
echo "  Done! Your module is live at:"
echo "  https://github.com/$GITHUB_USER/$REPO_NAME"
echo "============================================"
echo ""
read -p "Press Enter to close..."
