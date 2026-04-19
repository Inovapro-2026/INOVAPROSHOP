import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { Camera, Shield, Calendar, Mail, Phone, CreditCard, Save, User } from 'lucide-react';
import { InputField } from '../../components/Auth/InputField';

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '(11) 98765-4321', // Mock or from user
    birthDate: '1995-05-15', // Mock or from user
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });
    
    setIsSaving(false);
    setIsEditing(false);
    setSuccessMessage('Perfil atualizado com sucesso!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-soft flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
          <div className="w-32 h-32 bg-brand-600 text-white rounded-[2.5rem] flex items-center justify-center text-5xl font-black shadow-xl ring-8 ring-brand-50">
            {user?.firstName?.charAt(0)}
          </div>
          <button className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-lg hover:scale-110 transition-transform">
            <Camera size={18} />
          </button>
        </div>
        
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              {user?.firstName} {user?.lastName}
            </h1>
            <span className="px-4 py-1.5 bg-brand-50 text-brand-600 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">
              Cliente Verificado
            </span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-400 font-bold text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} /> {user?.email}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} /> Membro desde Abr 2024
            </div>
          </div>
        </div>

        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          disabled={isSaving}
          className={cn(
            "px-8 py-4 rounded-[1.5rem] font-black transition-all flex items-center gap-3",
            isEditing 
             ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-100" 
             : "bg-slate-900 text-white hover:bg-slate-800 shadow-xl"
          )}
        >
          {isSaving ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isEditing ? (
            <>
              <Save size={18} /> Salvar Perfil
            </>
          ) : (
            'Editar Perfil'
          )}
        </button>
      </div>

      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl text-emerald-600 font-bold"
        >
          ✨ {successMessage}
        </motion.div>
      )}

      {/* Profile Details Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Data Card */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-soft">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <User size={20} />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Dados Pessoais</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Nome</p>
                {isEditing ? (
                  <input 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-brand-500" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                ) : (
                  <p className="text-lg font-bold text-slate-700 px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent">{user?.firstName}</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Sobrenome</p>
                {isEditing ? (
                  <input 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-brand-500" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                ) : (
                  <p className="text-lg font-bold text-slate-700 px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent">{user?.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Número de Telefone</p>
              {isEditing ? (
                <input 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-brand-500" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              ) : (
                <p className="text-lg font-bold text-slate-700 px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent">{formData.phone}</p>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Data de Nascimento</p>
              {isEditing ? (
                <input 
                  type="date"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold outline-none focus:border-brand-500" 
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                />
              ) : (
                <p className="text-lg font-bold text-slate-700 px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent">15 de Maio, 1995</p>
              )}
            </div>
          </div>
        </div>

        {/* Security / Identity Card */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-soft">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <Shield size={20} />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Identidade & Segurança</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">E-mail Principal</p>
              <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border-2 border-transparent">
                <p className="text-lg font-bold text-slate-700">{user?.email}</p>
                <span className="text-[8px] font-black bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full uppercase">Ativo</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">CPF (Protegido)</p>
              <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border-2 border-transparent">
                <p className="text-lg font-bold text-slate-700">***.456.789-**</p>
                <CreditCard size={16} className="text-slate-300" />
              </div>
            </div>

            <div className="pt-6">
              <div className="bg-brand-50 p-6 rounded-[2rem] border border-brand-100">
                <p className="text-xs font-bold text-brand-600 leading-relaxed">
                  Para alterar dados sensíveis como CPF ou E-mail, entre em contato com nosso <span className="underline font-black cursor-pointer">Suporte VIP</span> por questões de segurança.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { cn } from '../../lib/utils';
