import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Search, Filter, MapPin, Phone, Mail, ArrowUpDown, Trash2, Edit } from 'lucide-react';
import type { Venue } from '../../types';
import { supabase } from '../../lib/supabaseClient';

const VenuesList: React.FC = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'city' | 'capacity'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*');

      if (error) throw error;
      setVenues(data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this venue?')) return;

    try {
      const { error } = await supabase
        .from('venues')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setVenues(venues.filter(venue => venue.id !== id));
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  const filteredVenues = venues
    .filter(venue => {
      const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          venue.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = cityFilter === 'all' || venue.city === cityFilter;
      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'city') {
        return sortOrder === 'asc'
          ? a.city.localeCompare(b.city)
          : b.city.localeCompare(a.city);
      } else {
        return sortOrder === 'asc'
          ? (a.capacity || 0) - (b.capacity || 0)
          : (b.capacity || 0) - (a.capacity || 0);
      }
    });

  const cities = Array.from(new Set(venues.map(venue => venue.city)));

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Venues</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage swimming pools and other venues</p>
        </div>
        <button
          onClick={() => navigate('/venues/create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Venue
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Venues List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* Table Header */}
          <div className="bg-gray-50 dark:bg-gray-700/50">
            <div className="grid grid-cols-5 gap-4 px-6 py-3">
              <button
                onClick={() => toggleSort('name')}
                className="flex items-center gap-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Venue Name
                <ArrowUpDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleSort('city')}
                className="flex items-center gap-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Location
                <ArrowUpDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleSort('capacity')}
                className="flex items-center gap-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Capacity
                <ArrowUpDown className="h-4 w-4" />
              </button>
              <div className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contact
              </div>
              <div className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredVenues.map((venue) => (
              <div key={venue.id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{venue.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {venue.lanes} lanes • {venue.length}m
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                  <div>
                    <div className="text-sm text-gray-900 dark:text-white">{venue.city}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{venue.address}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-900 dark:text-white">
                    {venue.capacity} people
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {venue.phone && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Phone className="h-4 w-4 mr-2" />
                      {venue.phone}
                    </div>
                  )}
                  {venue.email && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Mail className="h-4 w-4 mr-2" />
                      {venue.email}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate(`/venues/${venue.id}`)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/venues/${venue.id}/edit`)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(venue.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-5 w-5" />
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

export default VenuesList;