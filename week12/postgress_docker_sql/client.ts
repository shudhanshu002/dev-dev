// client.ts
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to Neon DB");

    // Example: Create a table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE
      )
    `);

    // Example: Insert sample data
    await client.query(`
      INSERT INTO users (name, email)
      VALUES ('Alice', 'alice@example.com'),
             ('Bob', 'bob@example.com')
      ON CONFLICT DO NOTHING
    `);

    // Example: Read the data
    const res = await client.query("SELECT * FROM users WHERE name = $1", ['Alice']);
    console.log("📄 Users:", res.rows);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.end();
    console.log("🔌 Disconnected");
  }
}

main();
