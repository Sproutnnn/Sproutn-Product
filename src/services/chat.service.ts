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
    // First get all unique user_ids from chat_messages
    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching chat messages:', error);
      throw new Error(error.message);
    }

    // Get unique user IDs
    const userIds = [...new Set((messages || []).map(m => m.user_id).filter(Boolean))];

    if (userIds.length === 0) {
      return [];
    }

    // Fetch user details
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, name, email')
      .in('id', userIds);

    if (usersError) {
      console.error('Error fetching users:', usersError);
      throw new Error(usersError.message);
    }

    // Create a map of users
    const userMap = new Map((users || []).map(u => [u.id, u]));

    // Group messages by user and get the latest message for each
    const threadMap = new Map<string, ChatThread>();

    for (const msg of messages || []) {
      const userId = msg.user_id;
      if (!userId) continue;

      const user = userMap.get(userId);

      if (!threadMap.has(userId)) {
        threadMap.set(userId, {
          userId,
          userName: user?.name || 'Unknown',
          userEmail: user?.email || '',
          lastMessage: msg.text,
          lastMessageTime: msg.created_at || new Date().toISOString(),
          unreadCount: 0,
          isDeleted: false
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
   * Subscribe to ALL new messages (for admin view)
   */
  subscribeToAllMessages(
    callback: (message: ChatMessage) => void
  ) {
    return supabase
      .channel('all_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
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
  },

  /**
   * Update typing indicator for a user
   */
  async setTypingStatus(userId: string): Promise<void> {
    const { error } = await supabase
      .from('typing_indicators')
      .upsert({
        user_id: userId,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error setting typing status:', error.message);
    }
  },

  /**
   * Get typing status for a specific user (for admin)
   */
  async getTypingStatus(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('typing_indicators')
      .select('updated_at')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error getting typing status:', error.message);
      return false;
    }

    if (!data) {
      return false;
    }

    // Consider typing if updated within last 5 seconds
    const updatedAt = new Date(data.updated_at).getTime();
    const now = Date.now();
    return (now - updatedAt) < 5000;
  },

  /**
   * Get all users currently typing (for admin)
   */
  async getAllTypingUsers(): Promise<string[]> {
    const threeSecondsAgo = new Date(Date.now() - 3000).toISOString();

    const { data, error } = await supabase
      .from('typing_indicators')
      .select('user_id')
      .gte('updated_at', threeSecondsAgo);

    if (error || !data) {
      return [];
    }

    return data.map(d => d.user_id);
  }
};
