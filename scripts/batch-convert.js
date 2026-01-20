#!/usr/bin/env node

/**
 * Batch convert markdown files to JSON
 *
 * Usage:
 *   node scripts/batch-convert.js [category]
 *
 * Examples:
 *   node scripts/batch-convert.js democracy
 *   node scripts/batch-convert.js all
 */

const fs = require('fs');
const path = require('path');
const { convertMarkdownToJson } = require('./convert-markdown-to-json.js');

const CATEGORIES = ['democracy', 'character', 'administration', 'controversies', 'interlude'];

function convertCategory(category) {
  const inputDir = path.join(__dirname, '..', 'website', 'docs', category);
  const outputDir = path.join(__dirname, '..', 'data', 'controversies', category);

  if (!fs.existsSync(inputDir)) {
    console.error(`Error: Input directory not found: ${inputDir}`);
    return 0;
  }

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let count = 0;
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (file === 'index.md' || !file.endsWith('.md')) {
      continue;
    }

    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.md', '.json'));

    try {
      convertMarkdownToJson(inputPath, outputPath);
      count++;
    } catch (error) {
      console.error(`❌ Failed to convert ${file}: ${error.message}`);
    }
  }

  return count;
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const category = args[0] || 'all';

  console.log(`\n🔄 Batch Conversion Starting...\n`);

  let totalCount = 0;

  if (category === 'all') {
    for (const cat of CATEGORIES) {
      console.log(`\n📁 Converting category: ${cat}\n`);
      const count = convertCategory(cat);
      totalCount += count;
      console.log(`\n✅ Converted ${count} files from ${cat}\n`);
    }
  } else if (CATEGORIES.includes(category)) {
    console.log(`\n📁 Converting category: ${category}\n`);
    totalCount = convertCategory(category);
  } else {
    console.error(`Error: Unknown category '${category}'`);
    console.error(`Available categories: ${CATEGORIES.join(', ')}, all`);
    process.exit(1);
  }

  console.log(`\n✅ Total files converted: ${totalCount}`);
  console.log(`\n⚠️  IMPORTANT: Manual review required for all converted files!`);
  console.log(`   - Verify tags are accurate`);
  console.log(`   - Check dates`);
  console.log(`   - Review source types`);
  console.log(`   - Adjust priority as needed\n`);
  console.log(`Run validation: node scripts/validate-schema.js data/controversies/\n`);
}
