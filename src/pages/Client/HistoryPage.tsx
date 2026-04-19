import React from 'react';
import { motion } from 'motion/react';
import { History, Eye, ShoppingCart, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const MOCK_HISTORY = [
  { id: '1', type: 'view', action: 'Visualizou', target: 'Branding Kit 2024', time: 'Há 10 minutos', icon: <Eye size={18} />, color: 'text-blue-500 bg-blue-50' },
  { id: '2', type: 'chat', action: 'Conversou com', target: 'Design Studio Pro', time: 'Há 2 horas', icon: <MessageSquare size={18} />, color: 'text-purple-500 bg-purple-50' },
  { id: '3', type: 'cart', action: 'Adicionou ao carrinho', target: 'Landing Page High Conv', time: 'Hoje, 10:30', icon: <ShoppingCart size={18} />, color: 'text-emerald-500 bg-emerald-50' },
  { id: '4', type: 'view', action: 'Visualizou', target: 'Social Media Management', time: 'Ontem, 18:45', icon: <Eye size={18} />, color: 'text-blue-500 bg-blue-50' },
  { id: '5', type: 'order', action: 'Pedido Criado', target: '#ORD-98421', time: 'Abr 15, 2024', icon: <Clock size={18} />, color: 'text-amber-500 bg-amber-50' },
];

export const HistoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Histórico de Atividade</h1>
          <p className="text-slate-500 font-bold">Acompanhe seus passos recentes na plataforma.</p>
        </div>
        <button className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-400 font-black rounded-2xl hover:text-red-500 hover:border-red-100 transition-all text-xs uppercase tracking-widest">
          Limpar Tudo
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-10 top-0 bottom-0 w-px bg-slate-100 hidden md:block"></div>
        
        <div className="space-y-8 relative z-10">
          {MOCK_HISTORY.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-14">
                {/* Timeline Point */}
                <div className={cn(
                  "hidden md:flex w-20 h-20 rounded-[2rem] items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:scale-110",
                  item.color
                )}>
                  {item.icon}
                </div>

                <div className="flex-1 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-soft group-hover:border-brand-500 transition-all flex items-center justify-between">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                    <div className={cn("md:hidden w-12 h-12 rounded-2xl flex items-center justify-center mb-2", item.color)}>
                       {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest font-mono">{item.time}</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                        <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest leading-none">{item.type}</span>
                      </div>
                      <p className="text-lg font-bold text-slate-500">
                        {item.action}{' '}
                        <span className="text-slate-900 font-black">{item.target}</span>
                      </p>
                    </div>
                  </div>
                  
                  <button className="p-3 text-slate-300 hover:text-brand-600 hover:translate-x-1 transition-all">
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pt-20 text-center">
        <p className="text-slate-300 font-bold text-sm">O histórico completo é guardado por até 90 dias.</p>
      </div>
    </div>
  );
};
