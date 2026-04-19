import React from 'react';
import { motion } from 'motion/react';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, DollarSign, CreditCard, History, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

const MOCK_TRANSACTIONS = [
  { id: '1', type: 'pagamento', name: 'Compra: Branding Kit', amount: -850.00, date: '15 Abr, 2024', status: 'concluido' },
  { id: '2', type: 'reembolso', name: 'Reembolso: Plugin Buggy', amount: 120.00, date: '12 Abr, 2024', status: 'concluido' },
  { id: '3', type: 'deposito', name: 'Depósito via Pix', amount: 1500.00, date: '10 Abr, 2024', status: 'concluido' },
];

export const WalletPage = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Minha Carteira</h1>
          <p className="text-slate-500 font-bold">Gerencie seu saldo e métodos de pagamento.</p>
        </div>
        <button className="px-10 py-5 bg-brand-600 text-white rounded-[2rem] font-black shadow-xl shadow-brand-100 hover:bg-brand-700 transition-all flex items-center gap-3 active:scale-95">
          <Plus size={24} /> Adicionar Saldo
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[250px]">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Saldo Disponível</p>
              <h2 className="text-6xl font-black tracking-tighter mb-4 font-mono">
                R$ 2.450<span className="text-slate-400">,00</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-12">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Entradas (Mês)</p>
                <div className="flex items-center gap-2 text-emerald-400 font-black text-xl">
                  <TrendingUp size={20} /> R$ 1.500
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Saídas (Mês)</p>
                <div className="flex items-center gap-2 text-red-400 font-black text-xl">
                  <TrendingDown size={20} /> R$ 850
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-soft p-12 flex flex-col justify-between">
          <div className="space-y-6">
             <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                 <CreditCard size={24} />
               </div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Cartão Salvo</h3>
             </div>
             <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 relative group cursor-pointer hover:border-brand-500 transition-all">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-8 bg-slate-200 rounded-md"></div>
                   <span className="text-xs font-black text-slate-300">05/28</span>
                </div>
                <p className="text-slate-900 font-black text-lg tracking-widest">•••• •••• •••• 4242</p>
                <p className="text-[10px] font-black text-slate-300 uppercase mt-4">Personal Standard</p>
             </div>
          </div>
          <button className="w-full py-4 mt-8 border-2 border-slate-100 text-slate-500 hover:text-brand-600 hover:border-brand-600 rounded-2xl font-black transition-all">Alterar Cartão</button>
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-soft p-12">
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-50">
          <History size={24} className="text-slate-300" />
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Histórico Financeiro</h2>
        </div>

        <div className="space-y-6">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-6 rounded-3xl hover:bg-slate-50 transition-all group">
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                  tx.amount > 0 ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
                )}>
                  {tx.amount > 0 ? <TrendingUp size={28} /> : <ArrowUpRight size={28} />}
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight">{tx.name}</h4>
                  <p className="text-sm font-bold text-slate-400">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                 <p className={cn(
                   "text-2xl font-black tracking-tighter mb-1 font-mono",
                   tx.amount > 0 ? "text-emerald-500" : "text-slate-900"
                 )}>
                   {tx.amount > 0 ? '+' : ''} R$ {Math.abs(tx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                 </p>
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">PAGO VIA PIX</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
