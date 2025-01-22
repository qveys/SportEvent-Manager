import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (identifier: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: { 
    name: string; 
    firstname: string; 
    birthdate?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (identifier: string, password: string) => {
    // First try to sign in with email
    let { error: emailError } = await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    });

    if (emailError?.message?.includes('Invalid login credentials')) {
      // If email sign-in fails, try to find user by username
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('username', identifier)
        .single();

      if (userError) throw new Error('Invalid username or password');

      // If username exists, try to sign in with the associated email
      const { error: finalError } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password,
      });

      if (finalError) throw finalError;
    } else if (emailError) {
      throw emailError;
    }
  };

  const signUp = async (email: string, password: string, metadata: { 
    name: string; 
    firstname: string; 
    birthdate?: string;
  }) => {
    try {
      // Vérifier si l'email existe déjà
      const { data: existingEmail } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (existingEmail) {
        throw new Error('Cet email est déjà utilisé');
      }

      // Créer le compte utilisateur avec un username temporaire
      const tempUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
            username: tempUsername,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Créer l'enregistrement dans la table users
      const { error: insertError } = await supabase
        .from('users')
        .insert([{
          id: signUpData.user?.id,
          email,
          username: tempUsername
        }]);

      if (insertError) throw insertError;

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Une erreur est survenue lors de l\'inscription');
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};