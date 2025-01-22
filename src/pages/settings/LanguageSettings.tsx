import React from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

const LanguageSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Language Settings</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose your preferred language and region settings.</p>
        </div>

        {/* Language Selection */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Display Language
              </label>
              <select
                id="language"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                defaultValue="en"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Region Format
              </label>
              <select
                id="region"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                defaultValue="en-US"
              >
                <option value="en-US">United States (MM/DD/YYYY)</option>
                <option value="en-GB">United Kingdom (DD/MM/YYYY)</option>
                <option value="fr-FR">France (DD/MM/YYYY)</option>
                <option value="de-DE">Germany (DD.MM.YYYY)</option>
              </select>
            </div>

            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Zone
              </label>
              <select
                id="timezone"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                defaultValue="UTC-5"
              >
                <option value="UTC-8">(UTC-8) Pacific Time</option>
                <option value="UTC-7">(UTC-7) Mountain Time</option>
                <option value="UTC-6">(UTC-6) Central Time</option>
                <option value="UTC-5">(UTC-5) Eastern Time</option>
                <option value="UTC+0">(UTC+0) Greenwich Mean Time</option>
                <option value="UTC+1">(UTC+1) Central European Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Format Preferences */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Format Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Use 24-hour time</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Use metric system</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;