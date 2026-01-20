#!/usr/bin/env node

/**
 * Validate JSON controversy files against the schema
 *
 * Usage:
 *   node scripts/validate-schema.js [file-or-directory]
 *
 * Examples:
 *   node scripts/validate-schema.js data/controversies/democracy/big-lie.json
 *   node scripts/validate-schema.js data/controversies/
 */

const fs = require('fs');
const path = require('path');

// Simple JSON Schema validator (minimal implementation)
class SchemaValidator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(data, schemaNode = this.schema, dataPath = 'root') {
    const errors = [];

    // Check required fields
    if (schemaNode.required) {
      for (const field of schemaNode.required) {
        if (!(field in data)) {
          errors.push(`${dataPath}: Missing required field '${field}'`);
        }
      }
    }

    // Check properties
    if (schemaNode.properties) {
      for (const [key, value] of Object.entries(data)) {
        const propSchema = schemaNode.properties[key];
        if (!propSchema && schemaNode.additionalProperties === false) {
          errors.push(`${dataPath}: Additional property '${key}' not allowed`);
          continue;
        }
        if (!propSchema) continue;

        errors.push(...this.validateValue(value, propSchema, `${dataPath}.${key}`));
      }
    }

    return errors;
  }

  validateValue(value, schema, path) {
    const errors = [];

    // Type check
    if (schema.type) {
      const actualType = Array.isArray(value) ? 'array' : typeof value;
      if (actualType !== schema.type) {
        errors.push(`${path}: Expected type '${schema.type}', got '${actualType}'`);
        return errors; // Can't continue validation if type is wrong
      }
    }

    // String validations
    if (schema.type === 'string') {
      if (schema.minLength && value.length < schema.minLength) {
        errors.push(`${path}: String too short (min: ${schema.minLength}, actual: ${value.length})`);
      }
      if (schema.maxLength && value.length > schema.maxLength) {
        errors.push(`${path}: String too long (max: ${schema.maxLength}, actual: ${value.length})`);
      }
      if (schema.pattern) {
        const regex = new RegExp(schema.pattern);
        if (!regex.test(value)) {
          errors.push(`${path}: String doesn't match pattern ${schema.pattern}`);
        }
      }
      if (schema.enum && !schema.enum.includes(value)) {
        errors.push(`${path}: Value '${value}' not in allowed values: ${schema.enum.join(', ')}`);
      }
    }

    // Number validations
    if (schema.type === 'integer' || schema.type === 'number') {
      if (schema.minimum !== undefined && value < schema.minimum) {
        errors.push(`${path}: Value ${value} below minimum ${schema.minimum}`);
      }
      if (schema.maximum !== undefined && value > schema.maximum) {
        errors.push(`${path}: Value ${value} above maximum ${schema.maximum}`);
      }
    }

    // Array validations
    if (schema.type === 'array') {
      if (schema.minItems && value.length < schema.minItems) {
        errors.push(`${path}: Array too short (min: ${schema.minItems}, actual: ${value.length})`);
      }
      if (schema.maxItems && value.length > schema.maxItems) {
        errors.push(`${path}: Array too long (max: ${schema.maxItems}, actual: ${value.length})`);
      }
      if (schema.uniqueItems) {
        const seen = new Set();
        for (const item of value) {
          const key = JSON.stringify(item);
          if (seen.has(key)) {
            errors.push(`${path}: Array contains duplicate items`);
            break;
          }
          seen.add(key);
        }
      }
      if (schema.items) {
        value.forEach((item, i) => {
          errors.push(...this.validateValue(item, schema.items, `${path}[${i}]`));
        });
      }
    }

    // Object validations
    if (schema.type === 'object') {
      errors.push(...this.validate(value, schema, path));
    }

    return errors;
  }
}

/**
 * Validate a single JSON file
 */
function validateFile(filePath, validator) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const errors = validator.validate(data);

    if (errors.length === 0) {
      console.log(`✅ ${filePath}`);
      return true;
    } else {
      console.log(`❌ ${filePath}`);
      errors.forEach(err => console.log(`   ${err}`));
      return false;
    }
  } catch (error) {
    console.log(`❌ ${filePath}`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

/**
 * Validate all JSON files in a directory
 */
function validateDirectory(dirPath, validator) {
  let allValid = true;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (!validateDirectory(fullPath, validator)) {
        allValid = false;
      }
    } else if (entry.name.endsWith('.json')) {
      if (!validateFile(fullPath, validator)) {
        allValid = false;
      }
    }
  }

  return allValid;
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  // Load schema
  const schemaPath = path.join(__dirname, '..', 'data', 'schema', 'controversy.schema.json');
  if (!fs.existsSync(schemaPath)) {
    console.error(`Error: Schema not found at ${schemaPath}`);
    process.exit(1);
  }

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  const validator = new SchemaValidator(schema);

  // Determine what to validate
  let targetPath;
  if (args.length === 0) {
    targetPath = path.join(__dirname, '..', 'data', 'controversies');
  } else {
    targetPath = path.resolve(args[0]);
  }

  if (!fs.existsSync(targetPath)) {
    console.error(`Error: Path not found: ${targetPath}`);
    process.exit(1);
  }

  console.log(`\n🔍 Validating controversies against schema...\n`);

  const isValid = fs.statSync(targetPath).isDirectory()
    ? validateDirectory(targetPath, validator)
    : validateFile(targetPath, validator);

  console.log('\n' + (isValid ? '✅ All valid!' : '❌ Validation failed'));
  process.exit(isValid ? 0 : 1);
}

module.exports = { SchemaValidator, validateFile, validateDirectory };
