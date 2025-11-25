import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductInsert {
  name: string;
  description?: string;
  image_url?: string;
  category?: string;
  featured?: boolean;
  active?: boolean;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  image_url?: string;
  category?: string;
  featured?: boolean;
  active?: boolean;
}

/**
 * Get all active products
 */
export const getActiveProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching active products:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get all products (admin only)
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', category)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching product:', error);
    throw error;
  }

  return data;
};

/**
 * Create a new product (admin only)
 */
export const createProduct = async (product: ProductInsert): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }

  return data;
};

/**
 * Update an existing product (admin only)
 */
export const updateProduct = async (
  id: string,
  updates: ProductUpdate
): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }

  return data;
};

/**
 * Delete a product (admin only)
 */
export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

/**
 * Toggle product active status (admin only)
 */
export const toggleProductActive = async (
  id: string,
  active: boolean
): Promise<Product> => {
  return updateProduct(id, { active });
};

/**
 * Toggle product featured status (admin only)
 */
export const toggleProductFeatured = async (
  id: string,
  featured: boolean
): Promise<Product> => {
  return updateProduct(id, { featured });
};
