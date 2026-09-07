import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENT_USER_DEFAULT, MOCK_USERS } from '../data/mockData';
import { storage } from '../utils/helpers';

const AuthContext = createContext();

const STORAGE_KEY_USER = 'instaaaaa_auth_user';
const STORAGE_KEY_REGISTERED = 'instaaaaa_registered_users';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return storage.get(STORAGE_KEY_USER, CURRENT_USER_DEFAULT);
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    return storage.get(STORAGE_KEY_REGISTERED, MOCK_USERS);
  });

  useEffect(() => {
    if (currentUser) {
      storage.set(STORAGE_KEY_USER, currentUser);
    } else {
      storage.remove(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    storage.set(STORAGE_KEY_REGISTERED, registeredUsers);
  }, [registeredUsers]);

  const login = async (username, password) => {
    // Check if user exists in registered users or mock users
    const cleanUsername = username.trim().toLowerCase();
    const found = registeredUsers.find(
      u => u.username.toLowerCase() === cleanUsername || (u.email && u.email.toLowerCase() === cleanUsername)
    );

    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }

    // If new username entered during login, auto create or allow login
    const newUser = {
      id: `user_${Date.now()}`,
      username: cleanUsername,
      fullName: cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`,
      bio: 'New explorer on instaaaaa ✨',
      website: '',
      postsCount: 0,
      followersCount: 1,
      followingCount: 5,
      isVerified: false,
    };

    setRegisteredUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const signup = async ({ username, fullName, email, password }) => {
    const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '_');
    
    // Check if already taken
    const exists = registeredUsers.some(u => u.username.toLowerCase() === cleanUsername);
    if (exists) {
      return { success: false, error: 'Username is already taken' };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      username: cleanUsername,
      fullName: fullName.trim() || cleanUsername,
      email: email.trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`,
      bio: `Hello, I'm on instaaaaa! 📸`,
      website: '',
      postsCount: 0,
      followersCount: 0,
      followingCount: 1,
      isVerified: false,
    };

    setRegisteredUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setRegisteredUsers(prev =>
      prev.map(u => (u.id === updated.id ? updated : u))
    );
  };

  const switchDemoUser = (userId) => {
    const found = registeredUsers.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        registeredUsers,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        updateProfile,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

