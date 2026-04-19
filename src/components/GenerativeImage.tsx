import React from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface GenerativeImageProps {
    prompt?: string;
    fallbackUrl?: string;
    aspectRatio?: "1:1" | "16:9" | "4:3" | "3:4" | "9:16";
    className?: string;
    alt?: string;
}

export const GenerativeImage: React.FC<GenerativeImageProps> = ({ 
    fallbackUrl,
    className, 
    alt = "Marketplace Content" 
}) => {
    return (
        <div className={cn("relative overflow-hidden bg-slate-50", className)}>
            {fallbackUrl ? (
                <img
                    src={fallbackUrl}
                    alt={alt}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 p-4 text-center">
                    <ImageIcon className="w-6 h-6 text-slate-300" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Sem Imagem</span>
                </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/5 to-transparent pointer-events-none mix-blend-overlay"></div>
        </div>
    );
};
