import React, { useEffect, useState, useRef, Fragment } from 'react';
import { SendIcon, UserIcon, SearchIcon, XIcon, Trash2Icon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { chatService, ChatThread, ChatMessage } from '../services/chat.service';

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat threads for admin
  useEffect(() => {
    const loadChatThreads = async () => {
      if (user?.role !== 'admin') {
        // For customers, just load their own messages
        loadCustomerMessages();
        return;
      }

      try {
        setLoading(true);
        const threads = await chatService.getAllChatThreads();
        setChatThreads(threads);

        // Set first chat as active if available
        if (threads.length > 0) {
          setActiveChat(threads[0].userId);
          await loadChatMessages(threads[0].userId);
        }
      } catch (error) {
        console.error('Error loading chat threads:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChatThreads();
  }, [user]);

  const loadCustomerMessages = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const chatMessages = await chatService.getUserMessages(user.id);

      if (chatMessages.length === 0) {
        // Add welcome message if no messages exist
        setMessages([{
          id: 'welcome',
          sender: 'system',
          text: "Welcome to Sprout'n support! How can we help you today?",
          user_id: user.id,
          project_id: null,
          created_at: new Date().toISOString()
        } as any]);
      } else {
        setMessages(chatMessages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChatMessages = async (userId: string) => {
    try {
      const chatMessages = await chatService.getUserMessages(userId);
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Subscribe to real-time messages
  useEffect(() => {
    if (!user?.id) return;

    if (user.role === 'admin') {
      // Admin subscribes to ALL messages
      const subscription = chatService.subscribeToAllMessages((newMessage) => {
        // If message is for the active chat, add it to messages
        if (newMessage.user_id === activeChat) {
          setMessages(prev => {
            // Avoid duplicates
            if (prev.some(m => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }

        // Update threads list with new message
        setChatThreads(prev => {
          const existingThread = prev.find(t => t.userId === newMessage.user_id);
          if (existingThread) {
            // Update existing thread
            return prev.map(t =>
              t.userId === newMessage.user_id
                ? { ...t, lastMessage: newMessage.text, lastMessageTime: newMessage.created_at || new Date().toISOString() }
                : t
            );
          }
          // If new user, we'd need to fetch their details - for now just refresh
          return prev;
        });
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Customer subscribes to their own messages
      const subscription = chatService.subscribeToUserMessages(user.id, (newMessage) => {
        setMessages(prev => {
          // Avoid duplicates
          if (prev.some(m => m.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, activeChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const targetUserId = user?.role === 'admin' ? activeChat : user?.id;
    if (!targetUserId) return;

    const messageText = message;
    setMessage('');

    try {
      const newMessage = await chatService.sendMessage({
        sender: user?.role === 'admin' ? 'admin' : 'user',
        text: messageText,
        user_id: targetUserId
      });

      // Immediately add the message to local state
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setMessage(messageText);
    }
  };

  const handleDeleteChat = async (userId: string) => {
    if (!user?.id) return;

    try {
      await chatService.softDeleteUserChat(userId, user.id);
      // Remove from threads list
      setChatThreads(prev => prev.filter(t => t.userId !== userId));
      // If this was the active chat, clear it
      if (activeChat === userId) {
        setActiveChat(null);
        setMessages([]);
      }
      setShowDeleteConfirm(null);
      alert('Chat deleted successfully');
    } catch (error) {
      console.error('Error deleting chat:', error);
      alert('Failed to delete chat');
    }
  };

  const filteredThreads = chatThreads.filter(thread =>
    thread.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {user?.role === 'admin' ? (
        <div className="flex h-full">
          {/* Chat list sidebar for admins */}
          <div className="w-80 bg-white shadow-sm border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
              <div className="mt-2 relative">
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredThreads.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredThreads.map(thread => (
                    <div
                      key={thread.userId}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${activeChat === thread.userId ? 'bg-primary-50' : ''}`}
                    >
                      <div className="flex items-start">
                        <div
                          className="flex-1"
                          onClick={() => {
                            setActiveChat(thread.userId);
                            loadChatMessages(thread.userId);
                          }}
                        >
                          <div className="flex-shrink-0 inline-block">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-gray-500" />
                            </div>
                          </div>
                          <div className="ml-3 inline-block align-top">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {thread.userName}
                              </h3>
                            </div>
                            <p className="text-xs text-gray-500">{thread.userEmail}</p>
                            <p className="text-sm text-gray-500 truncate mt-1">
                              {thread.lastMessage}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(thread.userId);
                          }}
                          className="ml-2 p-1 text-gray-400 hover:text-red-500"
                          title="Delete chat"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              )}
            </div>
          </div>

          {/* Chat main area */}
          <div className="flex-1 flex flex-col bg-white shadow rounded-lg overflow-hidden">
            {activeChat ? (
              <>
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <h1 className="text-lg font-semibold text-gray-900">
                          {chatThreads.find(t => t.userId === activeChat)?.userName}
                        </h1>
                        <p className="text-xs text-gray-500">
                          {chatThreads.find(t => t.userId === activeChat)?.userEmail}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDeleteConfirm(activeChat)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded"
                      title="Delete chat"
                    >
                      <Trash2Icon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((msg, index) => {
                      const showDateSeparator = index === 0 ||
                        formatDate(msg.created_at || '') !== formatDate(messages[index - 1].created_at || '');
                      return (
                        <Fragment key={msg.id}>
                          {showDateSeparator && (
                            <div className="flex justify-center my-4">
                              <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                                {formatDate(msg.created_at || '')}
                              </div>
                            </div>
                          )}
                          <div className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                            {msg.sender === 'user' && (
                              <div className="flex-shrink-0 mr-3">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <UserIcon className="h-4 w-4 text-gray-500" />
                                </div>
                              </div>
                            )}
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                              msg.sender === 'user' ? 'bg-gray-100 text-charcoal-900' : 'bg-primary-100 text-charcoal-900'
                            }`}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-700">
                                  {msg.sender === 'user' ? 'Customer' : msg.sender === 'admin' ? 'Admin' : 'System'}
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  {formatTime(msg.created_at || '')}
                                </span>
                              </div>
                              <p className="text-sm">{msg.text}</p>
                            </div>
                            {msg.sender !== 'user' && (
                              <div className="flex-shrink-0 ml-3">
                                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                                  <UserIcon className="h-4 w-4 text-primary-500" />
                                </div>
                              </div>
                            )}
                          </div>
                        </Fragment>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                      type="text"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button type="submit" className="bg-primary-500 text-white rounded-r-md p-2 hover:bg-primary-600">
                      <SendIcon className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-500">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Customer view - single chat
        <div className="bg-white shadow rounded-lg overflow-hidden flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <UserIcon className="h-4 w-4 text-primary-500" />
              </div>
              <h1 className="ml-3 text-lg font-semibold text-gray-900">Support Team</h1>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => {
                const showDateSeparator = index === 0 ||
                  formatDate(msg.created_at || '') !== formatDate(messages[index - 1].created_at || '');
                return (
                  <Fragment key={msg.id}>
                    {showDateSeparator && (
                      <div className="flex justify-center my-4">
                        <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                          {formatDate(msg.created_at || '')}
                        </div>
                      </div>
                    )}
                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.sender !== 'user' && (
                        <div className="flex-shrink-0 mr-3">
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-primary-500" />
                          </div>
                        </div>
                      )}
                      <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                        msg.sender === 'user' ? 'bg-primary-100 text-charcoal-900' : 'bg-gray-100 text-charcoal-900'
                      }`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-700">
                            {msg.sender === 'user' ? 'You' : 'Support'}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {formatTime(msg.created_at || '')}
                          </span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      {msg.sender === 'user' && (
                        <div className="flex-shrink-0 ml-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  </Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="bg-primary-500 text-white rounded-r-md p-2 hover:bg-primary-600">
                <SendIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Chat</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this chat? The messages will be hidden from view but logs will be kept for records.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteChat(showDeleteConfirm)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
