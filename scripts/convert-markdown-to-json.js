#!/usr/bin/env node

/**
 * Convert Markdown files to JSON controversy format
 *
 * Usage:
 *   node scripts/convert-markdown-to-json.js <input-file> <output-file>
 *   node scripts/convert-markdown-to-json.js website/docs/democracy/attacks-on-institutions.md data/controversies/democracy/attacks-on-institutions.json
 *
 * This script provides a STARTING POINT for conversion.
 * Manual review and tag refinement is REQUIRED after conversion.
 */

const fs = require('fs');
const path = require('path');

/**
 * Extract YAML frontmatter from markdown
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      // Remove quotes if present
      frontmatter[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  return frontmatter;
}

/**
 * Extract main content (without frontmatter)
 */
function extractContent(markdownContent) {
  const match = markdownContent.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  return match ? match[1].trim() : markdownContent.trim();
}

/**
 * Extract first paragraph as summary
 */
function extractSummary(content) {
  // Remove headers
  const withoutHeaders = content.replace(/^#+\s+.*$/gm, '');

  // Get first paragraph
  const paragraphs = withoutHeaders.split(/\n\n+/).filter(p => p.trim().length > 20);
  if (paragraphs.length === 0) return '';

  let summary = paragraphs[0].trim();

  // Remove markdown formatting
  summary = summary.replace(/\*\*/g, '');
  summary = summary.replace(/\[Source:.*?\]/g, '');
  summary = summary.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // Truncate if too long
  if (summary.length > 400) {
    summary = summary.substring(0, 397) + '...';
  }

  return summary;
}

/**
 * Extract sources from [Source: ...] patterns
 */
function extractSources(content) {
  const sourceRegex = /\[Source:\s*([^\]]+)\]/g;
  const sources = [];
  const seenSources = new Set();
  let match;

  while ((match = sourceRegex.exec(content)) !== null) {
    const sourceText = match[1].trim();

    // Skip if we've already seen this source
    if (seenSources.has(sourceText)) continue;
    seenSources.add(sourceText);

    const source = {
      text: sourceText,
      type: inferSourceType(sourceText)
    };

    sources.push(source);
  }

  return sources;
}

/**
 * Infer source type from text
 */
function inferSourceType(text) {
  const lower = text.toLowerCase();

  if (lower.includes('court') || lower.includes('ruling') || lower.includes('verdict')) {
    return 'court';
  }
  if (lower.includes('statement') || lower.includes('doj') || lower.includes('white house') ||
      lower.includes('official') || lower.includes('department of')) {
    return 'government';
  }
  if (lower.includes('video') || lower.includes('footage') || lower.includes('recording')) {
    return 'video';
  }
  if (lower.includes('twitter') || lower.includes('tweet') || lower.includes('truth social') ||
      lower.includes('facebook')) {
    return 'social-media';
  }
  if (lower.includes('book') || lower.includes('memoir')) {
    return 'book';
  }

  // Default to news
  return 'news';
}

/**
 * Extract bullet points as key facts
 */
function extractKeyPoints(content) {
  const bulletRegex = /^[-*•]\s+(.+)$/gm;
  const points = [];
  let match;

  while ((match = bulletRegex.exec(content)) !== null) {
    const point = match[1].trim();

    // Skip very short points (likely not key facts)
    if (point.length < 20) continue;

    points.push(point);
  }

  return points;
}

/**
 * Try to infer a date from the content
 */
function inferDate(content, title) {
  // Look for dates in title like "(December 5, 2023)" or "(2015)"
  const titleDateMatch = title.match(/\(([A-Za-z]+ \d{1,2}, \d{4}|\d{4})\)/);
  if (titleDateMatch) {
    const dateStr = titleDateMatch[1];
    if (/^\d{4}$/.test(dateStr)) {
      return `${dateStr}-01-01`;
    }
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch (e) {
      // Continue to other methods
    }
  }

  // Look for explicit dates in content
  const datePatterns = [
    /\*\*([A-Z][a-z]+ \d{1,2}, \d{4})[:*]/,  // **January 6, 2021:**
    /\*\*(\d{4})[:*]/,  // **2020:**
    /([A-Z][a-z]+ \d{1,2}, \d{4})/,  // January 6, 2021
  ];

  for (const pattern of datePatterns) {
    const match = content.match(pattern);
    if (match) {
      try {
        const date = new Date(match[1]);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      } catch (e) {
        continue;
      }
    }
  }

  // Default to unknown date
  return '2020-01-01';
}

/**
 * Infer tags from content and title
 */
