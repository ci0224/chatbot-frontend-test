'use client';

import { useState } from 'react';

type TabId = 'app' | 'documents';

interface Tab {
  id: TabId;
  label: string;
}

interface TabContent {
  title: string;
  description: string;
  features: string[];
}

interface Content {
  [key: string]: TabContent;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('app');

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

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Chatbot</span>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md ml-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-4 pr-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Tabs */}
            <div className="hidden lg:block w-48">
              <div className="flex flex-col space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-4 text-sm font-medium rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content[activeTab].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content[activeTab].description}
                </p>
                <ul className="space-y-2">
                  {content[activeTab].features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
