import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Megaphone, 
  LogOut, 
  Menu, 
  X,
  User,
  Settings,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { cn } from '../../lib/utils';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Banners', path: '/admin/banners', icon: ImageIcon },
    { name: 'Anúncios', path: '/admin/anuncios', icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-bottom border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <span className="text-xl font-black text-slate-900 tracking-tighter">
          PRO<span className="text-brand-600">Admin</span>
        </span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-500">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 pt-16 md:pt-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="px-8 mb-12 hidden md:block mt-10">
          <span className="text-2xl font-black text-white tracking-tighter">
            PRO<span className="text-brand-400">Admin</span>
          </span>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all group",
                isActive 
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon size={20} className={cn("transition-transform group-hover:scale-110")} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl font-bold text-sm text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={20} />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              <NavLink to="/admin" className="hover:text-brand-600">Admin</NavLink>
              <ChevronRight size={12} />
              <span className="text-slate-900">Painel de Controle</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">FreelancePro Management</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="bg-white p-3 rounded-2xl border border-slate-200 text-slate-500 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm">
              <ExternalLink size={20} />
            </a>
            <div className="flex items-center gap-3 bg-white pl-3 pr-5 py-2.5 rounded-full border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold">
                M
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none mb-1">Maicon Silva</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Global</p>
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};
