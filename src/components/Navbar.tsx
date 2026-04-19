import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  ShoppingBag, 
  LayoutDashboard, 
  LogIn, 
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { ToggleLojasFreelas } from './ToggleLojasFreelas';
import { UserMenu } from './Navigation/UserMenu';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { user, role, userProfile } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerNavigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = (to: string) => {
    routerNavigate(to);
    setMobileMenuOpen(false);
  };

  // Condition for showing the toggle switch
  const isVitrineContext = currentPath.startsWith('/vitrine') || currentPath.startsWith('/freelas');

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      scrolled || mobileMenuOpen ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-soft" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Container - Always aligned left */}
        <div className="flex-1 flex justify-start">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="bg-brand-600 p-2 rounded-xl text-white shadow-lg shadow-brand-200 group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">FreelancePro</span>
          </div>
        </div>

        {/* Center Switch Container - Absolute center or Flex center with automatic sizing */}
        <div className="hidden md:flex flex-1 justify-center">
          <AnimatePresence mode="wait">
            {isVitrineContext && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ToggleLojasFreelas activePath={currentPath} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions Container - Always aligned right */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-8 text-slate-500 font-bold tracking-tight text-sm uppercase">
          <button onClick={() => navigate('/blog')} className={cn("hover:text-brand-600 transition-colors", currentPath.startsWith('/blog') && "text-brand-600")}>Blog</button>
          <button onClick={() => navigate('/quero-vender')} className={cn("hover:text-brand-600 transition-colors", currentPath === '/quero-vender' && "text-brand-600")}>Quero Vender</button>
          <div className="h-4 w-px bg-slate-200"></div>
          
          <button 
            onClick={() => navigate('/vitrine')} 
            className="px-6 py-2.5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95 flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            Vitrine
          </button>

          <div className="flex items-center gap-4 border-l border-slate-100 pl-8">
            <UserMenu />
          </div>
        </div>

        {/* Mobile Navbar Toggle */}
        <div className="flex lg:hidden flex-1 justify-end">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white absolute top-full left-0 right-0 border-b border-slate-100 p-6 flex flex-col gap-6 overflow-hidden"
          >
            {isVitrineContext && (
              <div className="flex justify-center border-b border-slate-50 pb-6">
                 <ToggleLojasFreelas activePath={currentPath} />
              </div>
            )}
            <div className="flex flex-col gap-4 text-center font-bold text-slate-600">
              <button onClick={() => navigate('/blog')}>Blog</button>
              <button onClick={() => navigate('/quero-vender')}>Quero Vender</button>
              <button onClick={() => navigate('/vitrine')} className="bg-brand-600 text-white py-4 rounded-2xl">Acessar Vitrine</button>
              
              <div className="h-px bg-slate-100 my-2"></div>
              
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                    <UserMenu />
                    <div className="text-left">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Logado como</p>
                      <p className="text-sm font-bold text-slate-900">{userProfile?.displayName || user.email}</p>
                    </div>
                  </div>
                  <button onClick={() => navigate(role === 'seller' ? '/dashboard/seller' : '/dashboard/buyer')} className="w-full py-4 border border-slate-200 rounded-2xl flex items-center justify-center gap-2">
                    <LayoutDashboard size={18} /> Dashboard
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => navigate('/login-cliente')} className="py-4 border border-slate-200 rounded-2xl">Login</button>
                  <button onClick={() => navigate('/register-cliente')} className="py-4 bg-slate-900 text-white rounded-2xl">Criar Conta</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
