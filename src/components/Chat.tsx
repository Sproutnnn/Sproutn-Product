import React, { useState, useEffect } from 'react';
import { MessageCircleIcon, SendIcon, XIcon } from 'lucide-react';
import { chatService } from '../services/chat.service';
import { useAuth } from '../context/AuthContext';
const Chat: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
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

    // Subscribe to real-time messages
    const subscription = chatService.subscribeToUserMessages(user.id, (newMessage) => {
      setMessages(prev => {
        // Avoid duplicates
        if (prev.some(m => m.id === newMessage.id)) return prev;
        return [...prev, {
          id: newMessage.id,
          sender: newMessage.sender,
          text: newMessage.text,
          timestamp: newMessage.created_at || new Date().toISOString()
        }];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);
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
  return <>
      {/* Chat button */}
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 bg-primary-500 text-white rounded-full p-3 shadow-lg hover:bg-primary-600 transition-colors z-50">
        <MessageCircleIcon className="h-6 w-6" />
      </button>
      {/* Chat window */}
      {isOpen && <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col" style={{
      height: '500px'
    }}>
          <div className="flex items-center justify-between bg-primary-500 text-white p-4 rounded-t-lg">
            <h3 className="font-medium">Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(msg => <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-primary-100 text-charcoal-900' : 'bg-gray-100 text-charcoal-900'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                  </p>
                </div>
              </div>)}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex items-center">
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              <button type="submit" className="bg-primary-500 text-white rounded-r-md p-2 hover:bg-primary-600">
                <SendIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>}
    </>;
};
export default Chat;