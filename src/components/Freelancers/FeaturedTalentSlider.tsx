import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, UserCheck, Star, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { GenerativeImage } from '../GenerativeImage';

interface TalentAnnouncement {
    id: string | number;
    title: string;
    description: string;
    image: string;
    link: string;
    active: boolean;
    highlighted: boolean;
}

const DEFAULT_TALENTS: TalentAnnouncement[] = [
    {
        id: 1,
        title: "TALENTOS PRONTOS PARA O PRÓXIMO PROJETO",
        description: "Encontre freelancers qualificados em design, desenvolvimento, marketing e muito mais com a segurança da FreelancePro.",
        image: "https://picsum.photos/seed/talents1/1200/800",
        link: "/freelas",
        active: true,
        highlighted: true
    },
    {
        id: 2,
        title: "ESPECIALISTAS EM DIVERSAS ÁREAS",
        description: "Descubra profissionais selecionados para branding, tráfego pago, UI/UX, copywriting e tecnologia avançada.",
        image: "https://picsum.photos/seed/expertise2/1200/800",
        link: "/freelas",
        active: true,
        highlighted: false
    }
];

export const FeaturedTalentSlider = () => {
    const [announcements, setAnnouncements] = useState<TalentAnnouncement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('freelancepro_announcements');
        if (saved) {
            const parsed = JSON.parse(saved).filter((a: TalentAnnouncement) => a.active);
            setAnnouncements(parsed.length > 0 ? parsed : DEFAULT_TALENTS);
        } else {
            setAnnouncements(DEFAULT_TALENTS);
        }
    }, []);

    const nextSlide = useCallback(() => {
        if (announcements.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, [announcements.length]);

    const prevSlide = () => {
        if (announcements.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying && announcements.length > 0) {
            interval = setInterval(nextSlide, 6000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide, announcements.length]);

    if (announcements.length === 0) return null;

    const activeBanner = announcements[currentIndex];

    return (
        <div 
            className="relative w-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-white border border-slate-100 shadow-premium mb-16"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative min-h-[450px] md:min-h-[550px] flex items-center"
                >
                    {/* Background Subtle Gradient */}
                    <div className="absolute inset-0 opacity-[0.03] transition-colors duration-1000 bg-brand-600"></div>
                    <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-brand-50/20 to-transparent z-0"></div>

                    <div className="container mx-auto px-8 md:px-16 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
                        <div className="flex flex-col items-start space-y-6 md:space-y-10">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-100 text-brand-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full"
                            >
                                <UserCheck size={14} className="text-brand-600" />
                                <span>{activeBanner.highlighted ? "Destaque Premium" : "Novidade"}</span>
                            </motion.div>
                            
                            <motion.h2 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase max-w-xl"
                            >
                                {activeBanner.title}
                            </motion.h2>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-slate-500 text-lg md:text-xl font-medium max-w-lg leading-relaxed"
                            >
                                {activeBanner.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
                            >
                                <a 
                                    href={activeBanner.link}
                                    className="group bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-brand-600 transition-all active:scale-95 shadow-2xl shadow-slate-900/10"
                                >
                                    Saber Mais
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        </div>

                        <div className="hidden lg:block relative h-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="relative rounded-[3.5rem] overflow-hidden shadow-premium aspect-[1.1] group bg-slate-50"
                            >
                                <GenerativeImage 
                                    fallbackUrl={activeBanner.image}
                                    aspectRatio="1:1"
                                    alt={activeBanner.title}
                                    className="w-full h-full"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-16 flex items-center gap-6 z-20">
                <div className="flex gap-2.5">
                    {announcements.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setCurrentIndex(i);
                                setIsAutoPlaying(false);
                            }}
                            className={cn(
                                "h-1.5 transition-all duration-500 rounded-full",
                                currentIndex === i ? "w-10 bg-brand-600" : "w-3 bg-slate-200 hover:bg-brand-200"
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
                        className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition-all flex items-center justify-center group"
                    >
                        <ChevronLeft size={22} className="group-active:scale-90 transition-transform" />
                    </button>
                    <button 
                        onClick={() => {
                            nextSlide();
                            setIsAutoPlaying(false);
                        }}
                        className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-400 hover:bg-brand-50 hover:text-brand-600 transition-all flex items-center justify-center group"
                    >
                        <ChevronRight size={22} className="group-active:scale-90 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Auto-play progress bar */}
            {isAutoPlaying && (
                <div className="absolute bottom-0 left-0 h-1.5 bg-brand-50 w-full z-30">
                    <motion.div 
                        key={currentIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="h-full bg-brand-600"
                    />
                </div>
            )}
        </div>
    );
};
