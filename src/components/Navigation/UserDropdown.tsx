import React from 'react';
import { motion } from 'motion/react';
import { AuthButtons } from './AuthButtons';
import { ProtectedUserMenu } from './ProtectedUserMenu';

interface UserDropdownProps {
  isAuthenticated: boolean;
  onNavigate: (path: string) => void;
  role: string | null;
  onClose: () => void;
  userProfile?: any;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ 
  isAuthenticated, 
  onNavigate, 
  role, 
  onClose,
  userProfile 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-full right-0 mt-4 bg-white rounded-[2rem] border border-slate-100 shadow-premium overflow-hidden z-[60] min-w-[16rem]"
    >
      {isAuthenticated ? (
        <>
          <div className="bg-slate-50 p-6 border-b border-slate-100">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Bem-vindo(a)</p>
            <p className="font-bold text-slate-900 line-clamp-1">{userProfile?.displayName || 'Usuário FreelancePro'}</p>
          </div>
          <ProtectedUserMenu onNavigate={onNavigate} role={role} onClose={onClose} />
        </>
      ) : (
        <AuthButtons onNavigate={onNavigate} />
      )}
    </motion.div>
  );
};
