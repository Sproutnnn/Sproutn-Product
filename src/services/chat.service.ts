import { supabase } from '../lib/supabase';
import type { Tables, TablesInsert } from '../types/database.types';

export type ChatMessage = Tables<'chat_messages'>;
export type ChatMessageInsert = TablesInsert<'chat_messages'>;

export const chatService = {
  /**
   * Get all messages for a user
   */
  async getUserMessages(userId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Get all messages for a project
   */
  async getProjectMessages(projectId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Send a message
   */
  async sendMessage(message: ChatMessageInsert): Promise<ChatMessage> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert(message)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Subscribe to new messages for a user
   */
  subscribeToUserMessages(
    userId: string,
    callback: (message: ChatMessage) => void
  ) {
    return supabase
      .channel(`user_messages:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          callback(payload.new as ChatMessage);
        }
      )
      .subscribe();
  },

  /**
   * Subscribe to new messages for a project
   */
  subscribeToProjectMessages(
    projectId: string,
    callback: (message: ChatMessage) => void
  ) {
    return supabase
      .channel(`project_messages:${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          callback(payload.new as ChatMessage);
        }
      )
      .subscribe();
  }
};
