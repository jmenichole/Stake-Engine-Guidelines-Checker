# Copyright Tool User Guide

## Overview

This tool automatically adds copyright headers to all your source code files, protecting your intellectual property from theft. After validating your Stake Engine game project, download and run this script to inject copyright notices.

## 📥 Download & Setup

### Step 1: Download the Script

After your project passes validation, you'll receive a download that includes:

- `add-copyright.js` - The copyright injection script
- Your validated game files

Alternatively, download just the script from:

```
https://github.com/jmenichole/Stake-Engine-Guidelines-Checker/blob/main/add-copyright.js
```

### Step 2: Place in Your Project

Put `add-copyright.js` in your game project's root directory:

```
my-game-project/
├── add-copyright.js  ← Place here
├── index.html
├── src/
│   ├── game.js
│   └── utils.js
└── package.json
```

## 🚀 Usage

### Basic Usage

Open terminal/command prompt in your project directory and run:

```bash
node add-copyright.js
```

This will:

- ✅ Add copyright headers to all `.js`, `.ts`, `.jsx`, `.tsx`, `.html`, `.css` files
- ✅ Skip files that already have copyright notices
- ✅ Create a `LICENSE` file (MIT License)
- ✅ Use "Your Name" and current year by default

### Custom Author & Year

Specify your name and year:

```bash
node add-copyright.js --author "John Doe" --year 2025
```

### Preview Changes (Dry Run)

See what would be changed without modifying files:

```bash
node add-copyright.js --dry-run
```

### Complete Example

```bash
# Preview first
node add-copyright.js --author "Jane Smith" --year 2025 --dry-run

# If it looks good, run for real
node add-copyright.js --author "Jane Smith" --year 2025
```

## 📋 What Gets Modified

### Supported File Types

| Type                  | Extensions                                   | Comment Style  |
| --------------------- | -------------------------------------------- | -------------- |
| JavaScript/TypeScript | `.js`, `.ts`, `.jsx`, `.tsx`, `.mjs`, `.cjs` | `/** ... */`   |
| HTML                  | `.html`                                      | `<!-- ... -->` |
| CSS                   | `.css`                                       | `/** ... */`   |

### Example Headers

**JavaScript/TypeScript:**

```javascript
/**
 * Copyright (c) 2025 Your Name
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Your code starts here...
```

**HTML:**

```html
<!--
  Copyright (c) 2025 Your Name
  
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree.
-->

<!DOCTYPE html>
<html>
  <!-- Your HTML continues... -->
</html>
```

**CSS:**

```css
/**
 * Copyright (c) 2025 Your Name
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

body {
  /* Your CSS continues... */
}
```

## 🛡️ What Gets Protected

The script automatically:

1. **Adds Copyright Headers** to all source files
2. **Creates LICENSE File** with MIT License
3. **Skips Duplicates** - won't add copyright if already present
4. **Preserves Code** - your code remains unchanged, just prepended with copyright

## 🚫 What Gets Skipped

### Skipped Directories

- `node_modules/`
- `.git/`
- `dist/`
- `build/`
- `coverage/`
- `.next/`
- `.cache/`
- `public/` (usually contains assets, not source code)
- `assets/`

### Skipped Files

- `package.json`
- `package-lock.json`
- `tsconfig.json`
- Configuration files
- Files that already have copyright notices

## 📊 Output Example

```
============================================================
📝 Copyright Header Injector
============================================================

Author: Jane Smith
Year: 2025
Mode: LIVE (will modify files)

Processing files...

  ✓ Added copyright: src/game.js
  ✓ Added copyright: src/utils.js
  ✓ Added copyright: src/components/player.js
  ✓ Already has copyright: src/config.js
  ✓ Added copyright: index.html
  ✓ Added copyright: styles/main.css

============================================================
📊 Summary
============================================================
Files modified: 5
Files already with copyright: 1
Files skipped: 3
============================================================

📄 Created LICENSE file

✅ Copyright headers added successfully!
```

## ❓ FAQ

### Q: What if I make a mistake with the author name?

**A:** Run the script again with the correct name. It will skip files that already have copyright, so you'll need to:

1. Remove the incorrect headers manually, OR
2. Use find & replace to update the name

### Q: Can I use a different license?

**A:** Yes! The script creates an MIT LICENSE by default, but you can:

1. Delete the `LICENSE` file
2. Create your own with your preferred license (GPL, Apache, etc.)
3. Update the copyright header template in the script if needed

### Q: Will this break my code?

**A:** No. The script only prepends copyright comments at the top of files. Comments don't affect code execution.

### Q: What if the script fails?

**A:**

1. Make sure you have Node.js installed (`node --version`)
2. Check file permissions (the script needs write access)
3. Run with `--dry-run` first to preview
4. Check the error message for details

### Q: Can I run this multiple times?

**A:** Yes! The script detects existing copyright headers and won't duplicate them.

### Q: Does this work on Windows/Mac/Linux?

**A:** Yes, it works on all platforms that have Node.js installed.

## 🔒 Why Copyright Protection Matters

Copyright headers provide:

1. **Legal Protection** - Establishes you as the creator
2. **Theft Deterrence** - Makes it harder for others to steal your work
3. **License Clarity** - Specifies how others can use your code
4. **Professionalism** - Shows you take your work seriously
5. **Timestamp** - Documents when you created the work

## 📝 License Information

The script adds an MIT License by default, which:

- ✅ Allows others to use your code
- ✅ Requires them to include your copyright notice
- ✅ Protects you from liability
- ✅ Is widely accepted and simple

You can change to a different license if needed.

## 🆘 Support

If you encounter issues:

1. Run with `--dry-run` to preview changes
2. Check you have Node.js installed
3. Verify you're in the correct directory
4. Review the output for error messages
5. Try `node add-copyright.js --help` for options

## 🎯 Pro Tips

1. **Run --dry-run first** to see what will change
2. **Commit to Git before running** so you can revert if needed
3. **Customize the script** if you need different copyright text
4. **Run after each major update** to cover new files
5. **Include in your build process** for automatic protection

## Example Workflow

```bash
# 1. Download your validated project
# 2. Navigate to project directory
cd my-stake-game

# 3. Preview what will change
node add-copyright.js --author "My Name" --year 2025 --dry-run

# 4. Verify the changes look good

# 5. Apply copyright headers
node add-copyright.js --author "My Name" --year 2025

# 6. Verify LICENSE file was created
cat LICENSE

# 7. Check a few files
head src/game.js
head index.html

# 8. Done! Your code is now protected
```

---

**Ready to protect your intellectual property? Run the script now!**

```bash
node add-copyright.js --author "Your Name"
```
