'use client';

import React from 'react';

export type TabId = 'app' | 'documents';

interface Tab {
  id: TabId;
  label: string;
}

interface TabsProps {
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
  tabs: Tab[];
}

export default function Tabs({ activeTab, setActiveTab, tabs }: TabsProps) {
  return (
    <>
      {/* Mobile Tabs */}
      <div className="lg:hidden mb-6">
        <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
          {tabs.map(tab => (
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
      {/* Desktop Tabs */}
      <div className="hidden lg:block w-48">
        <div className="flex flex-col space-y-1">
          {tabs.map(tab => (
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
    </>
  );
} 