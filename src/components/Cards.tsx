import React from 'react';
import { ShoppingBag, Star, User, UserCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    rating: number;
    sales: number;
    image: string;
    author: string;
    badge?: string;
}

export interface Freelancer {
    id: string;
    name: string;
    title: string;
    price: number;
    rating: number;
    reviews: number;
    category: string;
    image: string;
    verified: boolean;
}

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all group overflow-hidden"
        >
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                />
                {product.badge && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-slate-900 tracking-widest uppercase shadow-sm">
                            {product.badge}
                        </span>
                    </div>
                )}
                <div className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform">
                   <button className="bg-brand-600 text-white p-4 rounded-2xl shadow-xl hover:bg-brand-700 transition-colors">
                        <ShoppingBag size={20} />
                   </button>
                </div>
            </div>
            <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-amber-400 fill-amber-400">
                        <Star size={14} />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                    <span className="text-sm text-slate-400 font-medium">({product.sales} vendas)</span>
                </div>
                <h3 className="font-bold text-slate-900 text-xl leading-tight mb-2 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{product.title}</h3>
                <p className="text-sm text-slate-400 font-medium mb-6 flex items-center gap-2">
                    <User size={14} /> {product.author}
                </p>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Preço Único</p>
                        <p className="text-2xl font-black text-slate-900">R$ {product.price}</p>
                    </div>
                    <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
                        {product.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export const FreelancerCard: React.FC<{ freelancer: Freelancer }> = ({ freelancer }) => {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all p-8 flex flex-col items-center text-center relative group"
        >
            <div className="relative mb-6">
                <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-soft bg-slate-100 group-hover:scale-105 transition-transform">
                    <img src={freelancer.image} alt={freelancer.name} className="w-full h-full object-cover" />
                </div>
                {freelancer.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-brand-600 text-white p-1.5 rounded-xl border-4 border-white shadow-lg">
                        <UserCheck size={16} />
                    </div>
                )}
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-1">{freelancer.name}</h3>
            <p className="text-brand-600 font-bold text-sm tracking-tight mb-4">{freelancer.title}</p>
            
            <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-400 fill-amber-400"><Star size={14} /></div>
                <span className="text-sm font-bold text-slate-900">{freelancer.rating}</span>
                <span className="text-sm text-slate-400 font-medium">({freelancer.reviews} reviews)</span>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Inicia em</p>
                    <p className="text-lg font-black text-slate-900">R$ {freelancer.price}</p>
                </div>
                <div className="flex justify-end items-center">
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-800 transition-all active:scale-95">
                        Ver Perfil
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export const BlogCard: React.FC<{ post: any }> = ({ post }) => {
    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.article 
            whileHover={{ y: -8 }}
            className="group cursor-pointer bg-white rounded-[2.5rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all overflow-hidden"
            onClick={() => navigate(`/blog/${post.slug}`)}
        >
            <div className="relative h-56 overflow-hidden">
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-brand-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                </div>
            </div>
            <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-brand-600 transition-colors">
                    {post.title}
                </h3>
                <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-6">
                    {post.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Ler Artigo</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-600 group-hover:text-white transition-all">
                        <ArrowRight size={18} />
                    </div>
                </div>
            </div>
        </motion.article>
    );
};
