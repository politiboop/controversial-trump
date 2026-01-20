#!/usr/bin/env node

/**
 * Build aggregated JSON data file for the client
 * Combines all individual controversy JSON files into one file
 */

const fs = require('fs');
const path = require('path');

const CONTROVERSIES_DIR = path.join(__dirname, '..', 'data', 'controversies');
const OUTPUT_FILE = path.join(__dirname, '..', 'website', 'src', 'data', 'controversies.json');
const TAGS_FILE = path.join(__dirname, '..', 'data', 'metadata', 'tags.json');

/**
 * Recursively find all JSON files in a directory
 */
function findJsonFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Load all controversy JSON files
 */
function loadControversies() {
  const jsonFiles = findJsonFiles(CONTROVERSIES_DIR);
  const controversies = [];

  for (const file of jsonFiles) {
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      controversies.push(data);
    } catch (error) {
      console.error(`Error loading ${file}: ${error.message}`);
    }
  }

  return controversies;
}

/**
 * Load tag metadata
 */
function loadTags() {
  try {
    return JSON.parse(fs.readFileSync(TAGS_FILE, 'utf-8'));
  } catch (error) {
    console.warn(`Warning: Could not load tags file: ${error.message}`);
    return null;
  }
}

/**
 * Main build function
 */
function build() {
  console.log('🔨 Building aggregated data file...\n');

  // Load all controversies
  const controversies = loadControversies();
  console.log(`✅ Loaded ${controversies.length} controversies`);

  // Load tags
  const tags = loadTags();
  if (tags) {
    console.log(`✅ Loaded tag metadata`);
  }

  // Build aggregated data structure
  const aggregated = {
    controversies,
    tags,
    metadata: {
      count: controversies.length,
      lastUpdated: new Date().toISOString(),
      categories: {
        timeline: Array.from(new Set(controversies.flatMap(c => c.tags.timeline))),
        type: Array.from(new Set(controversies.flatMap(c => c.tags.type))),
        topic: Array.from(new Set(controversies.flatMap(c => c.tags.topic))),
        severity: Array.from(new Set(controversies.map(c => c.tags.severity)))
      }
    }
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(aggregated, null, 2), 'utf-8');
  console.log(`✅ Written to: ${OUTPUT_FILE}`);

  // Display statistics
  console.log('\n📊 Statistics:');
  console.log(`   Total controversies: ${controversies.length}`);
  console.log(`   Timeline tags: ${aggregated.metadata.categories.timeline.join(', ')}`);
  console.log(`   Type tags: ${aggregated.metadata.categories.type.join(', ')}`);
  console.log(`   Topic tags (${aggregated.metadata.categories.topic.length}): ${aggregated.metadata.categories.topic.slice(0, 5).join(', ')}...`);
  console.log(`   Severity levels: ${aggregated.metadata.categories.severity.join(', ')}`);

  console.log('\n✅ Build complete!\n');
}

// Run if called directly
if (require.main === module) {
  build();
}

module.exports = { build };
