import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Users } from 'lucide-react';
import { cn } from '../lib/utils';

interface ToggleLojasFreelasProps {
  activePath: string;
}

export const ToggleLojasFreelas: React.FC<ToggleLojasFreelasProps> = ({ activePath }) => {
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const isLojas = activePath.startsWith('/vitrine');
  const isFreelas = activePath.startsWith('/freelas');

  return (
    <div className="bg-slate-100 p-1 rounded-2xl flex items-center relative w-48 h-12 shadow-inner border border-slate-200">
      <motion.div
        className="absolute bg-white rounded-xl shadow-sm h-10 w-[92px] z-0"
        animate={{ x: isFreelas ? 90 : 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <button
        onClick={() => navigate('/vitrine')}
        className={cn(
          "relative z-10 flex-1 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-colors",
          isLojas ? "text-brand-600" : "text-slate-400"
        )}
      >
        <ShoppingBag size={14} />
        Lojas
      </button>
      <button
        onClick={() => navigate('/freelas')}
        className={cn(
          "relative z-10 flex-1 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-colors",
          isFreelas ? "text-brand-600" : "text-slate-400"
        )}
      >
        <Users size={14} />
        Freelas
      </button>
    </div>
  );
};
