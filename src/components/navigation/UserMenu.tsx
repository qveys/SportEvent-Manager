/**
 * UserMenu Component
 * Handles user-related menu items and actions
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <button 
      onClick={() => navigate('/settings')}
      className="h-8 w-8 rounded-full overflow-hidden"
    >
      <img
        src={`https://ui-avatars.com/api/?name=${user?.user_metadata?.firstname}+${user?.user_metadata?.name}&background=0D8ABC&color=fff`}
        alt="Profile"
        className="h-full w-full object-cover"
      />
    </button>
  );
};