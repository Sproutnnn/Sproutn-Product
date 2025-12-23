import { supabase } from '../lib/supabase';

export interface FeedbackThread {
  id: string;
  project_id: string;
  title: string;
  initial_feedback: string;
  status: 'open' | 'resolved' | 'pending';
  category: 'general' | 'design' | 'quality' | 'shipping' | 'other';
  created_by: string;
  created_at: string;
  updated_at: string;
  creator?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  replies_count?: number;
  latest_reply?: FeedbackReply;
}

export interface FeedbackReply {
  id: string;
  thread_id: string;
  user_id: string;
  message: string;
  images: string[];
  created_at: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface CreateThreadInput {
  project_id: string;
  title: string;
  initial_feedback: string;
  category?: string;
  created_by: string;
}

export interface CreateReplyInput {
  thread_id: string;
  user_id: string;
  message: string;
  images?: string[];
}

class FeedbackService {
  // Get all threads for a project
  async getThreadsByProject(projectId: string): Promise<FeedbackThread[]> {
    const { data, error } = await supabase
      .from('feedback_threads')
      .select(`
        *,
        creator:users!feedback_threads_created_by_fkey(id, name, email, role)
      `)
      .eq('project_id', projectId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching feedback threads:', error);
      throw error;
    }

    // Get reply counts and latest replies for each thread
    const threadsWithCounts = await Promise.all(
      (data || []).map(async (thread) => {
        const { count } = await supabase
          .from('feedback_replies')
          .select('*', { count: 'exact', head: true })
          .eq('thread_id', thread.id);

        const { data: latestReply } = await supabase
          .from('feedback_replies')
          .select(`
            *,
            user:users!feedback_replies_user_id_fkey(id, name, email, role)
          `)
          .eq('thread_id', thread.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        return {
          ...thread,
          replies_count: count || 0,
          latest_reply: latestReply || undefined
        };
      })
    );

    return threadsWithCounts;
  }

  // Get a single thread with all replies
  async getThreadById(threadId: string): Promise<FeedbackThread | null> {
    const { data, error } = await supabase
      .from('feedback_threads')
      .select(`
        *,
        creator:users!feedback_threads_created_by_fkey(id, name, email, role)
      `)
      .eq('id', threadId)
      .single();

    if (error) {
      console.error('Error fetching thread:', error);
      return null;
    }

    return data;
  }

  // Get replies for a thread
  async getRepliesByThread(threadId: string): Promise<FeedbackReply[]> {
    const { data, error } = await supabase
      .from('feedback_replies')
      .select(`
        *,
        user:users!feedback_replies_user_id_fkey(id, name, email, role)
      `)
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching replies:', error);
      throw error;
    }

    return data || [];
  }

  // Create a new thread
  async createThread(input: CreateThreadInput): Promise<FeedbackThread> {
    const { data, error } = await supabase
      .from('feedback_threads')
      .insert({
        project_id: input.project_id,
        title: input.title,
        initial_feedback: input.initial_feedback,
        category: input.category || 'general',
        created_by: input.created_by,
        status: 'open'
      })
      .select(`
        *,
        creator:users!feedback_threads_created_by_fkey(id, name, email, role)
      `)
      .single();

    if (error) {
      console.error('Error creating thread:', error);
      throw error;
    }

    return data;
  }

  // Add a reply to a thread
  async addReply(input: CreateReplyInput): Promise<FeedbackReply> {
    const { data, error } = await supabase
      .from('feedback_replies')
      .insert({
        thread_id: input.thread_id,
        user_id: input.user_id,
        message: input.message,
        images: input.images || []
      })
      .select(`
        *,
        user:users!feedback_replies_user_id_fkey(id, name, email, role)
      `)
      .single();

    if (error) {
      console.error('Error adding reply:', error);
      throw error;
    }

    // Update the thread's updated_at timestamp
    await supabase
      .from('feedback_threads')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', input.thread_id);

    return data;
  }

  // Update thread status
  async updateThreadStatus(threadId: string, status: 'open' | 'resolved' | 'pending'): Promise<void> {
    const { error } = await supabase
      .from('feedback_threads')
      .update({ status })
      .eq('id', threadId);

    if (error) {
      console.error('Error updating thread status:', error);
      throw error;
    }
  }

  // Delete a thread
  async deleteThread(threadId: string): Promise<void> {
    const { error } = await supabase
      .from('feedback_threads')
      .delete()
      .eq('id', threadId);

    if (error) {
      console.error('Error deleting thread:', error);
      throw error;
    }
  }
}

export const feedbackService = new FeedbackService();
