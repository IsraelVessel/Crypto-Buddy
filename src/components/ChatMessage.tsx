import { ChatMessage as ChatMessageType } from '@/types/crypto';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.type === 'bot';
  
  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg transition-all duration-300 ease-smooth",
      isBot ? "bg-gradient-message" : "bg-chat-user/10",
      "animate-in slide-in-from-bottom-2 fade-in duration-300"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isBot ? "bg-gradient-crypto" : "bg-chat-user"
      )}>
        {isBot ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "font-semibold text-sm",
            isBot ? "text-primary" : "text-chat-user"
          )}>
            {isBot ? 'CryptoBuddy' : 'You'}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        
        <div className={cn(
          "text-sm leading-relaxed whitespace-pre-wrap",
          isBot ? "text-foreground" : "text-foreground"
        )}>
          {message.isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <span className="text-muted-foreground ml-2">CryptoBuddy is typing...</span>
            </div>
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  );
};