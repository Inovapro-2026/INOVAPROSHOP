import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InputField } from './InputField';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: true,
    }
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    setServerError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful auth
      login({
        id: '123',
        firstName: 'Usuário',
        lastName: 'Exemplo',
        email: data.email,
        role: 'buyer', // Default for this login page
      });

      // Redirect happened in context usually or handled by page
      window.history.pushState({}, '', '/vitrine');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      setServerError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-100 rounded-2xl"
        >
          <p className="text-sm text-red-600 font-bold">{serverError}</p>
        </motion.div>
      )}

      <InputField
        label="E-mail"
        placeholder="Seu melhor e-mail"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="space-y-1">
        <InputField
          label="Senha"
          placeholder="Sua senha secreta"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex justify-end">
          <button 
            type="button" 
            className="text-[10px] font-black uppercase tracking-widest text-brand-600 hover:text-brand-700 hover:underline underline-offset-4"
          >
            Esqueci minha senha?
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 px-1">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-brand-600 checked:border-brand-600 transition-all cursor-pointer"
              {...register('rememberMe')}
            />
            <svg 
              className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Lembrar de mim</span>
        </label>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed h-[68px]"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>Acessar plataforma</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </>
        )}
      </motion.button>
    </form>
  );
};
