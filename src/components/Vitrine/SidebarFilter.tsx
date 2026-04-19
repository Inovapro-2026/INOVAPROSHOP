import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Star, Zap, ShieldCheck, Filter as FilterIcon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const FilterSection = ({ title, children, isOpen, onToggle }: FilterSectionProps) => {
    return (
        <div className="border-b border-slate-100 py-5 last:border-0">
            <button 
                onClick={onToggle}
                className="flex items-center justify-between w-full mb-3 group"
            >
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors">
                    {title}
                </h4>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={14} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-2.5 pb-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const SidebarFilter = () => {
    const sections = ['Categorias', 'Preço', 'Avaliação', 'Formato', 'Entrega', 'Vendedor'];
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        sections.reduce((acc, section) => ({ ...acc, [section]: true }), {})
    );

    const toggleSection = (name: string) => {
        setOpenSections(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const expandAll = () => {
        setOpenSections(sections.reduce((acc, section) => ({ ...acc, [section]: true }), {}));
    };

    const collapseAll = () => {
        setOpenSections(sections.reduce((acc, section) => ({ ...acc, [section]: false }), {}));
    };

    return (
        <aside className="w-full h-fit sticky top-32">
            <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <FilterIcon size={18} className="text-brand-600" />
                        <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Filtros</h3>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-brand-600 hover:text-brand-700">Limpar</button>
                </div>

                <div className="flex gap-4 mb-6 pb-6 border-b border-slate-50">
                    <button 
                        onClick={expandAll}
                        className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        Expandir Todos
                    </button>
                    <button 
                        onClick={collapseAll}
                        className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        Recolher Todos
                    </button>
                </div>

                <div className="space-y-1">
                    <FilterSection 
                        title="Categorias" 
                        isOpen={openSections['Categorias']} 
                        onToggle={() => toggleSection('Categorias')}
                    >
                        {['Templates', 'E-books', 'Cursos', 'Packs', 'Automação', 'Programação', 'Design'].map(cat => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer appearance-none w-4 h-4 rounded-md border-2 border-slate-200 checked:bg-brand-600 checked:border-brand-600 transition-all cursor-pointer" />
                                    <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                                </div>
                                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{cat}</span>
                            </label>
                        ))}
                    </FilterSection>

                    <FilterSection 
                        title="Preço" 
                        isOpen={openSections['Preço']} 
                        onToggle={() => toggleSection('Preço')}
                    >
                        <div className="grid grid-cols-2 gap-2 mt-2 mb-3">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">R$</span>
                                <input type="number" placeholder="Min" className="w-full pl-7 pr-3 py-2.5 bg-slate-50 rounded-xl text-[10px] font-bold border border-transparent focus:border-brand-500 focus:bg-white transition-all outline-none" />
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">R$</span>
                                <input type="number" placeholder="Max" className="w-full pl-7 pr-3 py-2.5 bg-slate-50 rounded-xl text-[10px] font-bold border border-transparent focus:border-brand-500 focus:bg-white transition-all outline-none" />
                            </div>
                        </div>
                        {['Até R$ 50', 'R$ 50 a R$ 200', 'Mais de R$ 200'].map(range => (
                            <button key={range} className="block text-[11px] font-bold text-brand-600 hover:text-brand-700 transition-colors">{range}</button>
                        ))}
                    </FilterSection>

                    <FilterSection 
                        title="Avaliação" 
                        isOpen={openSections['Avaliação']} 
                        onToggle={() => toggleSection('Avaliação')}
                    >
                        {[5, 4, 3].map(stars => (
                            <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer appearance-none w-4 h-4 rounded-md border-2 border-slate-200 checked:bg-brand-600 checked:border-brand-600 transition-all cursor-pointer" />
                                    <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                                </div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={12} 
                                            className={cn(i < stars ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200")} 
                                        />
                                    ))}
                                    <span className="text-[10px] font-bold text-slate-400 ml-1">ou mais</span>
                                </div>
                            </label>
                        ))}
                    </FilterSection>

                    <FilterSection 
                        title="Formato" 
                        isOpen={openSections['Formato']} 
                        onToggle={() => toggleSection('Formato')}
                    >
                        {['PDF', 'ZIP', 'Canva', 'Figma', 'Notion', 'Código-fonte'].map(f => (
                            <label key={f} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer appearance-none w-4 h-4 rounded-md border-2 border-slate-200 checked:bg-brand-600 checked:border-brand-600 transition-all cursor-pointer" />
                                    <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                                </div>
                                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{f}</span>
                            </label>
                        ))}
                    </FilterSection>

                    <FilterSection 
                        title = "Entrega"
                        isOpen={openSections['Entrega']}
                        onToggle={() => toggleSection('Entrega')}
                    >
                         {['Imediata', 'Até 24h', 'Sob Demanda'].map(e => (
                            <label key={e} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer appearance-none w-4 h-4 rounded-md border-2 border-slate-200 checked:bg-brand-600 checked:border-brand-600 transition-all cursor-pointer" />
                                    <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                                </div>
                                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{e}</span>
                            </label>
                        ))}
                    </FilterSection>

                    <FilterSection 
                        title="Vendedor" 
                        isOpen={openSections['Vendedor']} 
                        onToggle={() => toggleSection('Vendedor')}
                    >
                        {[
                            { label: 'Verificado', icon: <ShieldCheck size={14} className="text-brand-500" /> },
                            { label: 'Expert', icon: <Zap size={14} className="text-amber-500" /> },
                            { label: 'Top Seller', icon: <Star size={14} className="text-emerald-500" /> }
                        ].map(lv => (
                            <label key={lv.label} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer appearance-none w-4 h-4 rounded-md border-2 border-slate-200 checked:bg-brand-600 checked:border-brand-600 transition-all cursor-pointer" />
                                    <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    {lv.icon}
                                    <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{lv.label}</span>
                                </div>
                            </label>
                        ))}
                    </FilterSection>
                </div>
            </div>
        </aside>
    );
};
