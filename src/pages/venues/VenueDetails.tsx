import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Globe, Users, Ruler, School as Pool, Waves, Accessibility, Edit } from 'lucide-react';
import type { Venue } from '../../types';
import { supabase } from '../../lib/supabaseClient';

const VenueDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchVenue(id);
    }
  }, [id]);

  const fetchVenue = async (venueId: string) => {
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('id', venueId)
        .single();

      if (error) throw error;
      setVenue(data);
    } catch (error) {
      console.error('Error fetching venue:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Venue not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">The venue you're looking for doesn't exist or has been removed.</p>
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
    <div className="space-y-8">
      {/* Venue Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{venue.name}</h1>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {venue.address}, {venue.city}
              </span>
              {venue.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  {venue.phone}
                </span>
              )}
              {venue.email && (
                <span className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  {venue.email}
                </span>
              )}
              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Globe className="h-5 w-5" />
                  Website
                </a>
              )}
            </div>
          </div>
          <button
            onClick={() => navigate(`/venues/${venue.id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="h-5 w-5" />
            Edit Venue
          </button>
        </div>
      </div>

      {/* Venue Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Capacity and Access */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Capacity & Access</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Users className="h-5 w-5" />
                <span>Capacity</span>
              </div>
              <span className="text-gray-900 dark:text-white">{venue.capacity} people</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Accessibility className="h-5 w-5" />
                <span>Accessible</span>
              </div>
              <span className={venue.is_accessible ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {venue.is_accessible ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Building2 className="h-5 w-5" />
                <span>Indoor Facility</span>
              </div>
              <span className="text-gray-900 dark:text-white">{venue.is_indoor ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* Pool Specifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pool Specifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Pool className="h-5 w-5" />
                <span>Lanes</span>
              </div>
              <span className="text-gray-900 dark:text-white">{venue.lanes} lanes</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Ruler className="h-5 w-5" />
                <span>Length</span>
              </div>
              <span className="text-gray-900 dark:text-white">{venue.length}m</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Waves className="h-5 w-5" />
                <span>Depth</span>
              </div>
              <span className="text-gray-900 dark:text-white">
                {venue.depth_min}m - {venue.depth_max}m
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Diving Boards</span>
              <span className={venue.has_diving_boards ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}>
                {venue.has_diving_boards ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Timing System</span>
              <span className={venue.has_timing_system ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}>
                {venue.has_timing_system ? 'Available' : 'Not Available'}
              </span>
            </div>
          </div>
          {venue.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Additional Notes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{venue.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;