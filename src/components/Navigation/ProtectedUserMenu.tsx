import React from 'react';
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
import { cn } from '../../lib/utils';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

interface ProtectedUserMenuProps {
  onNavigate: (path: string) => void;
  role: string | null;
  onClose: () => void;
}

export const ProtectedUserMenu: React.FC<ProtectedUserMenuProps> = ({ onNavigate, role, onClose }) => {
  const handleLogout = async () => {
    await signOut(auth);
    onClose();
    onNavigate('/');
  };

  const menuItems = [
    { label: 'Meu Perfil', icon: <User size={18} />, path: '/cliente/perfil' },
    { label: 'Carrinho', icon: <ShoppingBag size={18} />, path: '/cliente/carrinho' },
    { label: 'Meus Pedidos', icon: <Package size={18} />, path: '/cliente/pedidos' },
    { label: 'Notificações', icon: <Bell size={18} />, path: '/cliente/notificacoes', badge: 2 },
    { label: 'Mensagens', icon: <MessageSquare size={18} />, path: '/cliente/mensagens', badge: 5 },
    { label: 'Favoritos', icon: <Heart size={18} />, path: '/cliente/favoritos' },
    { label: 'Configurações', icon: <Settings size={18} />, path: '/cliente/configuracoes' },
    { label: 'Carteira', icon: <Wallet size={18} />, path: '/cliente/carteira' },
    { label: 'Histórico', icon: <History size={18} />, path: '/cliente/historico' },
  ];

  return (
    <div className="flex flex-col py-2 w-64">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onNavigate(item.path);
            onClose();
          }}
          className="flex items-center justify-between px-6 py-3 text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <span className="text-slate-400 group-hover:text-brand-600 transition-colors">
              {item.icon}
            </span>
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </div>
          <div className="flex items-center gap-2">
            {item.badge && (
              <span className="bg-brand-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                {item.badge}
              </span>
            )}
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      ))}

      <div className="h-px bg-slate-100 my-2 mx-6"></div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-50 transition-all font-bold text-sm tracking-tight"
      >
        <LogOut size={18} />
        <span>Sair</span>
      </button>
    </div>
  );
};
