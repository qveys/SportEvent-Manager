import React from 'react';
import { CreditCard, Clock } from 'lucide-react';

const BillingSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Billing Settings</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your subscription and payment methods.</p>
        </div>

        {/* Current Plan */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Current Plan</h3>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Pro Plan</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">$29/month</p>
              </div>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                Change Plan
              </button>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-2" />
              Next billing date: March 31, 2024
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Payment Methods</h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
              Add Payment Method
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/24</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Default
              </span>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Billing History</h3>
          <div className="space-y-4">
            {[
              { date: 'Feb 28, 2024', amount: '$29.00', status: 'Paid' },
              { date: 'Jan 31, 2024', amount: '$29.00', status: 'Paid' },
              { date: 'Dec 31, 2023', amount: '$29.00', status: 'Paid' },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{invoice.date}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.amount}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    {invoice.status}
                  </span>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;