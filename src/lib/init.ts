import { database } from './db';

// Initialize the database when the module is imported
(async () => {
  try {
    await database.createUsersTable();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
})();

export {};