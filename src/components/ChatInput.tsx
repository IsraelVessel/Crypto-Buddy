import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const suggestionQuestions = [
  "Which crypto is most sustainable?",
  "What's trending right now?",
  "Best crypto for long-term investment?",
  "Which coin has the lowest energy use?",
  "Show me rising cryptocurrencies"
];

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm">
      {showSuggestions && (
        <div className="p-4 pb-2">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Try asking:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestionQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(question)}
                className="text-xs bg-gradient-message border-primary/20 hover:bg-gradient-crypto hover:text-white transition-all duration-200"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask CryptoBuddy about cryptocurrencies..."
            disabled={disabled}
            className={cn(
              "flex-1 bg-chat-input border-primary/20 focus:border-primary",
              "placeholder:text-muted-foreground text-foreground"
            )}
          />
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            className={cn(
              "bg-gradient-crypto hover:opacity-90 text-white",
              "transition-all duration-200 hover:scale-105"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};