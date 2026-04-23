import { getDb } from './index';
import { sql } from 'drizzle-orm';

// Ensure your .env has TURSO_URL and TURSO_AUTH_TOKEN
const dbUrl = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!dbUrl) {
  console.error('❌ TURSO_URL is missing from your environment variables.');
  process.exit(1);
}

async function reset() {
  console.log(`⏳ Resetting Turso database at: ${dbUrl}...`);
  const db = getDb(dbUrl, authToken);

  try {
    // 1. Disable Foreign Keys temporarily to avoid "Constraint failed" errors
    console.log('🔗 Disabling foreign key constraints...');
    await db.run(sql`PRAGMA foreign_keys = OFF;`);

    // 2. Drop the existing tables in your schema
    console.log('🗑️ Dropping all tables...');
    
    // Dropping in bulk for efficiency
    const tables = [
      'transactions',
      'wishes',
      'requests',
      'services',
      'products',
      'posts',
      'message',
      'session',
      'mountsmonth',
      'mounts',
      'user',
      'registrations', // from your previous example
      '__drizzle_migrations'
    ];

    for (const table of tables) {
        console.log(`   - Removing ${table}`);
        await db.run(sql.raw(`DROP TABLE IF EXISTS ${table};`));
    }

    // 3. Re-enable Foreign Keys
    await db.run(sql`PRAGMA foreign_keys = ON;`);

    console.log('✅ Database wiped successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  }
}

reset();