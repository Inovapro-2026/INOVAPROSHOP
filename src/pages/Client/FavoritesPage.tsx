import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, User, X, ExternalLink, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const MOCK_FAV_PRODUCTS = [
  { id: '1', name: 'Identity Branding Kit', price: 950, vendor: 'Creative Mind', rating: 5.0, image: 'https://picsum.photos/seed/branding/400/400' },
  { id: '2', name: 'High-Convert Landing Page', price: 1500, vendor: 'Conversion Kings', rating: 4.8, image: 'https://picsum.photos/seed/web/400/400' },
];

const MOCK_FAV_FREELANCERS = [
  { id: '1', name: 'Ana Silva', role: 'UX Designer Sênior', rating: 4.9, reviews: 124, avatar: 'https://picsum.photos/seed/ana/100/100' },
  { id: '2', name: 'Carlos Tech', role: 'Fullstack Dev React/Node', rating: 5.0, reviews: 89, avatar: 'https://picsum.photos/seed/carlos/100/100' },
];

export const FavoritesPage = () => {
  const [activeTab, setActiveTab] = useState<'produtos' | 'freelancers'>('produtos');
  const [products, setProducts] = useState(MOCK_FAV_PRODUCTS);
  const [freelancers, setFreelancers] = useState(MOCK_FAV_FREELANCERS);
  const navigate = useNavigate();

  const removeProduct = (id: string) => setProducts(products.filter(p => p.id !== id));
  const removeFreelancer = (id: string) => setFreelancers(freelancers.filter(f => f.id !== id));

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Meus Favoritos</h1>
          <p className="text-slate-500 font-bold">Talentos e produtos que você selecionou curadoria.</p>
        </div>

        <div className="bg-white p-1.5 rounded-[1.5rem] border-2 border-slate-100 shadow-soft flex gap-2">
          <button 
            onClick={() => setActiveTab('produtos')}
            className={cn(
              "px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3",
              activeTab === 'produtos' ? "bg-brand-600 text-white shadow-lg shadow-brand-100" : "text-slate-400 hover:text-slate-900"
            )}
          >
            <ShoppingBag size={16} /> Produtos
          </button>
          <button 
            onClick={() => setActiveTab('freelancers')}
            className={cn(
              "px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3",
              activeTab === 'freelancers' ? "bg-brand-600 text-white shadow-lg shadow-brand-100" : "text-slate-400 hover:text-slate-900"
            )}
          >
            <User size={16} /> Freelancers
          </button>
        </div>
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'produtos' ? (
            <motion.div 
              key="products"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.length > 0 ? products.map((item) => (
                <div key={item.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <button 
                      onClick={() => removeProduct(item.id)}
                      className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-xl"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="p-8">
                    <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-1">{item.vendor}</p>
                    <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{item.name}</h4>
                    <div className="flex items-center justify-between mt-auto">
                        <p className="text-2xl font-black text-slate-900 tracking-tighter">R$ {item.price}</p>
                        <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-brand-600 transition-all shadow-lg active:scale-95">
                           <ExternalLink size={20} />
                        </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center">
                   <Heart size={64} strokeWidth={1} className="mx-auto mb-6 text-slate-200" />
                   <p className="text-slate-400 font-bold mb-8 italic">Nenhum produto favorito ainda.</p>
                   <button onClick={() => navigate('/vitrine')} className="px-10 py-5 bg-brand-600 text-white rounded-full font-black shadow-xl">Explorar Vitrine</button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="freelances"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {freelancers.length > 0 ? freelancers.map((item) => (
                <div key={item.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-soft flex items-center gap-8 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                  
                  <img src={item.avatar} className="w-24 h-24 rounded-3xl object-cover shadow-lg group-hover:scale-110 transition-transform relative z-10" referrerPolicy="no-referrer" />
                  
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-black text-slate-900">{item.rating}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l pl-2 border-slate-100">{item.reviews} avaliações</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-1">{item.name}</h4>
                    <p className="text-slate-500 font-medium mb-4">{item.role}</p>
                    <div className="flex items-center gap-4">
                        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-slate-800 transition-all shadow-md">Ver Perfil</button>
                        <button onClick={() => removeFreelancer(item.id)} className="px-6 py-3 bg-red-50 text-red-500 rounded-xl font-black text-xs hover:bg-red-500 hover:text-white transition-all border border-red-100">Remover</button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center">
                   <User size={64} strokeWidth={1} className="mx-auto mb-6 text-slate-200" />
                   <p className="text-slate-400 font-bold mb-8 italic">Nenhum profissional favorito ainda.</p>
                   <button onClick={() => navigate('/freelas')} className="px-10 py-5 bg-brand-600 text-white rounded-full font-black shadow-xl">Explorar Talentos</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
