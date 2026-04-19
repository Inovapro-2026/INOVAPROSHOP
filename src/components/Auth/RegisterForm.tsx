import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InputField } from './InputField';
import { GoogleLoginButton } from './GoogleLoginButton';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

const registerSchema = z.object({
  firstName: z.string().min(2, 'Nome muito curto'),
  lastName: z.string().min(2, 'Sobrenome muito curto'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos'),
  birthDate: z.string().refine((date) => {
    const d = new Date(date);
    return !isNaN(d.getTime()) && d < new Date();
  }, 'Data de nascimento inválida'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onRegister: (data: RegisterFormData) => void;
  onGoogleLogin: () => void;
  isLoading?: boolean;
}

export const RegisterForm = ({ onRegister, onGoogleLogin, isLoading }: RegisterFormProps) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const [cpfValue, setCpfValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpfValue(formatted);
    setValue('cpf', formatted.replace(/\D/g, ''));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhoneValue(formatted);
    setValue('phone', formatted.replace(/\D/g, ''));
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onRegister)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            {...register('firstName')}
            label="Nome"
            placeholder="Ex: João"
            error={errors.firstName?.message}
          />
          <InputField
            {...register('lastName')}
            label="Sobrenome"
            placeholder="Ex: Silva"
            error={errors.lastName?.message}
          />
        </div>

        <InputField
          {...register('email')}
          label="Email"
          type="email"
          placeholder="seu@email.com"
          error={errors.email?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="CPF"
            placeholder="000.000.000-00"
            value={cpfValue}
            onChange={handleCPFChange}
            error={errors.cpf?.message}
          />
          <InputField
            label="Telefone"
            placeholder="(11) 99999-9999"
            value={phoneValue}
            onChange={handlePhoneChange}
            error={errors.phone?.message}
          />
        </div>

        <InputField
          {...register('birthDate')}
          label="Data de Nascimento"
          type="date"
          error={errors.birthDate?.message}
        />

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-5 bg-brand-600 text-white font-black rounded-3xl shadow-xl shadow-brand-100 hover:bg-brand-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Cadastrar como Cliente'
          )}
        </motion.button>
      </form>

      <div className="my-10 flex items-center gap-4">
        <div className="h-px bg-slate-100 flex-1"></div>
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ou</span>
        <div className="h-px bg-slate-100 flex-1"></div>
      </div>

      <GoogleLoginButton onClick={onGoogleLogin} isLoading={isLoading} />

      <div className="mt-10 text-center">
        <p className="text-slate-500 font-medium">
          Já tem conta?{' '}
          <button
            onClick={() => {
              window.history.pushState({}, '', '/login-cliente');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="text-brand-600 font-black hover:underline underline-offset-4"
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
};
