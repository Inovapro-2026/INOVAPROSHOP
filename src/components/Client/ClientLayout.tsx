import React, { ReactNode } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { motion } from 'motion/react';
import { 
  User, 
  ShoppingBag, 
  Package, 
  Bell, 
  MessageSquare, 
  Heart, 
  Settings, 
  Wallet, 
  History,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { label: 'Meu Perfil', icon: <User size={20} />, path: '/cliente/perfil' },
    { label: 'Carrinho', icon: <ShoppingBag size={20} />, path: '/cliente/carrinho' },
    { label: 'Meus Pedidos', icon: <Package size={20} />, path: '/cliente/pedidos' },
    { label: 'Notificações', icon: <Bell size={20} />, path: '/cliente/notificacoes', badge: 2 },
    { label: 'Mensagens', icon: <MessageSquare size={20} />, path: '/cliente/mensagens', badge: 5 },
    { label: 'Favoritos', icon: <Heart size={20} />, path: '/cliente/favoritos' },
    { label: 'Configurações', icon: <Settings size={20} />, path: '/cliente/configuracoes' },
    { label: 'Carteira', icon: <Wallet size={20} />, path: '/cliente/carteira' },
    { label: 'Histórico', icon: <History size={20} />, path: '/cliente/historico' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft p-8 sticky top-32">
              <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-50">
                <div className="w-16 h-16 bg-brand-600/10 rounded-2xl flex items-center justify-center text-brand-600 font-black text-2xl shadow-inner">
                  {user?.firstName?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 leading-tight">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Conta Cliente</p>
                </div>
              </div>

              <nav className="flex flex-col gap-1">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={index}
                      onClick={() => navigate(item.path)}
                      className={cn(
                        "flex items-center justify-between px-6 py-4 rounded-2xl transition-all group",
                        isActive 
                          ? "bg-brand-600 text-white shadow-lg shadow-brand-100" 
                          : "text-slate-500 hover:text-brand-600 hover:bg-brand-50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span className={cn("transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-brand-600")}>
                          {item.icon}
                        </span>
                        <span className="font-bold text-sm tracking-tight">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && !isActive && (
                          <span className="bg-brand-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight size={16} className={cn("transition-all", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1")} />
                      </div>
                    </button>
                  );
                })}

                <div className="h-px bg-slate-50 my-6"></div>

                <button
                  onClick={() => logout()}
                  className="flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm tracking-tight w-full text-left"
                >
                  <LogOut size={20} />
                  <span>Sair da Conta</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
