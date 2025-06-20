import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Send } from 'lucide-react';

interface ConversationStepProps {
  onNext: (data: any) => void;
}

interface Message {
  id: string;
  type: 'ai' | 'user' | 'loading';
  content: string | React.ReactNode; // Allow JSX content
}

const ConversationStep: React.FC<ConversationStepProps> = ({ onNext }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-ai-message-1',
      type: 'ai',
      content: 'Hi! I\'m here to help you create a Scope of Work based on your project needs.'
    },
    {
      id: 'initial-ai-message-2',
      type: 'ai',
      content: (
        <>
          To get started, just tell me what you need.
          <br />
          For example: <strong><em>"Build a cloud landing zone"</em></strong>
        </>
      )
    }
  ]);
  const messageIdRef = useRef(0); // Use ref to avoid stale closure issues
  const [currentInput, setCurrentInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false); // Track user interaction
  const [collectedData, setCollectedData] = useState({
    initialRequest: '',
    clientName: '',
    infraSize: '',
    complianceNeeds: '',
    regions: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate unique ID
  const generateMessageId = () => {
    messageIdRef.current += 1;
    return `message-${messageIdRef.current}-${Date.now()}`;
  };

  const questions = [
    {
      key: 'clientName',
      question: 'Who is the customer?',
      followUp: (answer: string) => `Got it, we are going to create a landing zone scope of work for ${answer}.`
    },
    {
      key: 'infraSize',
      question: 'Do you know the approximate team size or infrastructure requirements?',
      followUp: (answer: string) => `Perfect!`
    },
    {
      key: 'complianceNeeds',
      question: 'Is compliance (e.g., HIPAA, GDPR) required?',
      followUp: (answer: string) => `Understood.`
    },
    {
      key: 'regions',
      question: 'What regions will this be deployed in?',
      followUp: (answer: string) => `Excellent! I have all the information I need. Let me proceed with the system analysis.`
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Ensure page starts at top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Only auto-scroll if user has started interacting
    if (hasUserInteracted) {
      scrollToBottom();
    }
  }, [messages, hasUserInteracted]);

  // Loading animation effect
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2; // Increase by 2% every 100ms for a 5-second duration
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const startLoadingSequence = (finalData: any) => {
    setIsLoading(true);
    setLoadingProgress(0);

    // Add loading message
    const loadingMessage: Message = {
      id: generateMessageId(),
      type: 'loading',
      content: 'Processing your requirements...'
    };
    setMessages(prev => [...prev, loadingMessage]);
    // Scroll to show loading message
    setTimeout(() => scrollToBottom(), 100);

    // Complete loading after 5 seconds and proceed to next step
    setTimeout(() => {
      onNext(finalData);
    }, 5000);
  };

  const addMessage = (message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: generateMessageId()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const addMessages = (messages: Omit<Message, 'id'>[]) => {
    const newMessages: Message[] = messages.map(msg => ({
      ...msg,
      id: generateMessageId()
    }));
    setMessages(prev => [...prev, ...newMessages]);
    return newMessages;
  };

  const handleSendMessage = () => {
    if (!currentInput.trim() || isLoading) return;

    // Handle the initial request
    if (currentQuestion === 0) {
      setCollectedData(prev => ({ ...prev, initialRequest: currentInput }));
      
      // Extract client name from initial request if possible
      const clientMatch = currentInput.match(/for\s+(\w+)/i);
      if (clientMatch) {
        setCollectedData(prev => ({ ...prev, clientName: clientMatch[1] }));
      }

      addMessages([
        { type: 'user', content: currentInput },
        { type: 'ai', content: questions[0].question }
      ]);
      setCurrentQuestion(1);
    } else {
      // Handle subsequent questions
      const questionKey = questions[currentQuestion - 1].key as keyof typeof collectedData;
      const updatedData = { ...collectedData, [questionKey]: currentInput };
      setCollectedData(updatedData);

      if (currentQuestion < questions.length) {
        addMessages([
          { type: 'user', content: currentInput },
          { type: 'ai', content: questions[currentQuestion - 1].followUp(currentInput) }
        ]);
        
        // Ask next question after a brief delay
        setTimeout(() => {
          if (currentQuestion < questions.length) {
            addMessage({ type: 'ai', content: questions[currentQuestion].question });
          }
        }, 1000);
        
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Final response
        addMessages([
          { type: 'user', content: currentInput },
          { type: 'ai', content: questions[currentQuestion - 1].followUp(currentInput) }
        ]);
        
        // Start loading sequence after final message
        setTimeout(() => {
          startLoadingSequence(updatedData);
        }, 1500);
      }
    }

    setCurrentInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">New Scope Setup</CardTitle>
        <p className="text-muted-foreground text-center">
          Let&apos;s gather your requirements through a quick conversation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-96 overflow-y-auto bg-muted/30 rounded-lg p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : message.type === 'loading'
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-background border'
                }`}
              >
                {message.type === 'loading' ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium">{message.content}</p>
                    <div className="space-y-2">
                      <Progress value={loadingProgress} className="w-full" />
                      <p className="text-xs text-muted-foreground text-center">
                        {loadingProgress < 30 && "Analyzing requirements..."}
                        {loadingProgress >= 30 && loadingProgress < 60 && "Setting up system parameters..."}
                        {loadingProgress >= 60 && loadingProgress < 90 && "Preparing analysis..."}
                        {loadingProgress >= 90 && "Almost ready..."}
                      </p>
                    </div>
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <Input
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setHasUserInteracted(true)}
            placeholder={isLoading ? "Processing..." : "Type your response..."}
            className="flex-1"
            disabled={isLoading}
            autoFocus={false}
          />
          <Button onClick={handleSendMessage} size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationStep;