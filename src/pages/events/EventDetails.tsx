import React from 'react';
import { Calendar, Users, MapPin, Clock, DollarSign, Trophy } from 'lucide-react';
import type { Event, Tournament } from '../../types';

const mockEvent: Event = {
  id: '1',
  title: 'City Marathon 2024',
  description: 'Join us for the annual city marathon! This year\'s route takes runners through the most scenic parts of the city, including the historic downtown, riverfront, and park districts. Suitable for both competitive runners and enthusiasts.',
  date: '2024-04-15',
  location: 'Central Park',
  type: 'Marathon',
  organizerId: 'org1',
  maxParticipants: 500,
  currentParticipants: 245,
  status: 'upcoming',
  price: 50
};

const mockTournaments: Tournament[] = [
  {
    id: '1',
    eventId: '1',
    name: 'Elite Division',
    type: 'elimination',
    status: 'pending',
    participants: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
    matches: []
  },
  {
    id: '2',
    eventId: '1',
    name: 'Amateur Division',
    type: 'groups',
    status: 'pending',
    participants: ['Emma Wilson', 'James Brown', 'Lisa Anderson'],
    matches: []
  }
];

const EventDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Event Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{mockEvent.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {new Date(mockEvent.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {mockEvent.location}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {mockEvent.currentParticipants} / {mockEvent.maxParticipants} participants
              </span>
              <span className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                ${mockEvent.price}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${mockEvent.status === 'upcoming' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                  mockEvent.status === 'ongoing' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                  'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                {mockEvent.status.charAt(0).toUpperCase() + mockEvent.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors">
              Edit Event
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Register Now
            </button>
          </div>
        </div>

        <p className="mt-6 text-gray-600 dark:text-gray-300">{mockEvent.description}</p>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Schedule</h2>
          </div>
          <div className="space-y-4">
            <div className="border-l-2 border-blue-600 dark:border-blue-400 pl-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">6:00 AM</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Registration Opens</p>
            </div>
            <div className="border-l-2 border-blue-600 dark:border-blue-400 pl-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">7:30 AM</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Warm-up Session</p>
            </div>
            <div className="border-l-2 border-blue-600 dark:border-blue-400 pl-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">8:00 AM</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Race Start</p>
            </div>
            <div className="border-l-2 border-blue-600 dark:border-blue-400 pl-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">2:00 PM</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Award Ceremony</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h2>
          </div>
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
            {/* Map placeholder */}
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              Map View
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Central Park, Main Entrance<br />
            New York, NY 10022
          </p>
          <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
            Get Directions
          </button>
        </div>

        {/* Registration Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Registration Info</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Registration Fee</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">${mockEvent.price}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Capacity</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{mockEvent.maxParticipants} participants</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Current Registrations</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{mockEvent.currentParticipants} registered</p>
            </div>
            <div className="pt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(mockEvent.currentParticipants / mockEvent.maxParticipants) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {mockEvent.maxParticipants - mockEvent.currentParticipants} spots remaining
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tournaments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tournaments</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Tournament
          </button>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockTournaments.map((tournament) => (
            <div key={tournament.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                  <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{tournament.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tournament.participants.length} participants • {tournament.type}
                  </p>
                </div>
              </div>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;