import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

interface LoginCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const LoginCard = ({ children, title, subtitle }: LoginCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-premium max-w-lg w-full relative border border-slate-50"
    >
      {/* Logo Emblem */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2">
        <div className="w-24 h-24 bg-brand-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-100 ring-8 ring-slate-50/50">
          <Award size={48} strokeWidth={2.5} />
        </div>
      </div>

      <div className="mt-10 text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">
          {title}
        </h2>
        <p className="text-slate-500 font-medium leading-relaxed px-4">
          {subtitle}
        </p>
      </div>

      {children}

      <div className="mt-10 text-center">
        <p className="text-slate-500 font-medium">
          Não tem uma conta?{' '}
          <button
            onClick={() => {
              window.history.pushState({}, '', '/register-cliente');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="text-brand-600 font-black hover:underline underline-offset-4"
          >
            Criar conta agora
          </button>
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-50 text-center">
        <p className="text-[10px] font-black tracking-widest text-slate-300 uppercase leading-none">
          🔐 Conexão protegida por criptografia AES-256
        </p>
      </div>
    </motion.div>
  );
};
