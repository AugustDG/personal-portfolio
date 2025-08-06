#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createDirectus, rest, authentication, readCollections, readFields } = require('@directus/sdk');

// Configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL || 'admin@example.com';
const DIRECTUS_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || 'd1r3ctu5';
const OUTPUT_DIR = path.join(process.cwd(), 'scripts/migration-exports');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'directus-schema.json');

// Initialize Directus client
const directus = createDirectus(DIRECTUS_URL).with(rest()).with(authentication());

async function authenticateDirectus() {
    try {
        await directus.login(DIRECTUS_EMAIL, DIRECTUS_PASSWORD);
        console.log('✅ Successfully authenticated with Directus');
        return true;
    } catch (error) {
        console.error('❌ Failed to authenticate with Directus:', error.message);
        return false;
    }
}

async function exportCollections() {
    try {
        console.log('📋 Exporting collections...');

        // Get all collections
        const collections = await directus.request(readCollections());

        // Filter out system collections (optional - you can include them if needed)
        const userCollections = collections.filter(collection =>
            !collection.collection.startsWith('directus_') &&
            !['directus_activity', 'directus_collections', 'directus_fields', 'directus_files',
                'directus_folders', 'directus_migrations', 'directus_permissions', 'directus_presets',
                'directus_relations', 'directus_revisions', 'directus_roles', 'directus_sessions',
                'directus_settings', 'directus_users', 'directus_webhooks', 'directus_flows',
                'directus_operations', 'directus_panels', 'directus_dashboards'].includes(collection.collection)
        );

        console.log(`✅ Found ${userCollections.length} user collections`);

        return userCollections.map(collection => ({
            collection: collection.collection,
            meta: collection.meta,
            schema: collection.schema
        }));

    } catch (error) {
        console.error('❌ Failed to export collections:', error.message);
        throw error;
    }
}

async function exportFields() {
    try {
        console.log('🔧 Exporting fields...');

        // Get all fields
        const fields = await directus.request(readFields());

        // Filter out system fields
        const userFields = fields.filter(field =>
            !field.collection.startsWith('directus_') &&
            !['directus_activity', 'directus_collections', 'directus_fields', 'directus_files',
                'directus_folders', 'directus_migrations', 'directus_permissions', 'directus_presets',
                'directus_relations', 'directus_revisions', 'directus_roles', 'directus_sessions',
                'directus_settings', 'directus_users', 'directus_webhooks', 'directus_flows',
                'directus_operations', 'directus_panels', 'directus_dashboards'].includes(field.collection)
        );

        console.log(`✅ Found ${userFields.length} user fields`);

        return userFields.map(field => ({
            collection: field.collection,
            field: field.field,
            type: field.type,
            meta: field.meta,
            schema: field.schema
        }));

    } catch (error) {
        console.error('❌ Failed to export fields:', error.message);
        throw error;
    }
}

