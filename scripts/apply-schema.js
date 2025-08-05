#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createDirectus, rest, authentication, createCollection, createField } = require('@directus/sdk');

// Configuration
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL || 'admin@example.com';
const DIRECTUS_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || 'd1r3ctu5';
const SCHEMA_FILE = path.join(process.cwd(), 'scripts/migration-exports/directus-schema.json');

// Initialize Directus client
const directus = createDirectus(DIRECTUS_URL).with(rest()).with(authentication());

async function authenticateDirectus() {
    try {
        await directus.login(DIRECTUS_EMAIL, DIRECTUS_PASSWORD);
        console.log('✅ Successfully authenticated with Directus');
    } catch (error) {
        console.error('❌ Failed to authenticate with Directus:', error.message);
        process.exit(1);
    }
}

async function loadSchemaFile() {
    try {
        if (!fs.existsSync(SCHEMA_FILE)) {
            console.error(`❌ Schema file not found: ${SCHEMA_FILE}`);
            console.log('💡 Run "npm run migrate:generate" first to create the schema file');
            process.exit(1);
        }

        const schemaContent = fs.readFileSync(SCHEMA_FILE, 'utf8');
        const schema = JSON.parse(schemaContent);

        console.log(`✅ Loaded schema file: ${SCHEMA_FILE}`);
        console.log(`📊 Found ${schema.collections.length} collections and ${schema.fields.length} fields`);

        return schema;
    } catch (error) {
        console.error('❌ Failed to load schema file:', error.message);
        process.exit(1);
    }
}

async function applyCollections(collections) {
    console.log('\n📋 Creating collections...');

    for (const collection of collections) {
        try {
            const collectionData = {
                collection: collection.collection,
                meta: collection.meta,
                schema: collection.schema
            };

            await directus.request(createCollection(collectionData));
            console.log(`✅ Created collection: ${collection.collection}`);
        } catch (error) {
            console.error(`❌ Failed to create collection "${collection.collection}":`, error.message);
        }
    }
}

async function applyFields(fields) {
    console.log('\n🔧 Creating fields...');

    // Group fields by collection for better organization
    const fieldsByCollection = fields.reduce((acc, field) => {
        if (!acc[field.collection]) {
            acc[field.collection] = [];
        }
        acc[field.collection].push(field);
        return acc;
    }, {});

    for (const [collectionName, collectionFields] of Object.entries(fieldsByCollection)) {
        console.log(`\n📝 Creating fields for collection: ${collectionName}`);

        for (const field of collectionFields) {
            try {
                const fieldData = {
                    field: field.field,
                    type: field.type,
                    meta: field.meta,
                    schema: field.schema
                };

                await directus.request(createField(field.collection, fieldData));
                console.log(`  ✅ Created field: ${field.field}`);
            } catch (error) {
                console.error(`  ❌ Failed to create field "${field.field}":`, error.message);
            }
        }
    }
}

async function setPermissions() {
    console.log('\n🔐 Setting up basic permissions...');

    try {
        // Note: This would require more complex permission setup
        // For now, we'll just log that permissions should be set manually
        console.log('⚠️ Permissions need to be set manually in the Directus admin:');
        console.log('   1. Go to Settings > Roles & Permissions');
        console.log('   2. Create or edit the "Public" role');
        console.log('   3. Grant READ access to all collections (blog, projects, galleries, about)');
        console.log('   4. Ensure the public role can access the files collection for images');
    } catch (error) {
        console.error('❌ Failed to set permissions:', error.message);
    }
}

async function verifySchema() {
    console.log('\n🔍 Verifying schema application...');

    try {
        // Try to fetch collections to verify they exist
        const response = await fetch(`${DIRECTUS_URL}/collections`, {
            headers: {
                'Authorization': `Bearer ${directus.getToken()}`
            }
        });

        const collections = await response.json();
        const createdCollections = collections.data.filter(c =>
            ['blog', 'projects', 'galleries', 'about'].includes(c.collection)
        );

        console.log(`✅ Verified ${createdCollections.length}/4 collections created successfully`);

        for (const collection of createdCollections) {
            console.log(`  📋 ${collection.collection} - ${collection.meta.icon || 'no icon'}`);
        }

        if (createdCollections.length === 4) {
            console.log('\n🎉 Schema application completed successfully!');
        } else {
            console.log('\n⚠️ Some collections may not have been created. Check the logs above.');
        }

    } catch (error) {
        console.error('❌ Failed to verify schema:', error.message);
    }
}

async function main() {
    console.log('🚀 Applying Directus schema...');
    console.log(`📍 Directus URL: ${DIRECTUS_URL}`);
    console.log(`📄 Schema file: ${SCHEMA_FILE}`);

    try {
        await authenticateDirectus();
        const schema = await loadSchemaFile();

        await applyCollections(schema.collections);
        await applyFields(schema.fields);
        await setPermissions();
        await verifySchema();

        console.log('\n🎉 Schema application completed!');
        console.log('\nNext steps:');
        console.log('1. Set up permissions in Directus admin (Settings > Roles & Permissions)');
        console.log('2. Create sample data: npm run seed:dummy');
        console.log('3. Generate an access token (Settings > Access Tokens)');
        console.log('4. Update your .env.dev file with the token');
        console.log('5. Test your application: npm run dev');

    } catch (error) {
        console.error('\n💥 Schema application failed:', error.message);
        process.exit(1);
    }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
Directus Schema Application Script

Usage: node scripts/apply-schema.js [options]

Environment Variables:
  DIRECTUS_URL              Directus instance URL (default: http://localhost:8055)
  DIRECTUS_ADMIN_EMAIL      Admin email (default: admin@example.com)
  DIRECTUS_ADMIN_PASSWORD   Admin password (default: d1r3ctu5)

Options:
  --help, -h    Show this help message

Before running:
1. Make sure Directus is running: docker-compose -f docker-compose.dev.yml up -d
2. Make sure you have a schema file: npm run migrate:generate
3. Verify admin credentials (or set environment variables)

The script will:
- Create all collections (blog, projects, galleries, about)
- Create all fields with proper types and interfaces
- Set up basic metadata for the Directus admin UI
- Verify the schema was applied correctly

After running:
- Set up permissions manually in Directus admin
- Create sample data or migrate existing content
- Generate access tokens for your application

Example:
  DIRECTUS_ADMIN_EMAIL=admin@mysite.com DIRECTUS_ADMIN_PASSWORD=mypassword node scripts/apply-schema.js
`);
    process.exit(0);
}

main();
