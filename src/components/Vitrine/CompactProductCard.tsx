import React from 'react';
import { Star, Heart, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../vitrineData';
import { cn } from '../../lib/utils';
import { GenerativeImage } from '../GenerativeImage';

interface CompactProductCardProps {
    product: Product;
}

export const CompactProductCard: React.FC<CompactProductCardProps> = ({ product }) => {
    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Construct a premium prompt for Nano Banana if no specific prompt is provided
    const defaultPrompt = `Premium, minimalist, and modern high-quality SaaS aesthetic visual for "${product.title}" in the category of "${product.category}". Soft gradients, subtle lighting, purple and violet accents, clean composition with depth, slightly futuristic. Non-literal conceptual representation.`;
    const finalPrompt = product.prompt || defaultPrompt;

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-premium transition-all overflow-hidden h-full"
        >
            {/* Image Container - Fixed Aspect Ratio */}
            <div 
                className="aspect-square overflow-hidden relative cursor-pointer" 
                onClick={() => navigate(`/vitrine/${product.slug}`)}
            >
                <GenerativeImage 
                    prompt={finalPrompt}
                    fallbackUrl={product.image}
                    aspectRatio="1:1"
                    alt={product.title}
                    className="w-full h-full"
                />
                
                {/* Badge Overlay */}
                {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-slate-900/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-lg">
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Favorite Action */}
                <button className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md text-slate-400 flex items-center justify-center hover:text-red-500 transition-colors shadow-sm">
                    <Heart size={18} />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                {/* Metas: Category & Sales */}
                <div className="flex items-center justify-between gap-1 mb-3">
                    <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest truncate bg-brand-50 px-2 py-0.5 rounded-md">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 whitespace-nowrap">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 
                    onClick={() => navigate(`/vitrine/${product.slug}`)}
                    className="text-sm font-black text-slate-900 mb-3 leading-tight line-clamp-2 min-h-[40px] group-hover:text-brand-600 transition-colors cursor-pointer uppercase tracking-tight"
                >
                    {product.title}
                </h3>
                
                {/* Pricing Area */}
                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 flex-wrap mb-4">
                        <span className="text-xl font-black text-slate-900 leading-none">R$ {product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through font-bold">R$ {product.originalPrice}</span>
                        )}
                    </div>
                    
                    {/* Seller & Details */}
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex-1 truncate pr-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate leading-none mb-1">Vendedor</p>
                            <p className="text-xs font-bold text-slate-900 truncate">{product.author.name}</p>
                        </div>
                        <button 
                            onClick={() => navigate(`/vitrine/${product.slug}`)}
                            className="bg-brand-50 p-2.5 rounded-xl text-brand-600 hover:bg-brand-600 hover:text-white transition-all group/btn shadow-sm"
                            title="Ver Detalhes"
                        >
                            <ArrowUpRight size={18} className="group-hover/btn:rotate-45 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
