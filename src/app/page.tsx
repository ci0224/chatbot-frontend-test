'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Tabs, { TabId } from './components/Tabs';
import TabContent from './components/TabContent';
import ChatbotButton from './components/ChatbotButton';
import ChatWindow, { Message } from './components/ChatWindow';

interface Tab {
  id: TabId;
  label: string;
}

interface TabContentType {
  title: string;
  description: string;
  features: string[];
}

interface Content {
  [key: string]: TabContentType;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('app');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>(null);

  const tabs: Tab[] = [
    { id: 'app', label: 'App' },
    { id: 'documents', label: 'Documents' }
  ];

  const content: Content = {
    app: {
      title: 'Getting Started with Our Chatbot',
      description: 'Learn how to use our advanced chatbot to streamline your workflow and improve productivity. Our AI-powered assistant is designed to understand natural language and provide accurate responses to your queries.',
      features: [
        'Natural language processing',
        'Real-time responses',
        'Multi-language support',
        'Customizable responses'
      ]
    },
    documents: {
      title: 'Documentation and Resources',
      description: 'Access our comprehensive documentation to learn more about the chatbot\'s capabilities, integration options, and best practices. Find answers to common questions and explore advanced features.',
      features: [
        'API documentation',
        'Integration guides',
        'Troubleshooting tips',
        'Best practices'
      ]
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isChatOpen]);

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</span>
      ) : (
        part
      )
    );
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText('');
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          text: 'This is a simulated bot response. In a real implementation, this would be replaced with actual AI responses.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setTimer(0);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            <div className="flex-1">
              <TabContent
                title={highlightText(content[activeTab].title)}
                description={highlightText(content[activeTab].description)}
                features={content[activeTab].features}
                highlightText={highlightText}
              />
            </div>
          </div>
        </div>
      </main>
      <ChatbotButton onClick={() => setIsChatOpen(true)} />
      <ChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onReset={resetChat}
        timer={timer}
        messages={messages}
        inputText={inputText}
        setInputText={setInputText}
        onSend={handleSendMessage}
      />
    </div>
  );
}
