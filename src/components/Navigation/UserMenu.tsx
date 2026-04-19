import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { UserAvatar } from './UserAvatar';
import { UserDropdown } from './UserDropdown';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
  const { user, role, userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    navigate(to);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group focus:outline-none relative"
      >
        <UserAvatar 
          photoURL={userProfile?.photoURL || user?.avatar} 
          email={user?.email} 
        />
        {user && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <UserDropdown 
            isAuthenticated={!!user} 
            onNavigate={handleNavigate} 
            role={role} 
            onClose={() => setIsOpen(false)}
            userProfile={userProfile}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
