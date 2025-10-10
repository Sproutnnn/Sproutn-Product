import bcrypt from 'bcryptjs';
import { supabase } from '../lib/supabase';
import type { Tables, TablesInsert } from '../types/database.types';

export type User = Tables<'users'>;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  companyName?: string;
  role?: 'admin' | 'customer';
}

export const authService = {
  /**
   * Register a new user
   */
  async signUp(data: SignUpData): Promise<User> {
    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    const userData: TablesInsert<'users'> = {
      email: data.email,
      name: data.name,
      password_hash: passwordHash,
      role: data.role || 'customer',
      company_name: data.companyName
    };

    const { data: user, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return user;
  },

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<User> {
    // Fetch user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', credentials.email)
      .single();

    if (error || !user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      credentials.password,
      user.password_hash
    );

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    return user;
  },

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return data;
  },

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updates: Partial<Pick<User, 'name' | 'company_name' | 'email'>>
  ): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Change password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    // Get current user
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password
    const { error } = await supabase
      .from('users')
      .update({ password_hash: newPasswordHash })
      .eq('id', userId);

    if (error) {
      throw new Error(error.message);
    }
  }
};
