import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulated delay for premium feel
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Suas credenciais administrativas não foram reconhecidas. Tente novamente.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-glow-mesh">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="mb-6 inline-flex p-4 bg-brand-600 rounded-[1.5rem] shadow-2xl shadow-brand-600/30 text-white">
            <Lock size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Painel Admin</h1>
          <p className="text-slate-500 font-medium">Acesso restrito para administradores da FreelancePro</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-premium">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">E-mail Administrativo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@freelancepro.com"
                  className="block w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 text-slate-900 text-lg font-bold rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Senha de Acesso</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 text-slate-900 text-lg font-bold rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600"
              >
                <AlertCircle size={20} className="mt-0.5 shrink-0" />
                <p className="text-sm font-bold">{error}</p>
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-600 transition-all active:scale-95 disabled:opacity-70 shadow-2xl shadow-slate-900/10"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar no Sistema <LogIn size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={14} /> Voltar para o Site
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
