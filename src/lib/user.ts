import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { database } from './db';

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

// Create users table if it doesn't exist
export async function initializeDatabase() {
  await database.createUsersTable();
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret_key', {
    expiresIn: '7d',
  });
}

// Verify JWT token
export function verifyToken(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key') as { userId: number };
  } catch {
    return null;
  }
}

// Create a new user
export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  try {
    const hashedPassword = await hashPassword(password);
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, hashedPassword];
    const result = await database.query(query, values);

    if (result.rows && result.rows.length > 0) {
      return result.rows[0];
    }
    
    return null;
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create user: ${msg}`);
  }
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await database.query(query, values);
    return (result.rows && result.rows.length > 0) ? result.rows[0] : null;
  } catch (error: unknown) {
    console.error('Error finding user by email:', error);
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to find user by email: ${msg}`);
  }
}

// Find user by ID
export async function findUserById(id: number): Promise<User | null> {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result = await database.query(query, values);
    return (result.rows && result.rows.length > 0) ? result.rows[0] : null;
  } catch (error: unknown) {
    console.error('Error finding user by ID:', error);
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to find user by ID: ${msg}`);
  }
}