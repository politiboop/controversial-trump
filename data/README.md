# Data Directory

This directory is the **single source of truth** for all controversy data.

## Structure

```
data/
└── controversies/
    ├── controversy-1.json
    ├── controversy-2.json
    └── ...
```

## How to Add a New Controversy

1. **Create a new JSON file** in `data/controversies/` with a kebab-case filename
   - Example: `my-new-controversy.json`

2. **Follow the JSON schema**:
```json
{
  "id": "my-new-controversy",
  "title": "Human-Readable Title",
  "primaryCategory": "democracy|women|racism|corruption|abuse-of-power|character|covid|absurd|narcissism",
  "severity": "catastrophic|serious|concerning|disputed|absurd",
  "timeline": "pre-2016|first-term|between-terms|campaign-2024|second-term",
  "date": "YYYY-MM-DD",
  "summary": "Brief description for cards (2-3 sentences)",
  "keyFacts": [
    "Key point 1",
    "Key point 2"
  ],
  "sources": [
    {
      "text": "Source title or description",
      "url": "https://...",
      "type": "news|government|court|video|audio"
    }
  ],
  "specialTags": ["optional", "tags"]
}
```

3. **That's it!** The website will automatically pick up your new controversy on the next build or dev server start.

## Automated Data Sync

When you run `npm start` or `npm run build` in the website directory:
- The `sync-data.js` script automatically runs first
- It copies all files from `/data` to `/website/src/data`
- It generates an index file (`controversyIndex.js`) with metadata for fast loading
- The website then builds using this synced data

**Do not manually edit files in `/website/src/data`** - they are auto-generated and gitignored.

### What Gets Generated

1. **`/website/src/data/controversies/*.json`** - Copies of all controversy files
2. **`/website/src/data/controversyIndex.js`** - Auto-generated index containing:
   - Filename, ID, title, category, severity, timeline, and date for each controversy
   - Sorted by date (newest first)
   - Used by components for efficient filtering and loading
3. **`/website/src/categories.json`** - Copy of the categories configuration

## Categories

Categories are defined in `/categories.json` at the root level.

Current categories:
- Democracy threats
- Women's issues
- Racism
- Corruption
- Abuse of power
- Character issues
- COVID mishandling
- Absurd moments
- Narcissism

## Data Flow

```
/data/controversies/*.json (SOURCE OF TRUTH)
          ↓
    sync-data.js runs
          ↓
/website/src/data/controversies/*.json (AUTO-GENERATED)
          ↓
    Website components load
          ↓
    Browser displays
```
