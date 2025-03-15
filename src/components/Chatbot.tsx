
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Bot, MessageCircle, Loader2 } from 'lucide-react';
import { generateComponent } from '@/lib/ai-service';

interface ChatbotProps {
  onGenerate: (description: string, code: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onGenerate }) => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { 
      role: 'ai', 
      content: 'Hello! I\'m your UI component generator. Describe the component you want to create, and I\'ll generate it for you.'
    }
  ]);
  const { toast } = useToast();
  
  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        title: 'Empty description',
        description: 'Please provide a description for your component',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setMessages(prev => [...prev, { role: 'user', content: description }]);
    
    try {
      // Add a typing indicator message
      setMessages(prev => [...prev, { role: 'ai', content: 'Generating component...' }]);
      
      // Call AI service to generate component
      const result = await generateComponent({ prompt: description });
      
      // Remove the typing indicator and add the real response
      setMessages(prev => [
        ...prev.slice(0, -1), 
        { 
          role: 'ai', 
          content: 'I\'ve generated your component based on your description. You can see it in the preview panel and customize it further if needed.'
        }
      ]);
      
      // Pass the generated code to the parent component
      onGenerate(description, result.code);
      
      toast({
        title: 'Component generated',
        description: 'Your component has been successfully created',
      });
    } catch (error) {
      console.error('Error generating component:', error);
      // Remove the typing indicator and add an error message
      setMessages(prev => [
        ...prev.slice(0, -1), 
        { 
          role: 'ai', 
          content: 'Sorry, I encountered an error generating your component. Please try again with a different description.'
        }
      ]);
      
      toast({
        title: 'Generation failed',
        description: 'Failed to generate component. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
      setDescription('');
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex-grow overflow-y-auto rounded-lg border p-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
          >
            {message.role === 'ai' && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot size={16} />
              </div>
            )}
            
            <div className={`rounded-lg ${message.role === 'ai' ? 'rounded-tl-none bg-muted' : 'rounded-tr-none bg-primary text-primary-foreground'} p-3`}>
              <p>{message.content}</p>
            </div>
            
            {message.role === 'user' && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <MessageCircle size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="space-y-4">
          <Textarea
            placeholder="Describe the UI component you want to create. For example: 'A blue button with rounded corners and a hover effect...'"
            className="min-h-[120px] resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isGenerating}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleGenerate}
              disabled={!description.trim() || isGenerating}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Component'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
