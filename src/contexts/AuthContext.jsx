import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        fetchProfile(session.user.id);
        setIsAuthenticated(true);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);
          await fetchProfile(session.user.id);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setProfile(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const signInWithPhone = async (phoneNumber) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });
      if (error) throw error;
      toast.success('OTP sent to your phone!');
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const verifyOTP = async (phoneNumber, token) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token,
        type: 'sms',
      });
      if (error) throw error;
      toast.success('Verified successfully!');
      return data;
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out');
  };

  const updateProfile = async (updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile(data);
      toast.success('Profile updated');
      return data;
    } else {
      toast.error(error.message);
      return null;
    }
  };

  const value = {
    user,
    profile,
    loading,
    isAuthenticated,
    signInWithPhone,
    verifyOTP,
    signOut,
    updateProfile,
    fetchProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
