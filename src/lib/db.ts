// ✅ Neon PostgreSQL Database Implementation
// Using @neondatabase/serverless driver

import { Pool } from '@neondatabase/serverless';

class NeonSQLDatabase {
  private pool: Pool;

  constructor() {
    // Check if DATABASE_URL is defined
    if (!process.env.DATABASE_URL) {
      throw new Error('❌ DATABASE_URL is not defined in environment variables.');
    }

    // Initialize the connection pool with Neon PostgreSQL
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  // ✅ Generic query method for PostgreSQL
  async query(sql: string, params: any[] = []) {
    try {
      const client = await this.pool.connect();
      try {
        const result = await client.query(sql, params);
        return result; // result.rows contains data
      } finally {
        client.release();
      }
    } catch (error: any) {
      console.error('❌ Database query error:', error);
      throw new Error(`Database query failed: ${error.message || error}`);
    }
  }

  // ✅ Create users table (if not exists)
  async createUsersTable() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    
    try {
      await this.query(createTableSQL);
      console.log('✅ Users table created successfully');
    } catch (error: any) {
      console.error('❌ Error creating users table:', error);
      throw new Error(`Failed to create users table: ${error.message || error}`);
    }
  }

  // ✅ Gracefully close all connections in the pool
  async close() {
    await this.pool.end();
    console.log('✅ Database connection closed.');
  }
}

// ✅ Initialize with Neon PostgreSQL connection
const database = new NeonSQLDatabase();

export { database };