function inferTags(content, title) {
  const lower = content.toLowerCase() + ' ' + title.toLowerCase();

  const tags = {
    timeline: [],
    type: [],
    topic: [],
    severity: 'verified'
  };

  // Timeline inference
  if (/(2015|2016|campaign.*2016)/i.test(lower)) {
    tags.timeline.push('campaign-2016');
  }
  if (/(2017|2018|2019|2020|first term)/i.test(lower)) {
    tags.timeline.push('first-term');
  }
  if (/(campaign.*2020|2020 campaign)/i.test(lower)) {
    tags.timeline.push('campaign-2020');
  }
  if (/(2023|2024|campaign.*2024)/i.test(lower)) {
    tags.timeline.push('campaign-2024');
  }
  if (/(2025|2026|second term)/i.test(lower)) {
    tags.timeline.push('second-term');
  }
  if (tags.timeline.length === 0) {
    // Default based on date inference
    tags.timeline.push('first-term');
  }

  // Type inference
  if (/\b(court|verdict|ruling|judge|convicted|sentenced|lawsuit|indictment)\b/i.test(lower)) {
    tags.type.push('legal');
  }
  if (/\b(financial|money|corruption|bribe|payment|profit|business|tax)\b/i.test(lower)) {
    tags.type.push('financial');
  }
  if (/\b(policy|executive order|regulation|law|bill)\b/i.test(lower)) {
    tags.type.push('policy');
  }
  if (/\b(personal|affair|relationship|private|character|conduct)\b/i.test(lower)) {
    tags.type.push('personal');
  }
  if (/\b(political|election|campaign|partisan|democrat|republican)\b/i.test(lower)) {
    tags.type.push('political');
  }
  if (tags.type.length === 0) {
    tags.type.push('political');
  }

  // Topic inference
  if (/\b(democracy|election|vote|constitution|capitol|january 6)\b/i.test(lower)) {
    tags.topic.push('democracy');
  }
  if (/\b(women|sexual|harassment|assault|misogyny)\b/i.test(lower)) {
    tags.topic.push('women');
  }
  if (/\b(racist|discrimination|black|african american|latino|hispanic|muslim)\b/i.test(lower)) {
    tags.topic.push('racism');
  }
  if (/\b(corruption|ethics|conflict of interest|emoluments)\b/i.test(lower)) {
    tags.topic.push('corruption');
  }
  if (/\b(foreign|russia|china|ukraine|nato|diplomat)\b/i.test(lower)) {
    tags.topic.push('foreign-policy');
  }
  if (/\b(immigration|border|wall|deportation|ice|daca)\b/i.test(lower)) {
    tags.topic.push('immigration');
  }
  if (/\b(military|veteran|soldier|defense|pentagon)\b/i.test(lower)) {
    tags.topic.push('military');
  }
  if (/\b(cabinet|appointee|staff|administration|turnover)\b/i.test(lower)) {
    tags.topic.push('cabinet');
  }
  if (/\b(covid|coronavirus|pandemic|vaccine)\b/i.test(lower)) {
    tags.topic.push('covid');
  }
  if (/\b(justice|doj|attorney general|special counsel|fbi|pardon)\b/i.test(lower)) {
    tags.topic.push('justice-system');
  }
  if (/\b(economy|tax|trade|tariff|jobs)\b/i.test(lower)) {
    tags.topic.push('economy');
  }
  if (tags.topic.length === 0) {
    tags.topic.push('character');
  }

  // Severity inference
  if (/\b(court ruled|verdict|convicted|found guilty|sentenced)\b/i.test(lower)) {
    tags.severity = 'court-ruling';
  } else if (/\b(disputed|denied|claim|allegation|unverified)\b/i.test(lower)) {
    tags.severity = 'disputed';
  } else if (/\b(opinion|expert|analyst|commentary)\b/i.test(lower)) {
    tags.severity = 'opinion';
  } else if (/\b(ongoing|developing|current)\b/i.test(lower)) {
    tags.severity = 'ongoing';
  }

  return tags;
}

/**
 * Generate ID from filename or title
 */
function generateId(filename, title) {
  // Try filename first
  const basename = path.basename(filename, '.md');
  if (basename !== 'index' && basename.length > 3) {
    return basename.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  // Fall back to title
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

/**
 * Main conversion function
 */
function convertMarkdownToJson(inputPath, outputPath) {
  console.log(`\n🔄 Converting: ${inputPath}`);

  // Read markdown file
  const markdown = fs.readFileSync(inputPath, 'utf-8');

  // Extract components
  const frontmatter = extractFrontmatter(markdown);
  const content = extractContent(markdown);
  const title = frontmatter.title || 'Untitled';
  const id = generateId(inputPath, title);

  // Build JSON object
  const controversy = {
    id,
    title,
    slug: id,
    description: content,
    summary: extractSummary(content),
    date: inferDate(content, title),
    tags: inferTags(content, title),
    keyPoints: extractKeyPoints(content),
    sources: extractSources(content),
    metadata: {
      featured: frontmatter.featured === 'true' || frontmatter.featured === true,
      priority: parseInt(frontmatter.priority) || 5,
      lastUpdated: new Date().toISOString(),
      status: 'active'
    }
  };

  // Write JSON file
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(controversy, null, 2), 'utf-8');

  console.log(`✅ Created: ${outputPath}`);
  console.log(`   Timeline: ${controversy.tags.timeline.join(', ')}`);
  console.log(`   Type: ${controversy.tags.type.join(', ')}`);
  console.log(`   Topic: ${controversy.tags.topic.join(', ')}`);
  console.log(`   Severity: ${controversy.tags.severity}`);
  console.log(`   Sources: ${controversy.sources.length}`);
  console.log(`   Key Points: ${controversy.keyPoints.length}`);
  console.log(`\n⚠️  MANUAL REVIEW REQUIRED: Please verify tags, date, and sources!`);
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Usage: node convert-markdown-to-json.js <input-file> <output-file>');
    console.error('Example: node convert-markdown-to-json.js website/docs/democracy/attacks-on-institutions.md data/controversies/democracy/attacks-on-institutions.json');
    process.exit(1);
  }

  const [inputPath, outputPath] = args;

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  convertMarkdownToJson(inputPath, outputPath);
}

module.exports = { convertMarkdownToJson };
