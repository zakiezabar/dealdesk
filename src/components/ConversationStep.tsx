import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';

interface ConversationStepProps {
  onNext: (data: any) => void;
}

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
}

const ConversationStep: React.FC<ConversationStepProps> = ({ onNext }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'Hi! I\'ll help you build a cloud landing zone. What would you like me to create for you? For example: "Build a cloud landing zone"'
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [collectedData, setCollectedData] = useState({
    initialRequest: '',
    clientName: '',
    infraSize: '',
    complianceNeeds: '',
    regions: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: currentInput
    };

    // Handle the initial request
    if (currentQuestion === 0) {
      setCollectedData(prev => ({ ...prev, initialRequest: currentInput }));
      
      // Extract client name from initial request if possible
      const clientMatch = currentInput.match(/for\s+(\w+)/i);
      if (clientMatch) {
        setCollectedData(prev => ({ ...prev, clientName: clientMatch[1] }));
      }

      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: questions[0].question
      };

      setMessages(prev => [...prev, newUserMessage, aiResponse]);
      setCurrentQuestion(1);
    } else {
      // Handle subsequent questions
      const questionKey = questions[currentQuestion - 1].key as keyof typeof collectedData;
      setCollectedData(prev => ({ ...prev, [questionKey]: currentInput }));

      let aiResponse: Message;
      
      if (currentQuestion < questions.length) {
        aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          content: questions[currentQuestion - 1].followUp(currentInput)
        };
        setMessages(prev => [...prev, newUserMessage, aiResponse]);
        
        // Ask next question after a brief delay
        setTimeout(() => {
          if (currentQuestion < questions.length) {
            const nextQuestion: Message = {
              id: messages.length + 3,
              type: 'ai',
              content: questions[currentQuestion].question
            };
            setMessages(prev => [...prev, nextQuestion]);
          }
        }, 1000);
        
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Final response
        aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          content: questions[currentQuestion - 1].followUp(currentInput)
        };
        setMessages(prev => [...prev, newUserMessage, aiResponse]);
        
        // Complete the conversation and move to next step
        setTimeout(() => {
          onNext({
            ...collectedData,
            [questionKey]: currentInput
          });
        }, 2000);
      }
    }

    setCurrentInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">New Scope Setup</CardTitle>
        <p className="text-muted-foreground text-center">
          Let`&apos;s gather your requirements through a quick conversation
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
                    : 'bg-background border'
                }`}
              >
                {message.content}
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
            placeholder="Type your response..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationStep;