import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Search, Filter, ExternalLink, Download, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const MOCK_ORDERS = [
  { 
    id: '#ORD-98421', 
    date: '15/04/2024', 
    name: 'Logo Premium & Branding Kit', 
    price: 850.00, 
    vendor: 'Design Studio Pro',
    status: 'concluido',
    image: 'https://picsum.photos/seed/design/400/400'
  },
  { 
    id: '#ORD-98405', 
    date: '10/04/2024', 
    name: 'Campanha Tráfego Pago (30 dias)', 
    price: 1200.00, 
    vendor: 'Mídia Max',
    status: 'pago',
    image: 'https://picsum.photos/seed/ads/400/400'
  },
  { 
    id: '#ORD-98392', 
    date: '02/04/2024', 
    name: 'Manutenção Mensal App React', 
    price: 2500.00, 
    vendor: 'Dev Master',
    status: 'pendente',
    image: 'https://picsum.photos/seed/code/400/400'
  }
];

export const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'todos' || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'concluido': return { icon: <CheckCircle2 size={16} />, label: 'Concluído', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
      case 'pago': return { icon: <CheckCircle2 size={16} />, label: 'Pago', color: 'bg-blue-50 text-blue-600 border-blue-100' };
      case 'pendente': return { icon: <Clock size={16} />, label: 'Pendente', color: 'bg-amber-50 text-amber-600 border-amber-100' };
      case 'cancelado': return { icon: <XCircle size={16} />, label: 'Cancelado', color: 'bg-red-50 text-red-600 border-red-100' };
      default: return { icon: <Clock size={16} />, label: status, color: 'bg-slate-50 text-slate-600 border-slate-100' };
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Meus Pedidos</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por ID ou nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-14 pr-6 py-4 font-bold text-slate-900 outline-none focus:border-brand-500 transition-all shadow-soft"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white p-2 rounded-[1.5rem] border-2 border-slate-100 shadow-soft">
            <Filter size={18} className="text-slate-300 ml-2" />
            <select 
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-transparent font-bold text-slate-900 outline-none pr-4"
            >
              <option value="todos">Todos</option>
              <option value="concluido">Concluídos</option>
              <option value="pago">Pagos</option>
              <option value="pendente">Pendentes</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft p-8 group hover:border-brand-100 transition-all"
              >
                <div className="flex flex-col lg:flex-row items-center gap-10">
                  <img 
                    src={order.image} 
                    alt={order.name} 
                    className="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-3">
                      <span className="text-[10px] font-black font-mono text-slate-300 uppercase tracking-widest">{order.id}</span>
                      <div className={cn("px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border", statusInfo.color)}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </div>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{order.date}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-brand-600 transition-colors">{order.name}</h3>
                    <p className="text-sm font-bold text-slate-400">Vendido por <span className="text-slate-900">{order.vendor}</span></p>
                  </div>

                  <div className="text-center lg:text-right">
                    <p className="text-3xl font-black text-slate-900 tracking-tighter mb-6 font-mono">
                      R$ {order.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="px-6 py-3 bg-slate-900 text-white font-black rounded-2xl text-xs hover:bg-slate-800 transition-all flex items-center gap-2">
                        Ver Detalhes <ExternalLink size={14} />
                      </button>
                      {order.status === 'concluido' && (
                        <button className="px-6 py-3 bg-brand-50 text-brand-600 font-black rounded-2xl text-xs hover:bg-brand-100 transition-all flex items-center gap-2 border border-brand-100">
                          Acessar Entrega <Download size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="bg-white rounded-[3rem] p-20 border border-slate-100 shadow-soft text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Package size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Nenhum pedido encontrado</h3>
            <p className="text-slate-500 font-medium">Tente ajustar sua busca ou filtro para encontrar o que procura.</p>
          </div>
        )}
      </div>
    </div>
  );
};
