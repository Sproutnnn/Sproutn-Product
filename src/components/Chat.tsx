import React, { useState, useEffect, useRef } from 'react';
import { MessageCircleIcon, SendIcon, XIcon } from 'lucide-react';
import { chatService } from '../services/chat.service';
import { useAuth } from '../context/AuthContext';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [message, setMessage] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Array<{
    id: string | number;
    sender: string;
    text: string;
    timestamp: string;
  }>>([]);
  const [loading, setLoading] = useState(false);

  // Load messages when component mounts and user is available
  useEffect(() => {
    if (!user?.id) return;

    const loadMessages = async () => {
      try {
        setLoading(true);
        const chatMessages = await chatService.getUserMessages(user.id);

        if (chatMessages.length === 0) {
          // Add welcome message if no messages exist
          setMessages([{
            id: 'welcome',
            sender: 'system',
            text: "Welcome to Sprout'n support! How can we help you today?",
            timestamp: new Date().toISOString()
          }]);
        } else {
          setMessages(chatMessages.map(m => ({
            id: m.id,
            sender: m.sender,
            text: m.text,
            timestamp: m.created_at || new Date().toISOString()
          })));
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Poll for new messages every 3 seconds (since realtime requires paid Supabase plan)
    const pollMessages = async () => {
      try {
        const chatMessages = await chatService.getUserMessages(user.id);
        if (chatMessages.length > 0) {
          setMessages(chatMessages.map(m => ({
            id: m.id,
            sender: m.sender,
            text: m.text,
            timestamp: m.created_at || new Date().toISOString()
          })));
        }
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    };

    const interval = setInterval(pollMessages, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mark messages as read when customer views them
  useEffect(() => {
    if (!user?.id || !isOpen) return;

    const markAsRead = async () => {
      await chatService.markAsReadByCustomer(user.id);
    };

    markAsRead();
  }, [user, isOpen, messages]);

  // Handle typing indicator
  const handleTyping = (value: string) => {
    setMessage(value);

    if (!user?.id || !value.trim()) return;

    // Debounce typing indicator updates
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Send typing status
    chatService.setTypingStatus(user.id);

    // Clear typing status after 2 seconds of no typing
    typingTimeoutRef.current = setTimeout(() => {
      // Typing stopped - status will expire on its own
    }, 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user?.id) return;

    const messageText = message;
    setMessage(''); // Clear input immediately

    try {
      // Send user message
      const newMessage = await chatService.sendMessage({
        sender: 'user',
        text: messageText,
        user_id: user.id
      });

      // Immediately add the message to local state
      setMessages(prev => [...prev, {
        id: newMessage.id,
        sender: newMessage.sender,
        text: newMessage.text,
        timestamp: newMessage.created_at || new Date().toISOString()
      }]);

      // Simulate auto-response after a short delay
      setTimeout(async () => {
        try {
          const autoResponse = await chatService.sendMessage({
            sender: 'system',
            text: 'Thanks for your message. Our team will get back to you shortly.',
            user_id: user.id
          });
          setMessages(prev => [...prev, {
            id: autoResponse.id,
            sender: autoResponse.sender,
            text: autoResponse.text,
            timestamp: autoResponse.created_at || new Date().toISOString()
          }]);
        } catch (error) {
          console.error('Error sending auto-response:', error);
        }
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setMessage(messageText); // Restore message on error
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before fully closing
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      {/* CSS for animations */}
      <style>{`
        @keyframes chatOpen {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes chatClose {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
        }

        @keyframes buttonPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes buttonWiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        .chat-button {
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        .chat-button:hover {
          opacity: 1;
          animation: buttonPulse 0.6s ease-in-out infinite;
        }

        .chat-button:hover .chat-icon {
          animation: buttonWiggle 0.5s ease-in-out;
        }

        .chat-window-open {
          animation: chatOpen 0.3s ease-out forwards;
        }

        .chat-window-close {
          animation: chatClose 0.3s ease-in forwards;
        }

        .chat-header {
          animation: slideDown 0.3s ease-out 0.1s both;
        }

        .chat-body {
          animation: slideDown 0.3s ease-out 0.15s both;
        }

        .chat-footer {
          animation: slideDown 0.3s ease-out 0.2s both;
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Chat button - only show when chat is closed */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="chat-button fixed bottom-6 right-6 bg-primary-500 text-white rounded-full p-4 shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all duration-300 z-50"
        >
          <MessageCircleIcon className="chat-icon h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden ${
            isClosing ? 'chat-window-close' : 'chat-window-open'
          }`}
          style={{ height: '500px' }}
        >
          <div className="chat-header flex items-center justify-between bg-primary-500 text-white p-4 rounded-t-lg">
            <h3 className="font-medium">Chat with Support</h3>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors duration-200 hover:rotate-90 transform"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="chat-body flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 transition-all duration-200 hover:shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-primary-100 text-charcoal-900'
                      : 'bg-gray-100 text-charcoal-900'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="chat-footer p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={e => handleTyping(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow duration-200"
              />
              <button
                type="submit"
                className="bg-primary-500 text-white rounded-r-md p-2 hover:bg-primary-600 transition-colors duration-200 hover:scale-105 transform"
              >
                <SendIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chat;
