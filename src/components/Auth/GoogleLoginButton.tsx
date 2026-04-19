import React from 'react';
import { motion } from 'motion/react';

interface GoogleLoginButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const GoogleLoginButton = ({ onClick, isLoading }: GoogleLoginButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isLoading}
      className="w-full py-5 bg-white border-2 border-slate-100 text-slate-900 font-black rounded-3xl flex items-center justify-center gap-4 hover:shadow-xl hover:border-brand-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <img src="https://www.google.com/favicon.ico" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
      <span>Continuar com Google</span>
    </motion.button>
  );
};
