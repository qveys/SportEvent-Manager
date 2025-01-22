import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';

const faqs = [
  {
    question: 'How do I create a new tournament?',
    answer: 'To create a new tournament, go to the Events page, select an event, and click the "Create Tournament" button. Follow the setup wizard to configure your tournament settings.'
  },
  {
    question: 'Can I modify participant information after registration?',
    answer: 'Yes, you can edit participant information by going to the Participants page, finding the participant, and clicking "Edit" on their profile.'
  },
  {
    question: 'How do I export event results?',
    answer: 'Event results can be exported from the event details page. Click on the event, scroll to the bottom, and use the "Export Results" button.'
  }
];

const HelpSupport: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Help & Support</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Find answers to common questions and get support.</p>
        </div>

        {/* Quick Actions */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                  <Book className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Documentation</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Read our guides and documentation</p>
                </div>
              </div>
            </button>
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Live Chat</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Chat with our support team</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{faq.question}</h4>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Still need help?</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Our support team is always ready to help you with any questions.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;