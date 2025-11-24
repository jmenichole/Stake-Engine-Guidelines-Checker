#!/usr/bin/env node

/**
 * Copyright Header Injector
 * 
 * This script adds copyright notices to your source code files.
 * Run this in your game project directory after validation.
 * 
 * Usage:
 *   node add-copyright.js
 *   node add-copyright.js --author "Your Name"
 *   node add-copyright.js --year 2025
 * 
 * Supported file types: .js, .ts, .jsx, .tsx, .html, .css
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (flag, defaultValue) => {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue;
};

const AUTHOR = getArg('--author', 'Your Name');
const YEAR = getArg('--year', new Date().getFullYear().toString());
const DRY_RUN = args.includes('--dry-run');

// Copyright templates for different file types
const COPYRIGHT_TEMPLATES = {
  javascript: `/**
 * Copyright (c) ${YEAR} ${AUTHOR}
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

`,
  html: `<!--
  Copyright (c) ${YEAR} ${AUTHOR}
  
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree.
-->

`,
  css: `/**
 * Copyright (c) ${YEAR} ${AUTHOR}
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

`,
};

// File extensions to process
const FILE_EXTENSIONS = {
  '.js': 'javascript',
  '.ts': 'javascript',
  '.jsx': 'javascript',
  '.tsx': 'javascript',
  '.mjs': 'javascript',
  '.cjs': 'javascript',
  '.html': 'html',
  '.css': 'css',
};

// Directories to skip
const SKIP_DIRS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  'coverage',
  '.next',
  '.cache',
  'public',
  'assets',
];

// Files to skip
const SKIP_FILES = [
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vite.config.ts',
  'vitest.config.ts',
];

let filesProcessed = 0;
let filesSkipped = 0;
let filesWithCopyright = 0;

/**
 * Check if file already has copyright notice
 */
function hasCopyright(content) {
  const patterns = [
    /Copyright \(c\)/i,
    /©.*\d{4}/,
    /All rights reserved/i,
    /Licensed under/i,
  ];
  
  const first500Chars = content.substring(0, 500);
  return patterns.some(pattern => pattern.test(first500Chars));
}

/**
 * Add copyright header to file content
 */
function addCopyright(filePath, content, fileType) {
  const template = COPYRIGHT_TEMPLATES[fileType];
  
  if (!template) {
    return content;
  }
  
  // Check for shebang line (#!/usr/bin/env node)
  const shebangMatch = content.match(/^#!.*\n/);
  if (shebangMatch) {
    const shebangLine = shebangMatch[0];
    const restOfContent = content.substring(shebangLine.length);
    return shebangLine + '\n' + template + restOfContent;
  }
  
  // For HTML files, insert after DOCTYPE or at the beginning
  if (fileType === 'html') {
    const doctypeMatch = content.match(/<!DOCTYPE[^>]*>\s*/i);
    if (doctypeMatch) {
      const insertPos = doctypeMatch[0].length;
      return content.substring(0, insertPos) + template + content.substring(insertPos);
    }
  }
  
  // For other files, prepend copyright
  return template + content;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileType = FILE_EXTENSIONS[ext];
  
  if (!fileType) {
    return;
  }
  
  const fileName = path.basename(filePath);
  if (SKIP_FILES.includes(fileName)) {
    filesSkipped++;
    return;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has copyright
    if (hasCopyright(content)) {
      filesWithCopyright++;
      console.log(`  ✓ Already has copyright: ${filePath}`);
      return;
    }
    
    // Add copyright
    const newContent = addCopyright(filePath, content, fileType);
    
    if (DRY_RUN) {
      console.log(`  → Would add copyright: ${filePath}`);
    } else {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  ✓ Added copyright: ${filePath}`);
    }
    
    filesProcessed++;
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Recursively process directory
 */
function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip certain directories
        if (SKIP_DIRS.includes(item)) {
          continue;
        }
        processDirectory(fullPath);
      } else if (stat.isFile()) {
        processFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
  }
}

/**
 * Create MIT LICENSE file if it doesn't exist
 */
function createLicenseFile() {
  const licensePath = path.join(process.cwd(), 'LICENSE');
  
  if (fs.existsSync(licensePath)) {
    console.log('\n📄 LICENSE file already exists.');
    return;
  }
  
  const licenseContent = `MIT License

Copyright (c) ${YEAR} ${AUTHOR}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
  
  if (DRY_RUN) {
    console.log('\n📄 Would create LICENSE file');
  } else {
    fs.writeFileSync(licensePath, licenseContent, 'utf8');
    console.log('\n📄 Created LICENSE file');
  }
}

/**
 * Main function
 */
function main() {
  console.log('\n' + '='.repeat(60));
  console.log('📝 Copyright Header Injector');
  console.log('='.repeat(60));
  console.log(`\nAuthor: ${AUTHOR}`);
  console.log(`Year: ${YEAR}`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes)' : 'LIVE (will modify files)'}`);
  console.log('\nProcessing files...\n');
  
  const startDir = process.cwd();
  processDirectory(startDir);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary');
  console.log('='.repeat(60));
  console.log(`Files modified: ${filesProcessed}`);
  console.log(`Files already with copyright: ${filesWithCopyright}`);
  console.log(`Files skipped: ${filesSkipped}`);
  console.log('='.repeat(60));
  
  if (DRY_RUN) {
    console.log('\n⚠️  This was a DRY RUN. No files were modified.');
    console.log('Run without --dry-run to apply changes.\n');
  } else {
    createLicenseFile();
    console.log('\n✅ Copyright headers added successfully!\n');
  }
}

// Show help
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Copyright Header Injector
=========================

Adds copyright notices to your source code files.

Usage:
  node add-copyright.js [options]

Options:
  --author "Name"    Set the copyright author (default: "Your Name")
  --year YYYY        Set the copyright year (default: current year)
  --dry-run          Preview changes without modifying files
  --help, -h         Show this help message

Examples:
  node add-copyright.js
  node add-copyright.js --author "John Doe" --year 2025
  node add-copyright.js --dry-run

Supported Files:
  JavaScript/TypeScript: .js, .ts, .jsx, .tsx, .mjs, .cjs
  HTML: .html
  CSS: .css

Skipped Directories:
  ${SKIP_DIRS.join(', ')}

Skipped Files:
  ${SKIP_FILES.join(', ')}
`);
  process.exit(0);
}

// Run the script
main();
