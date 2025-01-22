import React from 'react';
import { Shield, Key, Smartphone } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your account security and authentication methods.</p>
        </div>
        
        {/* Password Section */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
              <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Password</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Last changed 3 months ago</p>
              <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
              <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Active Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Current Session</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Last active: Just now</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Mobile App - iPhone 13</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Last active: 2 hours ago</p>
              </div>
              <button className="text-sm text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;