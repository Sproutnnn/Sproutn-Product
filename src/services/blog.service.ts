import { supabase } from '../lib/supabase';
import type { Tables, TablesInsert, TablesUpdate } from '../types/database.types';

export type BlogPost = Tables<'blog_posts'>;
export type BlogPostInsert = TablesInsert<'blog_posts'>;
export type BlogPostUpdate = TablesUpdate<'blog_posts'>;

export const blogService = {
  /**
   * Get all blog posts (published only for non-admin)
   */
  async getAll(includeUnpublished: boolean = false): Promise<BlogPost[]> {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!includeUnpublished) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Get a single blog post by ID
   */
  async getById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return data;
  },

  /**
   * Get featured blog posts
   */
  async getFeatured(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Get blog posts by category
   */
  async getByCategory(category: string): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Create a new blog post
   */
  async create(post: BlogPostInsert): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Update a blog post
   */
  async update(id: string, updates: BlogPostUpdate): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Delete a blog post
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Toggle featured status
   */
  async toggleFeatured(id: string): Promise<BlogPost> {
    const post = await this.getById(id);
    if (!post) {
      throw new Error('Blog post not found');
    }

    return this.update(id, { featured: !post.featured });
  },

  /**
   * Toggle published status
   */
  async togglePublished(id: string): Promise<BlogPost> {
    const post = await this.getById(id);
    if (!post) {
      throw new Error('Blog post not found');
    }

    return this.update(id, { published: !post.published });
  }
};
