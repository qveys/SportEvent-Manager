import React from 'react';
import { VenueForm } from '../../components/venues/VenueForm';

const CreateVenue: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Venue</h1>
        <p className="text-gray-600 dark:text-gray-400">Enter the details for the new venue</p>
      </div>

      <VenueForm />
    </div>
  );
};

export default CreateVenue;