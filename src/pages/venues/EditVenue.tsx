import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VenueForm } from '../../components/venues/VenueForm';
import { supabase } from '../../lib/supabaseClient';

const EditVenue: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        if (!id) return;

        const { data, error } = await supabase
          .from('venues')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data) {
          setInitialData({
            name: data.name,
            type: data.type,
            phone: data.phone || '',
            email: data.email || '',
            website: data.website || '',
            capacity: data.capacity?.toString() || '',
            lanes: data.lanes?.toString() || '',
            length: data.length?.toString() || '',
            width: data.width?.toString() || '',
            depth_min: data.depth_min?.toString() || '',
            depth_max: data.depth_max?.toString() || '',
            has_diving_boards: data.has_diving_boards,
            has_timing_system: data.has_timing_system,
            is_indoor: data.is_indoor,
            is_accessible: data.is_accessible,
            notes: data.notes || ''
          });
        }
      } catch (error) {
        console.error('Error fetching venue:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Venue not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The venue you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/venues')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Venues
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Venue</h1>
        <p className="text-gray-600 dark:text-gray-400">Update the venue details</p>
      </div>

      <VenueForm
        initialData={initialData}
        venueId={id}
      />
    </div>
  );
};

export default EditVenue;