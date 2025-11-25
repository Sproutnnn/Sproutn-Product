import { supabase } from '../lib/supabase';
import type { Tables, TablesInsert, TablesUpdate } from '../types/database.types';

export type Project = Tables<'projects'>;
export type ProjectInsert = TablesInsert<'projects'>;
export type ProjectUpdate = TablesUpdate<'projects'>;

export interface ProjectWithCustomer extends Project {
  customer: {
    id: string;
    name: string;
    email: string;
    companyName?: string | null;
  };
}

export const projectsService = {
  /**
   * Get all projects
   */
  async getAll(): Promise<ProjectWithCustomer[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        customer:users!customer_id (
          id,
          name,
          email,
          company_name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(project => ({
      ...project,
      customer: {
        id: project.customer.id,
        name: project.customer.name,
        email: project.customer.email,
        companyName: project.customer.company_name
      }
    }));
  },

  /**
   * Get projects for a specific customer
   */
  async getByCustomerId(customerId: string): Promise<ProjectWithCustomer[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        customer:users!customer_id (
          id,
          name,
          email,
          company_name
        )
      `)
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(project => ({
      ...project,
      customer: {
        id: project.customer.id,
        name: project.customer.name,
        email: project.customer.email,
        companyName: project.customer.company_name
      }
    }));
  },

  /**
   * Get a single project by ID
   */
  async getById(id: string): Promise<ProjectWithCustomer | null> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        customer:users!customer_id (
          id,
          name,
          email,
          company_name
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return {
      ...data,
      customer: {
        id: data.customer.id,
        name: data.customer.name,
        email: data.customer.email,
        companyName: data.customer.company_name
      }
    };
  },

  /**
   * Create a new project
   */
  async create(project: ProjectInsert): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Update a project
   */
  async update(id: string, updates: ProjectUpdate): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
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
   * Delete a project
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Get projects by status
   */
  async getByStatus(status: string): Promise<ProjectWithCustomer[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        customer:users!customer_id (
          id,
          name,
          email,
          company_name
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(project => ({
      ...project,
      customer: {
        id: project.customer.id,
        name: project.customer.name,
        email: project.customer.email,
        companyName: project.customer.company_name
      }
    }));
  },

  /**
   * Update delivery address for a project
   */
  async updateDeliveryAddress(id: string, address: {
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update({
        delivery_full_name: address.fullName,
        delivery_phone_number: address.phoneNumber,
        delivery_address_line1: address.addressLine1,
        delivery_address_line2: address.addressLine2 || null,
        delivery_city: address.city,
        delivery_state: address.state,
        delivery_zip_code: address.zipCode,
        delivery_country: address.country
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Update sample status and admin data
   */
  async updatePrototypeStatus(id: string, updates: {
    prototypeStatus: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    notes?: string;
  }): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update({
        prototype_status: updates.prototypeStatus,
        tracking_number: updates.trackingNumber || null,
        estimated_delivery: updates.estimatedDelivery || null,
        admin_notes: updates.notes || null
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Submit customer feedback for sample
   */
  async submitFeedback(id: string, feedback: string, imageUrls?: string[]): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update({
        customer_feedback: feedback,
        feedback_images: imageUrls || []
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
};
