import { supabase } from './supabase';

// Example database helper functions for common operations

/**
 * Fetch all records from a table
 */
export async function fetchAll<T>(tableName: string): Promise<T[]> {
  const { data, error } = await supabase
    .from(tableName)
    .select('*');

  if (error) {
    throw error;
  }

  return data as T[];
}

/**
 * Fetch a single record by ID
 */
export async function fetchById<T>(tableName: string, id: string): Promise<T | null> {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data as T;
}

/**
 * Insert a new record
 */
export async function insert<T>(tableName: string, record: Partial<T>): Promise<T> {
  const { data, error } = await supabase
    .from(tableName)
    .insert(record)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as T;
}

/**
 * Update a record by ID
 */
export async function update<T>(
  tableName: string,
  id: string,
  updates: Partial<T>
): Promise<T> {
  const { data, error } = await supabase
    .from(tableName)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as T;
}

/**
 * Delete a record by ID
 */
export async function deleteById(tableName: string, id: string): Promise<void> {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

/**
 * Query with filters
 */
export async function query<T>(
  tableName: string,
  filters: Record<string, any>
): Promise<T[]> {
  let queryBuilder = supabase.from(tableName).select('*');

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    queryBuilder = queryBuilder.eq(key, value);
  });

  const { data, error } = await queryBuilder;

  if (error) {
    throw error;
  }

  return data as T[];
}
