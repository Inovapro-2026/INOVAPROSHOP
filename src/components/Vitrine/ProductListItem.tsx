import React from 'react';
import { Star, Heart, ShieldCheck, Zap, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../vitrineData';
import { cn } from '../../lib/utils';

export const ProductListItem: React.FC<{ product: Product }> = ({ product }) => {
    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col md:flex-row bg-white rounded-[2.5rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all overflow-hidden"
        >
            {/* Image Section */}
            <div className="md:w-72 h-64 md:h-auto overflow-hidden relative cursor-pointer" onClick={() => navigate(`/vitrine/${product.slug}`)}>
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                />
                {product.badge && (
                    <div className="absolute top-6 left-6">
                        <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            {product.badge}
                        </span>
                    </div>
                )}
                <button className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-slate-400 flex items-center justify-center hover:text-red-500 transition-colors shadow-sm">
                    <Heart size={20} />
                </button>
            </div>

            {/* Info Section */}
            <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                <ShoppingBag size={14} className="text-slate-300" />
                                <span>{product.sales} vendas</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold">
                            <Star size={14} className="fill-amber-600" />
                            <span>{product.rating}</span>
                            <span className="opacity-50 font-medium">({product.reviewsCount})</span>
                        </div>
                    </div>

                    <h3 
                        onClick={() => navigate(`/vitrine/${product.slug}`)}
                        className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-brand-600 transition-colors cursor-pointer uppercase tracking-tight"
                    >
                        {product.title}
                    </h3>
                    
                    <p className="text-slate-500 font-medium text-sm line-clamp-2 mb-6 max-w-2xl leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-6 mb-8 text-xs font-bold text-slate-400">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>{product.delivery}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                           <span>{product.format}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-slate-50 pt-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 italic">
                            <img src={product.author.image} alt={product.author.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Vendedor</p>
                            <div className="flex items-center gap-1.5">
                                <p className="font-bold text-slate-900 text-sm">{product.author.name}</p>
                                {product.author.verified && <ShieldCheck size={14} className="text-brand-500" />}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 w-full sm:w-auto">
                        <div className="text-right">
                            {product.originalPrice && (
                                <p className="text-sm text-slate-400 line-through font-bold mb-1">R$ {product.originalPrice}</p>
                            )}
                            <div className="flex items-center gap-3">
                                <p className="text-3xl font-black text-slate-900">R$ {product.price}</p>
                                {product.discount && (
                                    <span className="text-emerald-500 text-xs font-black uppercase tracking-widest">{product.discount}% OFF</span>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate(`/vitrine/${product.slug}`)}
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3"
                        >
                            Ver Detalhes <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
