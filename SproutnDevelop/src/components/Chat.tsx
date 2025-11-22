import React, { useState } from 'react';
import { MessageCircleIcon, SendIcon, XIcon } from 'lucide-react';
const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{
    id: 1,
    sender: 'system',
    text: "Welcome to Sprout'n support! How can we help you today?",
    timestamp: new Date().toISOString()
  }]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, userMessage]);
    setMessage('');
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        sender: 'system',
        text: 'Thanks for your message. Our team will get back to you shortly.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
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