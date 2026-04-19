import React from 'react';
import { User as UserIcon } from 'lucide-react';

interface UserAvatarProps {
  photoURL?: string | null;
  email?: string | null;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ photoURL, email }) => {
  return (
    <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-soft transition-transform group-hover:scale-105">
      {photoURL ? (
        <img 
          src={photoURL} 
          alt="User Avatar" 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
          <UserIcon size={20} />
        </div>
      )}
    </div>
  );
};
