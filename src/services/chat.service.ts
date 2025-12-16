import { supabase } from '../lib/supabase';
import type { Tables, TablesInsert } from '../types/database.types';

export type ChatMessage = Tables<'chat_messages'>;
export type ChatMessageInsert = TablesInsert<'chat_messages'>;

export interface ChatThread {
  userId: string;
  userName: string;
  userEmail: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isDeleted: boolean;
}

export const chatService = {
  /**
   * Get all messages for a user (excluding deleted)
   */
  async getUserMessages(userId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * Get all chat threads (for admin view)
   */
  async getAllChatThreads(): Promise<ChatThread[]> {
    // Get all users who have sent messages
    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select(`
        user_id,
        text,
        created_at,
        deleted_at,
        users!chat_messages_user_id_fkey (
          id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    // Group messages by user and get the latest message for each
    const threadMap = new Map<string, ChatThread>();

    for (const msg of messages || []) {
      const userId = msg.user_id;
      if (!userId || !msg.users) continue;

      if (!threadMap.has(userId)) {
        threadMap.set(userId, {
          userId,
          userName: (msg.users as any).name || 'Unknown',
          userEmail: (msg.users as any).email || '',
          lastMessage: msg.deleted_at ? '[Deleted]' : msg.text,
          lastMessageTime: msg.created_at || new Date().toISOString(),
          unreadCount: 0,
          isDeleted: !!msg.deleted_at
        });
      }
    }

    return Array.from(threadMap.values());
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
  },

  /**
   * Soft delete all messages for a user (keeps logs but marks as deleted)
   */
  async softDeleteUserChat(userId: string, deletedByUserId: string): Promise<void> {
    const { error } = await supabase
      .from('chat_messages')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: deletedByUserId
      })
      .eq('user_id', userId)
      .is('deleted_at', null);

    if (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Get all messages for a user including deleted (for admin logs)
   */
  async getAllUserMessagesIncludingDeleted(userId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
};
