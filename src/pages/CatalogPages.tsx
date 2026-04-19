import React, { useState, useEffect } from 'react';
import { 
    Search, 
    ShoppingBag, 
    ArrowRight, 
    LayoutGrid, 
    List, 
    ChevronDown,
    X,
    Sliders,
    SlidersHorizontal,
    Package,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Freelancer, FreelancerCard } from '../components/Cards';
import { VITRINE_PRODUCTS, Product } from '../vitrineData';
import { cn } from '../lib/utils';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumbs, CategoryChips, SearchBarML } from '../components/Vitrine/VitrineComponents';
import { SidebarFilter } from '../components/Vitrine/SidebarFilter';
import { CompactProductCard } from '../components/Vitrine/CompactProductCard';
import { HeroBannerSlider } from '../components/Vitrine/HeroBannerSlider';
import { FeaturedTalentSlider } from '../components/Freelancers/FeaturedTalentSlider';

const FREELANCERS: Freelancer[] = [];

export const VitrinePage = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [sortBy, setSortBy] = useState('Relevância');
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [visibleItems, setVisibleItems] = useState(30);

    const categories = ['Todos', 'Templates', 'E-books', 'Cursos', 'Design', 'Marketing', 'Programação', 'Automação'];

    const breadcrumbs = [
        { label: 'Início', href: '/' },
        { label: 'Vitrine', href: '/vitrine' },
        { label: 'Produtos Digitais' }
    ];

    const loadMore = () => setVisibleItems(prev => prev + 10);

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            
            <div className="pt-40 pb-24 px-4 max-w-[1720px] mx-auto">
                {/* Header Section */}
                <header className="mb-12 lg:px-6">
                    <Breadcrumbs items={breadcrumbs} />
                    
                    {/* Hero Slider Area */}
                    <div className="mt-8 mb-12">
                        <HeroBannerSlider />
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                        <div className="max-w-2xl">
                            {/* Search moved below slider for better prominence in this layout */}
                        </div>
                        <div className="w-full lg:w-1/2">
                            <SearchBarML value={search} onChange={setSearch} />
                        </div>
                    </div>

                    <CategoryChips 
                        categories={categories} 
                        activeCategory={activeCategory} 
                        onSelect={setActiveCategory} 
                    />

                    {/* Meta bar: Count & Sorting */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-8">
                        <div className="flex items-center gap-4">
                            <p className="text-xs font-bold text-slate-900">
                                <span className="text-brand-600 font-black tracking-widest">{VITRINE_PRODUCTS.length}</span> PRODUTOS ENCONTRADOS
                            </p>
                            <div className="h-3 w-px bg-slate-200 hidden sm:block"></div>
                            <button 
                                onClick={() => setIsFilterDrawerOpen(true)}
                                className="lg:hidden flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-600 transition-colors"
                            >
                                <Sliders size={12} /> Filtros
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
                                    Ordenar por: <span className="text-slate-900">{sortBy}</span>
                                    <ChevronDown size={14} />
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl border border-slate-100 shadow-premium p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                    {['Relevância', 'Mais vendidos', 'Menor preço', 'Maior preço', 'Melhor avaliados'].map(opt => (
                                        <button 
                                            key={opt}
                                            onClick={() => setSortBy(opt)}
                                            className={cn(
                                                "w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors",
                                                sortBy === opt ? "bg-slate-50 text-brand-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                            )}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content: High Density Grid (Now Full Width) */}
                <div className="flex flex-col gap-10">
                    {VITRINE_PRODUCTS.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {VITRINE_PRODUCTS.slice(0, visibleItems).map(product => (
                                <CompactProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-slate-100 rounded-[3.5rem] bg-slate-50/50">
                            <div className="w-20 h-20 bg-white rounded-[1.8rem] shadow-soft flex items-center justify-center mb-6 text-slate-300">
                               <Package size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Vitrine em manutenção</h3>
                            <p className="text-slate-500 font-medium max-w-sm">Estamos preparando o catálogo com produtos selecionados e verificados.</p>
                        </div>
                    )}

                    {/* Load More Button */}
                    {visibleItems < VITRINE_PRODUCTS.length && (
                        <div className="flex items-center justify-center pt-10">
                            <button 
                                onClick={loadMore}
                                className="bg-slate-900 text-white px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3"
                            >
                                Carregar + itens <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Trust CTA */}
                <div className="mt-32 p-10 md:p-16 bg-slate-900 rounded-[3.5rem] relative overflow-hidden group mx-4 lg:mx-6">
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                     <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-tight uppercase">Sua <span className="text-brand-400">segurança</span> é nossa <br className="hidden md:block" /> prioridade absoluta.</h2>
                            <p className="text-slate-400 text-lg font-medium mb-10 max-w-lg">Garantimos a entrega do seu produto digital ou seu dinheiro de volta. Processamento de pagamento seguro via Mercado Pago.</p>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex items-center gap-3 text-white">
                                    <ShieldCheck className="text-emerald-500" />
                                    <span className="text-sm font-bold uppercase tracking-widest">Escrow Ativo</span>
                                </div>
                                <div className="flex items-center gap-3 text-white">
                                    <Zap className="text-amber-500" />
                                    <span className="text-sm font-bold uppercase tracking-widest">Entrega Imediata</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <button className="bg-brand-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-900/20 active:scale-95">
                                Começar Agora
                            </button>
                        </div>
                     </div>
                </div>

                {/* Mobile Filter Drawer Overlay */}
                <AnimatePresence>
                    {isFilterDrawerOpen && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden"
                            onClick={() => setIsFilterDrawerOpen(false)}
                        >
                            <motion.div 
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white p-8 overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-slate-900 uppercase">Filtrar</h3>
                                    <button onClick={() => setIsFilterDrawerOpen(false)}><X size={24} /></button>
                                </div>
                                <SidebarFilter />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </div>
    );
};

export const FreelasPage = () => {
    return (
        <div className="pt-40 pb-24 bg-slate-50 min-h-screen">
            <Navbar />
            <div className="max-w-[1720px] mx-auto px-6">
                <FeaturedTalentSlider />
                
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <span className="text-brand-600 font-black text-xs uppercase tracking-widest mb-4 block underline decoration-brand-600/30 underline-offset-4">Gig Marketplace</span>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[1.1] uppercase">
                            Encontre <span className="text-brand-600 italic">Profissionais.</span>
                        </h1>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Buscar freelancers..." 
                                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                            />
                        </div>
                        <button className="px-8 py-4 bg-slate-900 text-white border border-slate-900 rounded-2xl flex items-center justify-center gap-2 font-black hover:bg-slate-800 transition-colors">
                            <SlidersHorizontal size={18} /> Especialidades
                        </button>
                    </div>
                </header>

                {FREELANCERS.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {FREELANCERS.map(f => <FreelancerCard key={f.id} freelancer={f} />)}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-white/50 backdrop-blur-sm">
                        <div className="w-20 h-20 bg-brand-50 rounded-[1.5rem] shadow-sm flex items-center justify-center mb-6 text-brand-300">
                           <Users size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Nenhum talento em destaque</h3>
                        <p className="text-slate-500 font-medium max-w-sm">Nossa equipe está validando novos talentos para garantir a máxima qualidade.</p>
                    </div>
                )}

                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    {[
                        { t: "Pagamento em Escrow", d: "Sua grana fica travada até o freela entregar exatamente o que você pediu." },
                        { t: "Talentos Verificados", d: "Apenas 10% dos candidatos passam no nosso teste de qualidade técnica." },
                        { t: "Suporte 24/7", d: "Teve algum problema com a entrega? Nosso time de mediação entra em ação na hora." },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-soft group hover:border-brand-100 transition-colors">
                            <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase group-hover:text-brand-600 transition-colors">{item.t}</h4>
                            <p className="text-slate-500 font-medium leading-relaxed">{item.d}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

// Trust Icons for reuse
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
const Zap = ({ className }: { className?: string }) => (
  <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2 Z"/></svg>
);
