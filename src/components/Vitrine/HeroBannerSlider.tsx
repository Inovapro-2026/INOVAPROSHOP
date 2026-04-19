import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { GenerativeImage } from '../GenerativeImage';

interface Banner {
    id: string | number;
    title: string;
    subtitle: string;
    cta: string;
    link: string;
    image: string;
    active: boolean;
    order: number;
}

const DEFAULT_BANNERS: Banner[] = [
    {
        id: 1,
        title: "Produtos Digitais de Alta Performance",
        subtitle: "Acelere seu faturamento com templates, scripts e sistemas prontos para escalar qualquer negócio digital.",
        cta: "Explorar Premium",
        link: "/vitrine",
        image: "https://picsum.photos/seed/premium8/1200/800",
        active: true,
        order: 1
    },
    {
        id: 2,
        title: "Packs, Templates e Cursos Exclusivos",
        subtitle: "Tudo o que você precisa para dominar o mercado, desde artes editáveis até cursos avançados de tráfego e vendas.",
        cta: "Ver Coleção",
        link: "/vitrine",
        image: "https://picsum.photos/seed/course2/1200/800",
        active: true,
        order: 2
    }
];

export const HeroBannerSlider = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('freelancepro_banners');
        if (saved) {
            const parsed = JSON.parse(saved).filter((b: Banner) => b.active);
            setBanners(parsed.length > 0 ? parsed : DEFAULT_BANNERS);
        } else {
            setBanners(DEFAULT_BANNERS);
        }
    }, []);

    const nextSlide = useCallback(() => {
        if (banners.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, [banners.length]);

    const prevSlide = () => {
        if (banners.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying && banners.length > 0) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide, banners.length]);

    if (banners.length === 0) return null;

    return (
        <div 
            className="relative w-full overflow-hidden rounded-[2rem] md:rounded-[3.5rem] bg-white border border-slate-100 shadow-premium"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative min-h-[400px] md:min-h-[500px] flex items-center"
                >
                    {/* Background Visual Elements */}
                    <div className="absolute inset-0 opacity-10 transition-colors duration-700 bg-brand-600"></div>
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/20 to-transparent z-0"></div>

                    <div className="container mx-auto px-8 md:px-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="flex flex-col items-start space-y-6 md:space-y-8">
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-600 bg-brand-50 px-4 py-2 rounded-full"
                            >
                                Seleção FreelancePro
                            </motion.span>
                            
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95] md:leading-[0.9] uppercase"
                            >
                                {banners[currentIndex].title.split(' ').map((word, i) => (
                                    <span key={i} className={cn(i > 2 ? "text-brand-600" : "")}>{word} </span>
                                ))}
                            </motion.h2>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-slate-500 text-lg md:text-xl font-medium max-w-lg leading-relaxed"
                            >
                                {banners[currentIndex].subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <a 
                                    href={banners[currentIndex].link}
                                    className="group bg-slate-900 text-white px-8 md:px-10 py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-brand-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
                                >
                                    {banners[currentIndex].cta}
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        </div>

                        <div className="hidden lg:block relative h-full py-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3] group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/20 to-transparent mix-blend-overlay"></div>
                                <GenerativeImage 
                                    fallbackUrl={banners[currentIndex].image}
                                    aspectRatio="16:9"
                                    alt={banners[currentIndex].title}
                                    className="w-full h-full"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-16 flex items-center gap-6 z-20">
                <div className="flex gap-2">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setCurrentIndex(i);
                                setIsAutoPlaying(false);
                            }}
                            className={cn(
                                "h-1.5 transition-all duration-300 rounded-full",
                                currentIndex === i ? "w-8 bg-brand-600" : "w-3 bg-slate-200 hover:bg-slate-300"
                            )}
                        />
                    ))}
                </div>
                
                <div className="h-4 w-px bg-slate-100"></div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => {
                            prevSlide();
                            setIsAutoPlaying(false);
                        }}
                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition-all flex items-center justify-center group"
                    >
                        <ChevronLeft size={20} className="group-active:scale-90 transition-transform" />
                    </button>
                    <button 
                        onClick={() => {
                            nextSlide();
                            setIsAutoPlaying(false);
                        }}
                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition-all flex items-center justify-center group"
                    >
                        <ChevronRight size={20} className="group-active:scale-90 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Progress indicator for autoplay */}
            {isAutoPlaying && (
                <div className="absolute bottom-0 left-0 h-1 bg-brand-600/20 w-full z-30">
                    <motion.div 
                        key={currentIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-brand-600"
                    />
                </div>
            )}
        </div>
    );
};
