import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import type { Event } from '../types';

const Events: React.FC = () => {
  const navigate = useNavigate();
  
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'City Marathon 2024',
      description: 'Annual city marathon event',
      date: '2024-04-15',
      location: 'Central Park',
      type: 'Marathon',
      organizerId: 'org1',
      currentParticipants: 245,
      maxParticipants: 500,
      status: 'upcoming',
      price: 50
    },
    {
      id: '2',
      title: 'Regional Tennis Tournament',
      description: 'Regional tennis championship',
      date: '2024-04-20',
      location: 'Sports Complex',
      type: 'Tennis',
      organizerId: 'org1',
      currentParticipants: 32,
      maxParticipants: 64,
      status: 'upcoming',
      price: 75
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage and monitor all your sports events</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Events"
          value="12"
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Active Participants"
          value="486"
          icon={Users}
          color="green"
        />
        <StatCard
          title="Venues"
          value="8"
          icon={MapPin}
          color="purple"
        />
      </div>

      {/* Events List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Events</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Event
          </button>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</h3>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {event.currentParticipants} / {event.maxParticipants} participants
                  </span>
                </div>
              </div>
              <button 
                onClick={() => navigate(`/events/${event.id}`)}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple';
}> = ({ title, value, icon: Icon, color }) => {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Events;