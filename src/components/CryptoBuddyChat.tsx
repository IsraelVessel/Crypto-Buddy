import { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '@/types/crypto';
import { CryptoBuddyBot } from '@/utils/cryptoRecommendations';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, TrendingUp, Leaf } from 'lucide-react';

export const CryptoBuddyChat = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const botRef = useRef(new CryptoBuddyBot());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Send welcome message
    const welcomeMessage: ChatMessageType = {
      id: '1',
      type: 'bot',
      content: botRef.current.getGreeting(),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const simulateTyping = (responseText: string) => {
    setIsTyping(true);
    
    // Add typing indicator
    const typingMessage: ChatMessageType = {
      id: `typing-${Date.now()}`,
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingMessage]);

    // Simulate typing delay based on message length
    const typingDelay = Math.min(Math.max(responseText.length * 20, 1000), 3000);
    
    setTimeout(() => {
      setMessages(prev => {
        const filteredMessages = prev.filter(msg => !msg.isTyping);
        const botResponse: ChatMessageType = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: responseText,
          timestamp: new Date()
        };
        return [...filteredMessages, botResponse];
      });
      setIsTyping(false);
    }, typingDelay);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    const botResponse = botRef.current.generateResponse(content);
    simulateTyping(botResponse);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-crypto p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg">CryptoBuddy</h1>
              <p className="text-sm text-white/80">Your friendly crypto advisor</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trends
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Leaf className="w-3 h-3 mr-1" />
              Eco-friendly
            </Badge>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="max-w-4xl mx-auto w-full">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};