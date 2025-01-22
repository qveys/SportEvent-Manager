/**
 * Application Routes
 * Defines the main routing configuration for the application
 */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Auth Pages
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ResetPassword from '../pages/auth/ResetPassword';
import UpdatePassword from '../pages/auth/UpdatePassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

// Protected Pages
import Events from '../pages/Events';
import EventDetails from '../pages/events/EventDetails';
import Participants from '../pages/Participants';
import Settings from '../pages/Settings';
import TournamentsList from '../pages/tournaments/TournamentsList';
import TournamentDetails from '../pages/tournaments/TournamentDetails';
import CreateTournament from '../pages/tournaments/CreateTournament';
import VenuesList from '../pages/venues/VenuesList';
import VenueDetails from '../pages/venues/VenueDetails';
import CreateVenue from '../pages/venues/CreateVenue';
import EditVenue from '../pages/venues/EditVenue';

// Components
import PrivateRoute from '../components/PrivateRoute';

export const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth/signin" element={!user ? <SignIn /> : <Navigate to="/" replace />} />
      <Route path="/auth/signup" element={!user ? <SignUp /> : <Navigate to="/" replace />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/update-password" element={<UpdatePassword />} />
      <Route path="/auth/verify-email" element={<VerifyEmail />} />

      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute><Events /></PrivateRoute>} />
      <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
      <Route path="/events/:id" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
      <Route path="/participants" element={<PrivateRoute><Participants /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      
      {/* Tournament Routes */}
      <Route path="/tournaments" element={<PrivateRoute><TournamentsList /></PrivateRoute>} />
      <Route path="/tournaments/create" element={<PrivateRoute><CreateTournament /></PrivateRoute>} />
      <Route path="/tournaments/:id" element={<PrivateRoute><TournamentDetails /></PrivateRoute>} />
      
      {/* Venue Routes */}
      <Route path="/venues" element={<PrivateRoute><VenuesList /></PrivateRoute>} />
      <Route path="/venues/create" element={<PrivateRoute><CreateVenue /></PrivateRoute>} />
      <Route path="/venues/:id" element={<PrivateRoute><VenueDetails /></PrivateRoute>} />
      <Route path="/venues/:id/edit" element={<PrivateRoute><EditVenue /></PrivateRoute>} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};