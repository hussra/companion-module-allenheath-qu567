#!/bin/bash
# Allen & Heath Qu-5/6/7 — Publish to GitHub
# Double-click this file to create a GitHub repo and push the module code.
# Requires: git (built into macOS) and GitHub CLI (gh).

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

REPO_NAME="companion-module-allenheath-qu567"
GITHUB_USER="Bamagastudios"

echo "============================================"
echo "  Publish Allen & Heath Module to GitHub"
echo "============================================"
echo ""

# ── Check git ────────────────────────────────────
if ! command -v git &>/dev/null; then
    echo "ERROR: git not found. Install Xcode Command Line Tools:"
    echo "  xcode-select --install"
    read -p "Press Enter to exit..."; exit 1
fi

# ── Check gh CLI ─────────────────────────────────
if ! command -v gh &>/dev/null; then
    echo "ERROR: GitHub CLI (gh) is not installed."
    echo ""
    echo "Install it with Homebrew:"
    echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo "  brew install gh"
    echo ""
    echo "Then run: gh auth login"
    echo "Then double-click this script again."
    read -p "Press Enter to exit..."; exit 1
fi

# ── Check gh is logged in ────────────────────────
if ! gh auth status &>/dev/null; then
    echo "You're not logged into GitHub CLI. Opening login..."
    gh auth login
fi

echo "Logged in as: $(gh api user -q .login)"
echo ""

# ── Init git repo if needed ───────────────────────
if [ ! -d ".git" ]; then
    echo "Initialising git repository..."
    git init
    git branch -M main
fi

# ── Stage files (excluding build artifacts and node_modules) ─
echo "Staging files..."
git add README.md LICENSE .gitignore package.json
git add index.js actions.js feedbacks.js presets.js 2>/dev/null || true
git add companion/manifest.json
git add module-output/main.js module-output/package.json module-output/companion/manifest.json
git add install-module.command publish-to-github.command

git status
echo ""

# ── Commit ───────────────────────────────────────
if git diff --cached --quiet; then
    echo "Nothing new to commit — already up to date."
else
    git commit -m "Initial release: Allen & Heath Qu-5/6/7 Companion module v1.0.0"
    echo ""
fi

# ── Create GitHub repo ────────────────────────────
echo "Creating public GitHub repo: $GITHUB_USER/$REPO_NAME ..."
gh repo create "$REPO_NAME" \
    --public \
    --description "Bitfocus Companion module for Allen & Heath Qu-5, Qu-6, and Qu-7 mixers (MIDI over TCP)" \
    --source=. \
    --remote=origin \
    --push 2>/dev/null

# If repo already exists, just push
if [ $? -ne 0 ]; then
    echo "Repo may already exist — attempting push to existing repo..."
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
