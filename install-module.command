#!/bin/bash
# Allen & Heath Qu-5/6/7 Companion Module — Local Installer
# Double-click this file to install the module into Bitfocus Companion.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MODULE_OUTPUT="$SCRIPT_DIR/module-output"
COMPANION_MODULES="$HOME/Library/Application Support/companion/modules"
MODULE_DEST="$COMPANION_MODULES/allenheath-qu567-1.0.0"

echo "============================================"
echo "  Allen & Heath Qu-5/6/7 Module Installer"
echo "============================================"
echo ""

# ── Check source files ────────────────────────────
if [ ! -f "$MODULE_OUTPUT/main.js" ]; then
    echo "ERROR: Cannot find module-output/main.js"
    echo "Make sure you're running this script from inside the"
    echo "companion-module-allenheath-qu567 folder."
    read -p "Press Enter to exit..."; exit 1
fi

# ── Check Companion modules folder exists ─────────
if [ ! -d "$COMPANION_MODULES" ]; then
    echo "ERROR: Companion modules folder not found at:"
    echo "  $COMPANION_MODULES"
    echo ""
    echo "Please make sure Bitfocus Companion is installed and has"
    echo "been run at least once."
    read -p "Press Enter to exit..."; exit 1
fi

# ── Create destination folder ─────────────────────
echo "Creating module folder..."
mkdir -p "$MODULE_DEST/companion"

# ── Copy files ────────────────────────────────────
echo "Copying module files..."
cp "$MODULE_OUTPUT/main.js"                        "$MODULE_DEST/main.js"
cp "$MODULE_OUTPUT/package.json"                   "$MODULE_DEST/package.json"
cp "$MODULE_OUTPUT/companion/manifest.json"        "$MODULE_DEST/companion/manifest.json"

echo ""
echo "Installed to:"
echo "  $MODULE_DEST"
echo ""
echo "Files:"
ls -lh "$MODULE_DEST/"
ls -lh "$MODULE_DEST/companion/"

echo ""
echo "============================================"
echo "  Installation complete!"
echo ""
echo "  Next steps:"
echo "  1. Open Companion: http://localhost:8000"
echo "  2. Top-right menu → Refresh modules list"
echo "  3. Connections → Add connection"
echo "  4. Search: Allen & Heath"
echo "============================================"
echo ""
read -p "Press Enter to close..."
