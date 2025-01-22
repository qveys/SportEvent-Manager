import React from 'react';

const notificationPreferences = [
  {
    id: 1,
    title: 'Event Updates',
    description: "Get notified about changes to events you're participating in",
    enabled: true,
  },
  {
    id: 2,
    title: 'Tournament Notifications',
    description: 'Receive updates about match schedules and results',
    enabled: true,
  },
  {
    id: 3,
    title: 'Email Notifications',
    description: 'Receive email notifications about important updates',
    enabled: false,
  },
  {
    id: 4,
    title: 'Marketing Communications',
    description: 'Receive updates about new features and promotions',
    enabled: false,
  },
];

const NotificationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose how you want to be notified about activities.</p>
        </div>
        <div className="p-6 space-y-4">
          {notificationPreferences.map((pref) => (
            <div key={pref.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{pref.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{pref.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={pref.enabled} />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;