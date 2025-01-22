import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Events from './pages/Events';
import EventDetails from './pages/events/EventDetails';
import Participants from './pages/Participants';
import Settings from './pages/Settings';
import TournamentsList from './pages/tournaments/TournamentsList';
import TournamentDetails from './pages/tournaments/TournamentDetails';
import CreateTournament from './pages/tournaments/CreateTournament';
import VenuesList from './pages/venues/VenuesList';
import VenueDetails from './pages/venues/VenueDetails';
import CreateVenue from './pages/venues/CreateVenue';
import EditVenue from './pages/venues/EditVenue';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ResetPassword from './pages/auth/ResetPassword';
import UpdatePassword from './pages/auth/UpdatePassword';
import VerifyEmail from './pages/auth/VerifyEmail';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/update-password" element={<UpdatePassword />} />
            <Route path="/auth/verify-email" element={<VerifyEmail />} />

            {/* Protected Routes */}
            <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route index element={<Navigate to="/events" replace />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:id" element={<EventDetails />} />
              <Route path="participants" element={<Participants />} />
              <Route path="settings" element={<Settings />} />
              <Route path="tournaments" element={<TournamentsList />} />
              <Route path="tournaments/create" element={<CreateTournament />} />
              <Route path="tournaments/:id" element={<TournamentDetails />} />
              <Route path="venues" element={<VenuesList />} />
              <Route path="venues/create" element={<CreateVenue />} />
              <Route path="venues/:id" element={<VenueDetails />} />
              <Route path="venues/:id/edit" element={<EditVenue />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;