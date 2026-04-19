import React from 'react';
import { ChevronRight, Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Breadcrumbs = ({ items }: { items: { label: string; href?: string }[] }) => {
    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <ChevronRight size={12} />}
                    {item.href ? (
                        <button 
                            onClick={() => navigate(item.href!)}
                            className="hover:text-brand-600 transition-colors"
                        >
                            {item.label}
                        </button>
                    ) : (
                        <span className="text-slate-900">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export const CategoryChips = ({ categories, activeCategory, onSelect }: { 
    categories: string[]; 
    activeCategory: string;
    onSelect: (cat: string) => void;
}) => {
    return (
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={cn(
                        "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                        activeCategory === cat 
                            ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export const SearchBarML = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
    return (
        <div className="relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input 
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="O que você está procurando hoje?"
                className="w-full pl-14 pr-12 py-5 bg-white border-2 border-slate-100 rounded-[2rem] shadow-soft focus:outline-none focus:border-brand-500 transition-all font-medium text-lg placeholder:text-slate-300"
            />
            {value && (
                <button 
                    onClick={() => onChange('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600"
                >
                    <X size={20} />
                </button>
            )}
        </div>
    );
};
