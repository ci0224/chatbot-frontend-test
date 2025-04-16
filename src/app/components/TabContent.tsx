'use client';

import React from 'react';

interface TabContentProps {
  title: React.ReactNode;
  description: React.ReactNode;
  features: string[];
  highlightText: (text: string) => React.ReactNode;
}

export default function TabContent({ title, description, features, highlightText }: TabContentProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {highlightText(feature)}
          </li>
        ))}
      </ul>
    </div>
  );
} 