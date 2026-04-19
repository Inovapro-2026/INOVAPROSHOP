import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, ShoppingBag, MessageSquare, AlertTriangle, ShieldCheck, MoreVertical } from 'lucide-react';
import { cn } from '../../lib/utils';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Pedido Recebido com Sucesso!',
    description: 'Seu pagamento para "Logo Premium & Branding Kit" foi confirmado. O vendedor já foi notificado.',
    time: 'Há 5 min',
    type: 'purchase',
    isRead: false
  },
  {
    id: '2',
    title: 'Nova Mensagem de "Design Studio Pro"',
    description: 'Olá Maicon! Já comecei os esboços iniciais do seu logo. Qual sua cor preferida?',
    time: 'Há 1 hora',
    type: 'message',
    isRead: false
  },
  {
    id: '3',
    title: 'Alerta de Segurança',
    description: 'Um novo login foi detectado na sua conta a partir de um dispositivo Chrome no Windows.',
    time: 'Há 3 horas',
    type: 'security',
    isRead: true
  },
  {
    id: '4',
    title: 'Sua Entrega Está Pronta!',
    description: 'O serviço "Consultoria Digital" foi finalizado. Avalie agora para liberar os fundos.',
    time: 'Há 1 dia',
    type: 'success',
    isRead: true
  }
];

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('todas');

  const filtered = notifications.filter(n => {
    if (filter === 'nao-lidas') return !n.isRead;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'purchase': return <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl"><ShoppingBag size={24} /></div>;
      case 'message': return <div className="bg-purple-100 text-purple-600 p-3 rounded-2xl"><MessageSquare size={24} /></div>;
      case 'security': return <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl"><AlertTriangle size={24} /></div>;
      case 'success': return <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl"><ShieldCheck size={24} /></div>;
      default: return <div className="bg-slate-100 text-slate-600 p-3 rounded-2xl"><Bell size={24} /></div>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Notificações</h1>
          <p className="text-slate-500 font-bold">Fique por dentro de tudo o que acontece na sua conta.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white p-1.5 rounded-2xl border-2 border-slate-100 shadow-soft flex gap-1">
            <button 
              onClick={() => setFilter('todas')}
              className={cn(
                "px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                filter === 'todas' ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-900"
              )}
            >
              Todas
            </button>
            <button 
              onClick={() => setFilter('nao-lidas')}
              className={cn(
                "px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                filter === 'nao-lidas' ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-900"
              )}
            >
              Não Lidas
            </button>
          </div>
          
          <button 
            onClick={markAllAsRead}
            className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-500 hover:text-brand-600 transition-all shadow-soft"
            title="Marcar todas como lidas"
          >
            <Check size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((notification, index) => (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "bg-white p-8 rounded-[2.5rem] border transition-all flex items-start gap-8 group cursor-pointer",
                  notification.isRead ? "border-slate-50 opacity-60" : "border-slate-100 shadow-soft ring-1 ring-brand-100/30"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                {getIcon(notification.type)}
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={cn("text-xl font-black tracking-tight", notification.isRead ? "text-slate-600" : "text-slate-900")}>
                      {notification.title}
                    </h3>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{notification.time}</span>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed mb-4">
                    {notification.description}
                  </p>
                  
                  {!notification.isRead && (
                    <div className="flex items-center gap-2 text-brand-600 font-black text-[10px] uppercase tracking-widest">
                      <div className="w-2 h-2 bg-brand-600 rounded-full animate-pulse"></div>
                      Nova Notificação
                    </div>
                  )}
                </div>

                <button className="p-2 text-slate-200 hover:text-slate-400 transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical size={20} />
                </button>
              </motion.div>
            ) )
          ) : (
            <div className="bg-white rounded-[3rem] p-20 border border-slate-100 shadow-soft text-center text-slate-300">
              <Bell size={64} strokeWidth={1} className="mx-auto mb-6 opacity-20" />
              <p className="text-xl font-black italic tracking-tight">Tudo em silêncio por aqui...</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
