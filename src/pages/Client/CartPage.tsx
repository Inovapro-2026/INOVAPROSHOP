import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, ArrowRight, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_CART = [
  { 
    id: '1', 
    name: 'Logo Premium & Branding Kit', 
    price: 850.00, 
    vendor: 'Design Studio Pro',
    image: 'https://picsum.photos/seed/design/400/400',
    quantity: 1
  },
  { 
    id: '2', 
    name: 'Consultoria Estratégica Digital (2h)', 
    price: 450.00, 
    vendor: 'Estratégia & Cia',
    image: 'https://picsum.photos/seed/it/400/400',
    quantity: 1
  }
];

export const CartPage = () => {
  const [items, setItems] = useState(MOCK_CART);
  const navigate = useNavigate();

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-[3rem] p-20 border border-slate-100 shadow-soft text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
          <ShoppingCart size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Seu carrinho está vazio</h2>
        <p className="text-slate-500 font-medium mb-12 max-w-sm mx-auto">
          Parece que você ainda não adicionou nenhum talento ou produto à sua lista de desejos.
        </p>
        <button 
          onClick={() => navigate('/vitrine')}
          className="px-10 py-5 bg-brand-600 text-white rounded-[2rem] font-black shadow-xl shadow-brand-100 hover:bg-brand-700 transition-all active:scale-95"
        >
          Explorar Vitrine
        </button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-8 flex items-center gap-4">
          Meu Carrinho
          <span className="text-base font-bold bg-slate-100 text-slate-400 px-4 py-1 rounded-full">{items.length} itens</span>
        </h1>

        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col md:flex-row items-center gap-8 group"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-32 h-32 rounded-3xl object-cover shadow-lg group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">{item.vendor}</p>
                <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{item.name}</h3>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">
                    R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-10 h-10 bg-white text-slate-400 hover:text-brand-600 rounded-xl flex items-center justify-center shadow-sm transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="font-black text-slate-900 w-6 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-10 h-10 bg-white text-slate-400 hover:text-brand-600 rounded-xl flex items-center justify-center shadow-sm transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={() => removeItem(item.id)}
                className="w-14 h-14 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-sm"
              >
                <Trash2 size={24} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-premium sticky top-32">
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Resumo do Pedido</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-slate-500 font-bold">
              <span>Subtotal</span>
              <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-bold">
              <span>Taxa de Serviço (5%)</span>
              <span>R$ {serviceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="h-px bg-slate-50 my-4"></div>
            <div className="flex justify-between text-slate-900 text-2xl font-black tracking-tighter font-mono">
              <span>Total</span>
              <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full py-6 bg-brand-600 text-white rounded-[2rem] font-black shadow-xl shadow-brand-100 hover:bg-brand-700 transition-all flex items-center justify-center gap-3 active:scale-95">
              Ir para Checkout
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/vitrine')}
              className="w-full py-6 bg-white border-2 border-slate-100 text-slate-900 rounded-[2rem] font-black hover:bg-slate-50 transition-all"
            >
              Continuar Comprando
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
            Compra 100% Protegida por Escrow
          </div>
        </div>
      </div>
    </div>
  );
};
