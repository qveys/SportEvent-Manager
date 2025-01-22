import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    name: '',
    username: '',
    email: '',
    personId: '',
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username, email, person_id')
        .eq('id', user?.id)
        .single();

      if (userError) throw userError;

      if (userData) {
        const { data: personData, error: personError } = await supabase
          .from('persons')
          .select('name, firstname')
          .eq('id', userData.person_id)
          .single();

        if (personError) throw personError;

        if (personData) {
          setFormData({
            firstName: personData.firstname || '',
            name: personData.name || '',
            username: userData.username || '',
            email: userData.email || '',
            personId: userData.person_id,
          });
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setMessage({
        type: 'error',
        text: 'Erreur lors du chargement des données'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Vérifier si le nom d'utilisateur existe déjà
      if (formData.username !== user?.user_metadata?.username) {
        const { data: existingUser } = await supabase
          .from('users')
          .select('username')
          .eq('username', formData.username)
          .neq('id', user?.id)
          .maybeSingle();

        if (existingUser) {
          throw new Error('Ce nom d\'utilisateur est déjà pris');
        }
      }

      // Mettre à jour les métadonnées de l'utilisateur
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          firstname: formData.firstName,
          name: formData.name,
          username: formData.username,
        }
      });

      if (updateError) throw updateError;

      // Mettre à jour la table persons
      const { error: personUpdateError } = await supabase
        .from('persons')
        .update({
          name: formData.name,
          firstname: formData.firstName,
        })
        .eq('id', formData.personId);

      if (personUpdateError) throw personUpdateError;

      // Mettre à jour la table users
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({
          username: formData.username
        })
        .eq('id', user?.id);

      if (userUpdateError) throw userUpdateError;

      setMessage({ type: 'success', text: 'Profil mis à jour avec succès' });
      
      // Recharger les données pour s'assurer d'avoir les dernières modifications
      loadUserData();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Erreur lors de la mise à jour du profil'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Profile Settings</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update your personal information and preferences.</p>
        </div>
        <div className="p-6 space-y-6">
          {message && (
            <div className={`p-4 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6">
              <img
                src={`https://ui-avatars.com/api/?name=${formData.firstName}+${formData.name}&background=0D8ABC&color=fff`}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Change Photo
                </button>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">JPG, GIF or PNG. Max size of 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;