async function exportRelations() {
    try {
        console.log('🔗 Exporting relations...');

        // Use fetch API for relations since SDK might not have readRelations
        const response = await fetch(`${DIRECTUS_URL}/relations`, {
            headers: {
                'Authorization': `Bearer ${directus.getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const relations = data.data || [];

        // Filter out system relations
        const userRelations = relations.filter(relation =>
            !relation.collection?.startsWith('directus_') &&
            !relation.related_collection?.startsWith('directus_')
        );

        console.log(`✅ Found ${userRelations.length} user relations`);

        return userRelations;

    } catch (error) {
        console.error('❌ Failed to export relations:', error.message);
        return []; // Relations are optional, continue without them
    }
}

async function getDirectusInfo() {
    try {
        const response = await fetch(`${DIRECTUS_URL}/server/info`, {
            headers: {
                'Authorization': `Bearer ${directus.getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const info = await response.json();
        return {
            version: info.data?.directus?.version || '10.x.x',
            vendor: 'postgres' // Default to postgres, you can make this dynamic
        };

    } catch (error) {
        console.error('⚠️ Could not get Directus info:', error.message);
        return {
            version: '10.x.x',
            vendor: 'postgres'
        };
    }
}

async function createOutputDirectory() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
    }
}

async function saveSchema(schema) {
    try {
        await createOutputDirectory();

        const schemaJson = JSON.stringify(schema, null, 2);
        fs.writeFileSync(OUTPUT_FILE, schemaJson, 'utf8');

        console.log(`✅ Schema exported to: ${OUTPUT_FILE}`);
        console.log(`📊 Exported ${schema.collections.length} collections and ${schema.fields.length} fields`);

        if (schema.relations && schema.relations.length > 0) {
            console.log(`🔗 Exported ${schema.relations.length} relations`);
        }

    } catch (error) {
        console.error('❌ Failed to save schema file:', error.message);
        throw error;
    }
}

async function generateBackupName() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return path.join(OUTPUT_DIR, `directus-schema-backup-${timestamp}.json`);
}

async function main() {
    console.log('🚀 Exporting Directus schema...');
    console.log(`📍 Directus URL: ${DIRECTUS_URL}`);
    console.log(`📄 Output file: ${OUTPUT_FILE}`);

    try {
        // Authenticate with Directus
        const authenticated = await authenticateDirectus();
        if (!authenticated) {
            process.exit(1);
        }

        // Get Directus instance info
        const directusInfo = await getDirectusInfo();
        console.log(`ℹ️ Directus version: ${directusInfo.version}`);

        // Export schema components
        const collections = await exportCollections();
        const fields = await exportFields();
        const relations = await exportRelations();

        // Create schema object
        const schema = {
            version: 1,
            directus: directusInfo.version,
            vendor: directusInfo.vendor,
            collections,
            fields
        };

        // Add relations if any were found
        if (relations.length > 0) {
            schema.relations = relations;
        }

        // Save to file
        await saveSchema(schema);

        console.log('\n🎉 Schema export completed successfully!');
        console.log('\nYou can now:');
        console.log('1. Import this schema to another Directus instance: npm run apply:schema');
        console.log('2. Version control the schema file for backup purposes');
        console.log('3. Use it as a template for new instances');

        // Offer to create a timestamped backup
        if (process.argv.includes('--backup')) {
            const backupFile = await generateBackupName();
            fs.copyFileSync(OUTPUT_FILE, backupFile);
            console.log(`📦 Backup created: ${backupFile}`);
        }

    } catch (error) {
        console.error('\n💥 Schema export failed:', error.message);
        process.exit(1);
    }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
Directus Schema Export Script

Usage: node scripts/export-schema.js [options]

Environment Variables:
  DIRECTUS_URL              Directus instance URL (default: http://localhost:8055)
  DIRECTUS_ADMIN_EMAIL      Admin email (default: admin@example.com)
  DIRECTUS_ADMIN_PASSWORD   Admin password (default: d1r3ctu5)

Options:
  --help, -h    Show this help message
  --backup      Create a timestamped backup copy of the schema

Before running:
1. Make sure Directus is running and accessible
2. Verify admin credentials (or set environment variables)
3. Ensure you have proper permissions to read collections and fields

The script will:
- Export all user collections (excluding system collections)
- Export all fields with their metadata and schema definitions
- Export relations between collections
- Save everything to scripts/migration-exports/directus-schema.json

After running:
- Use the exported schema with: npm run apply:schema
- Version control the schema file for team collaboration
- Create backups before making schema changes

Examples:
  # Basic export
  node scripts/export-schema.js
  
  # Export with backup
  node scripts/export-schema.js --backup
  
  # Export from remote instance
  DIRECTUS_URL=https://mysite.directus.app DIRECTUS_ADMIN_EMAIL=admin@mysite.com node scripts/export-schema.js
`);
    process.exit(0);
}

main();
