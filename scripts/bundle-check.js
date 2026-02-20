#!/usr/bin/env node

// Improvement #37: Bundle analysis script
// Usage: npm run bundle-check (after npm run build)

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', '.next');
const BUDGET_KB = {
  'First Load JS': 150,
  'Page JS': 50,
  'CSS': 100,
};

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  return `${kb.toFixed(1)} kB`;
}

function scanDirectory(dir, ext) {
  let totalSize = 0;
  const files = [];

  if (!fs.existsSync(dir)) return { totalSize: 0, files: [] };

  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const fullPath = path.join(d, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.name.endsWith(ext)) {
        const stat = fs.statSync(fullPath);
        totalSize += stat.size;
        files.push({ path: fullPath.replace(BUILD_DIR, ''), size: stat.size });
      }
    }
  }
  walk(dir);
  files.sort((a, b) => b.size - a.size);
  return { totalSize, files };
}

console.log('\n📦 RoboNorth Bundle Analysis\n');
console.log('='.repeat(60));

// Check JS bundles
const staticDir = path.join(BUILD_DIR, 'static');
const jsResult = scanDirectory(staticDir, '.js');
console.log(`\n📄 JavaScript Chunks: ${formatBytes(jsResult.totalSize)}`);
console.log(`   ${jsResult.files.length} files`);
jsResult.files.slice(0, 10).forEach(f => {
  const overBudget = f.size > BUDGET_KB['Page JS'] * 1024;
  const icon = overBudget ? '⚠️' : '✅';
  console.log(`   ${icon} ${formatBytes(f.size).padStart(10)} ${f.path}`);
});

// Check CSS
const cssResult = scanDirectory(staticDir, '.css');
console.log(`\n🎨 CSS Files: ${formatBytes(cssResult.totalSize)}`);
cssResult.files.forEach(f => {
  console.log(`   ✅ ${formatBytes(f.size).padStart(10)} ${f.path}`);
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 Summary:');
console.log(`   Total JS:  ${formatBytes(jsResult.totalSize)}`);
console.log(`   Total CSS: ${formatBytes(cssResult.totalSize)}`);
console.log(`   Total:     ${formatBytes(jsResult.totalSize + cssResult.totalSize)}`);

const budgetOk = jsResult.totalSize < BUDGET_KB['First Load JS'] * 1024 * 3;
console.log(`\n   Status: ${budgetOk ? '✅ Within budget' : '⚠️ Over budget — consider code splitting'}`);
console.log('');
