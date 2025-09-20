const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

// Database connection - use environment variable or default
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/tawasul';

class DatabaseManager {
  constructor() {
    this.pool = null;
  }

  // Initialize database connection with retry logic
  async init(maxRetries = 10, delay = 2000) {
    let retries = 0;
    
    while (retries < maxRetries) {
      try {
        // Create PostgreSQL connection pool
        this.pool = new Pool({
          connectionString: DATABASE_URL,
          ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        });

        // Test the connection
        const client = await this.pool.connect();
        client.release();

        console.log('✅ Connected to PostgreSQL database');
        
        await this.initializeSchema();
        return; // Success, exit retry loop
      } catch (err) {
        retries++;
        console.log(`⏳ Database connection attempt ${retries}/${maxRetries} failed: ${err.message}`);
        
        if (retries >= maxRetries) {
          console.error('❌ Failed to connect to database after maximum retries');
          throw err;
        }
        
        console.log(`⏳ Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // Initialize database schema and seed data
  async initializeSchema() {
    try {
      // Read and execute schema
      const schemaPath = path.join(__dirname, 'schema.sql');
      const seedPath = path.join(__dirname, 'seed.sql');

      const schema = fs.readFileSync(schemaPath, 'utf8');
      await this.pool.query(schema);
      console.log('✅ Database schema initialized');

      // Read and execute seed data
      const seed = fs.readFileSync(seedPath, 'utf8');
      await this.pool.query(seed);
      console.log('✅ Database seeded with initial data');
    } catch (err) {
      console.error('Error initializing schema:', err);
      throw err;
    }
  }

  // Generic query method - returns all rows
  async query(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  // Get all rows (alias for query)
  async queryAll(sql, params = []) {
    return await this.query(sql, params);
  }

  // Get single row
  async get(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows[0] || null;
    } catch (err) {
      throw err;
    }
  }

  // Run query (for INSERT, UPDATE, DELETE)
  async run(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return { 
        id: result.rows[0]?.id || null,
        changes: result.rowCount 
      };
    } catch (err) {
      throw err;
    }
  }

  // Close database connection
  async close() {
    try {
      await this.pool.end();
      console.log('Database connection closed');
    } catch (err) {
      throw err;
    }
  }
}

// Create singleton instance
const database = new DatabaseManager();

module.exports = database;
