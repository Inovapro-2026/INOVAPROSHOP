import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';

interface AuthButtonsProps {
  onNavigate: (path: string) => void;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <button 
        onClick={() => onNavigate('/login-cliente')}
        className="flex items-center gap-3 w-full px-4 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-100"
      >
        <LogIn size={18} />
        <span>Entrar</span>
      </button>
      <button 
        onClick={() => onNavigate('/register-cliente')}
        className="flex items-center gap-3 w-full px-4 py-3 bg-white text-slate-900 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all"
      >
        <UserPlus size={18} />
        <span>Criar conta</span>
      </button>
    </div>
  );
};
