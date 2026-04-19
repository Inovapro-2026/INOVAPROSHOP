import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  ShoppingBag, 
  Image as ImageIcon, 
  Megaphone,
  ArrowRight,
  Plus,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, trend }: { title: string, value: string, icon: any, color: string, trend?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all group"
  >
    <div className="flex items-center justify-between mb-6">
      <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-current/20`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest flex items-center gap-1">
          <TrendingUp size={12} /> {trend}
        </span>
      )}
    </div>
    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
    </div>
  </motion.div>
);

export const AdminDashboard = () => {
  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Banners Ativos" 
          value="03" 
          icon={ImageIcon} 
          color="bg-brand-600" 
          trend="+50%"
        />
        <StatCard 
          title="Anúncios Ativos" 
          value="08" 
          icon={Megaphone} 
          color="bg-accent-purple" 
          trend="Novo"
        />
        <StatCard 
          title="Profissionais" 
          value="156" 
          icon={Users} 
          color="bg-slate-900" 
        />
        <StatCard 
          title="Transações" 
          value="42" 
          icon={CreditCard} 
          color="bg-slate-400" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">Acesso Rápido</h3>
            <p className="text-slate-400 font-medium mb-10">Gerencie o conteúdo visual da plataforma de forma instantânea.</p>
          </div>
          
          <div className="space-y-4">
            <NavLink 
              to="/admin/banners" 
              className="flex items-center justify-between w-full p-6 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/5 transition-all group"
            >
              <span className="font-bold flex items-center gap-3">
                <Plus size={20} className="text-brand-400" /> Adicionar Banner
              </span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </NavLink>
            <NavLink 
              to="/admin/anuncios" 
              className="flex items-center justify-between w-full p-6 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/5 transition-all group"
            >
              <span className="font-bold flex items-center gap-3">
                <Plus size={20} className="text-accent-purple" /> Criar Novo Anúncio
              </span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>
        </div>

        {/* Recent Activity Mock */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-soft p-10">
          <div className="flex items-center justify-between mb-10 px-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Atividade Recente</h3>
            <button className="text-brand-600 font-black text-xs uppercase tracking-widest hover:underline">Ver tudo</button>
          </div>

          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[1.8rem] border border-slate-100 hover:border-brand-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Novo produto cadastrado</h4>
                    <p className="text-xs text-slate-400">Há {i * 15} minutos por UI Labs</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-slate-900">R$ 197</span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pendente</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
