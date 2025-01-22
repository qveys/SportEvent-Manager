import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Globe, HelpCircle } from 'lucide-react';
import ProfileSettings from './settings/ProfileSettings';
import NotificationSettings from './settings/NotificationSettings';
import SecuritySettings from './settings/SecuritySettings';
import BillingSettings from './settings/BillingSettings';
import LanguageSettings from './settings/LanguageSettings';
import HelpSupport from './settings/HelpSupport';

const Settings: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('profile');

  const renderContent = () => {
    switch (currentSection) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'billing':
        return <BillingSettings />;
      case 'language':
        return <LanguageSettings />;
      case 'help':
        return <HelpSupport />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Settings Navigation */}
        <div className="md:col-span-1 space-y-4">
          <nav className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${currentSection === section.id
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                <section.icon className="h-5 w-5" />
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const settingsSections = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'billing', name: 'Billing', icon: CreditCard },
  { id: 'language', name: 'Language', icon: Globe },
  { id: 'help', name: 'Help', icon: HelpCircle },
];

export default Settings;