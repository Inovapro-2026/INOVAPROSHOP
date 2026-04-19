import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  mask?: 'cpf' | 'phone' | 'date';
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
          {label}
        </label>
        <div className="relative group">
          <input
            ref={ref}
            className={cn(
              "w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder:text-slate-300 transition-all outline-none",
              "focus:bg-white focus:border-brand-500 focus:shadow-xl focus:shadow-brand-100",
              error && "border-red-100 bg-red-50 focus:border-red-500 focus:shadow-red-50",
              className
            )}
            {...props}
          />
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-red-500 font-black mt-1.5 ml-1 uppercase"
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = 'InputField';
