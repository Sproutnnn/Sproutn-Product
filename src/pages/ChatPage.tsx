import React, { useEffect, useState, useRef, Fragment } from 'react';
import { SendIcon, UserIcon, SearchIcon, XIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
interface ChatMessage {
  id: number;
  sender: {
    id: string;
    name: string;
    role: 'admin' | 'customer';
    avatar?: string;
  };
  text: string;
  timestamp: string;
}
interface ChatThread {
  id: string;
  user: {
    id: string;
    name: string;
    role: 'admin' | 'customer';
    avatar?: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}
const ChatPage: React.FC = () => {
  const {
    user
  } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Mock data for chat threads
  useEffect(() => {
    const mockThreads: ChatThread[] = [{
      id: '1',
      user: {
        id: '2',
        name: 'John Doe',
        role: 'customer'
      },
      lastMessage: 'When will my prototype be ready?',
      lastMessageTime: '2023-07-15T14:30:00Z',
      unread: 2
    }, {
      id: '2',
      user: {
        id: '3',
        name: 'Jane Smith',
        role: 'customer'
      },
      lastMessage: 'Thanks for the update!',
      lastMessageTime: '2023-07-14T09:15:00Z',
      unread: 0
    }, {
      id: '3',
      user: {
        id: '4',
        name: 'Robert Johnson',
        role: 'customer'
      },
      lastMessage: 'I have a question about my order',
      lastMessageTime: '2023-07-12T16:45:00Z',
      unread: 1
    }];
    setChatThreads(mockThreads);
    // Set first chat as active for admin users
    if (user?.role === 'admin' && mockThreads.length > 0) {
      setActiveChat(mockThreads[0].id);
      loadChatMessages(mockThreads[0].id);
    } else {
      // For customers, load their own chat
      loadChatMessages('customer-chat');
    }
  }, [user]);
  const loadChatMessages = (chatId: string) => {
    // Mock loading messages for the selected chat
    const mockMessages: ChatMessage[] = [{
      id: 1,
      sender: {
        id: 'system',
        name: 'Support Team',
        role: 'admin'
      },
      text: "Welcome to Sprout'n support! How can we help you today?",
      timestamp: new Date(Date.now() - 3600000).toISOString()
    }];
    // Add some mock conversation based on the chat ID
    if (chatId === '1') {
      mockMessages.push({
        id: 2,
        sender: {
          id: '2',
          name: 'John Doe',
          role: 'customer'
        },
        text: "Hi there, I'm wondering when my prototype will be ready?",
        timestamp: new Date(Date.now() - 3000000).toISOString()
      }, {
        id: 3,
        sender: {
          id: 'admin1',
          name: 'Sarah (Support)',
          role: 'admin'
        },
        text: 'Hello John! Your prototype is currently in production and should be ready by next Tuesday. Would you like me to send you an update when it ships?',
        timestamp: new Date(Date.now() - 2400000).toISOString()
      }, {
        id: 4,
        sender: {
          id: '2',
          name: 'John Doe',
          role: 'customer'
        },
        text: 'That would be great, thanks! Will I receive tracking information?',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }, {
        id: 5,
        sender: {
          id: 'admin1',
          name: 'Sarah (Support)',
          role: 'admin'
        },
        text: "Yes, you'll receive an email with tracking details as soon as it ships. Is there anything else you need help with?",
        timestamp: new Date(Date.now() - 1200000).toISOString()
      });
    } else if (chatId === '2') {
      mockMessages.push({
        id: 2,
        sender: {
          id: '3',
          name: 'Jane Smith',
          role: 'customer'
        },
        text: 'Hello, I just received the update about my project moving to the sourcing phase.',
        timestamp: new Date(Date.now() - 2400000).toISOString()
      }, {
        id: 3,
        sender: {
          id: 'admin2',
          name: 'Mike (Support)',
          role: 'admin'
        },
        text: "Hi Jane! Yes, we've found several potential suppliers for your eco-friendly water bottle. Would you like to schedule a call to discuss the options?",
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }, {
        id: 4,
        sender: {
          id: '3',
          name: 'Jane Smith',
          role: 'customer'
        },
        text: 'That sounds great. How about tomorrow at 2pm?',
        timestamp: new Date(Date.now() - 1200000).toISOString()
      }, {
        id: 5,
        sender: {
          id: 'admin2',
          name: 'Mike (Support)',
          role: 'admin'
        },
        text: "Perfect! I'll send you a calendar invite shortly. Thanks for your time.",
        timestamp: new Date(Date.now() - 600000).toISOString()
      }, {
        id: 6,
        sender: {
          id: '3',
          name: 'Jane Smith',
          role: 'customer'
        },
        text: 'Thanks for the update!',
        timestamp: new Date(Date.now() - 300000).toISOString()
      });
    } else if (chatId === '3') {
      mockMessages.push({
        id: 2,
        sender: {
          id: '4',
          name: 'Robert Johnson',
          role: 'customer'
        },
        text: "Hi, I have a question about my order. The payment went through but I don't see any update on my dashboard.",
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }, {
        id: 3,
        sender: {
          id: 'admin1',
          name: 'Sarah (Support)',
          role: 'admin'
        },
        text: 'Hello Robert, I apologize for the confusion. Let me check on that for you right away.',
        timestamp: new Date(Date.now() - 1200000).toISOString()
      }, {
        id: 4,
        sender: {
          id: 'admin1',
          name: 'Sarah (Support)',
          role: 'admin'
        },
        text: "I've checked our system and your payment has been processed successfully. There was a slight delay in updating your dashboard, but it should be updated now. Could you please refresh your dashboard and let me know if you see the update?",
        timestamp: new Date(Date.now() - 900000).toISOString()
      });
    } else {
      // Default chat for customers
      if (user?.role === 'customer') {
        mockMessages.push({
          id: 2,
          sender: {
            id: user.id,
            name: user.name,
            role: 'customer'
          },
          text: "Hello, I'd like to know more about the prototyping process.",
          timestamp: new Date(Date.now() - 1800000).toISOString()
        }, {
          id: 3,
          sender: {
            id: 'admin1',
            name: 'Sarah (Support)',
            role: 'admin'
          },
          text: `Hi ${user.name}! Our prototyping process typically takes 2-3 weeks depending on complexity. We'll create a physical sample based on your specifications and send it to you for feedback.`,
          timestamp: new Date(Date.now() - 1200000).toISOString()
        });
      }
    }
    setMessages(mockMessages);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: {
        id: user?.id || 'user',
        name: user?.name || 'User',
        role: user?.role || 'customer'
      },
      text: message,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, userMessage]);
    setMessage('');
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: messages.length + 2,
        sender: {
          id: 'admin1',
          name: 'Sarah (Support)',
          role: 'admin'
        },
        text: 'Thanks for your message. Our team will get back to you shortly.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, responseMessage]);
      // Update last message in chat thread for admin view
      if (user?.role === 'admin' && activeChat) {
        setChatThreads(prev => prev.map(thread => thread.id === activeChat ? {
          ...thread,
          lastMessage: message,
          lastMessageTime: new Date().toISOString()
        } : thread));
      }
    }, 1000);
  };
  const filteredThreads = chatThreads.filter(thread => thread.user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
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
  return <div className="flex flex-col h-full">
      {user?.role === 'admin' ? <div className="flex h-full">
          {/* Chat list sidebar for admins */}
          <div className="w-80 bg-white shadow-sm border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Conversations
              </h2>
              <div className="mt-2 relative">
                <input type="text" placeholder="Search chats..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" />
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredThreads.length > 0 ? <div className="divide-y divide-gray-200">
                  {filteredThreads.map(thread => <div key={thread.id} className={`p-4 cursor-pointer hover:bg-gray-50 ${activeChat === thread.id ? 'bg-primary-50' : ''}`} onClick={() => {
              setActiveChat(thread.id);
              loadChatMessages(thread.id);
              // Mark as read when selected
              setChatThreads(prev => prev.map(t => t.id === thread.id ? {
                ...t,
                unread: 0
              } : t));
            }}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {thread.user.name}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatTime(thread.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {thread.lastMessage}
                          </p>
                        </div>
                        {thread.unread > 0 && <div className="ml-2 flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-500 text-white text-xs font-medium">
                              {thread.unread}
                            </span>
                          </div>}
                      </div>
                    </div>)}
                </div> : <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>}
            </div>
          </div>
          {/* Chat main area */}
          <div className="flex-1 flex flex-col bg-white shadow rounded-lg overflow-hidden">
            {activeChat ? <>
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <h1 className="ml-3 text-lg font-semibold text-gray-900">
                      {chatThreads.find(t => t.id === activeChat)?.user.name}
                    </h1>
                  </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((msg, index) => {
                // Check if we need to show a date separator
                const showDateSeparator = index === 0 || formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp);
                return <Fragment key={msg.id}>
                          {showDateSeparator && <div className="flex justify-center my-4">
                              <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                                {formatDate(msg.timestamp)}
                              </div>
                            </div>}
                          <div className={`flex ${msg.sender.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
                            {msg.sender.role === 'customer' && <div className="flex-shrink-0 mr-3">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <UserIcon className="h-4 w-4 text-gray-500" />
                                </div>
                              </div>}
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${msg.sender.role === 'customer' ? 'bg-gray-100 text-charcoal-900' : 'bg-primary-100 text-charcoal-900'}`}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-700">
                                  {msg.sender.name}
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  {formatTime(msg.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm">{msg.text}</p>
                            </div>
                            {msg.sender.role === 'admin' && <div className="flex-shrink-0 ml-3">
                                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                                  <UserIcon className="h-4 w-4 text-primary-500" />
                                </div>
                              </div>}
                          </div>
                        </Fragment>;
              })}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <button type="submit" className="bg-primary-500 text-white rounded-r-md p-2 hover:bg-primary-600">
                      <SendIcon className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </> : <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-500">
                    Select a conversation to start chatting
                  </p>
                </div>
              </div>}
          </div>
        </div> :
    // Customer view - single chat
    <div className="bg-white shadow rounded-lg overflow-hidden flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <UserIcon className="h-4 w-4 text-primary-500" />
              </div>
              <h1 className="ml-3 text-lg font-semibold text-gray-900">
                Support Team
              </h1>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => {
            // Check if we need to show a date separator
            const showDateSeparator = index === 0 || formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp);
            return <Fragment key={msg.id}>
                    {showDateSeparator && <div className="flex justify-center my-4">
                        <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                          {formatDate(msg.timestamp)}
                        </div>
                      </div>}
                    <div className={`flex ${msg.sender.id === user?.id ? 'justify-end' : 'justify-start'}`}>
                      {msg.sender.id !== user?.id && <div className="flex-shrink-0 mr-3">
                          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-primary-500" />
                          </div>
                        </div>}
                      <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${msg.sender.id === user?.id ? 'bg-primary-100 text-charcoal-900' : 'bg-gray-100 text-charcoal-900'}`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-700">
                            {msg.sender.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      {msg.sender.id === user?.id && <div className="flex-shrink-0 ml-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>}
                    </div>
                  </Fragment>;
          })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              <button type="submit" className="bg-primary-500 text-white rounded-r-md p-2 hover:bg-primary-600">
                <SendIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>}
    </div>;
};
export default ChatPage;