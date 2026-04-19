import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Lock, 
  Bell, 
  Eye, 
  LogOut, 
  ShieldCheck, 
  Globe, 
  Moon, 
  Trash2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState('pessoal');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '(11) 98765-4321',
    notifications: {
      email: true,
      promotions: false,
      freelancerMessages: true
    },
    privacy: {
      publicProfile: true,
      allowContact: true
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    });
    setIsSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const sections = [
    { id: 'pessoal', label: 'Dados Pessoais', icon: <User size={20} /> },
    { id: 'seguranca', label: 'Segurança', icon: <Lock size={20} /> },
    { id: 'preferencias', label: 'Preferências', icon: <Bell size={20} /> },
    { id: 'privacidade', label: 'Privacidade', icon: <Eye size={20} /> },
    { id: 'conta', label: 'Gerenciar Conta', icon: <ShieldCheck size={20} /> },
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Configurações</h1>

      <div className="grid lg:grid-cols-4 gap-10">
        {/* Navigation Tab List */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all group font-bold text-sm tracking-tight",
                activeSection === section.id 
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-2" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-white"
              )}
            >
              <div className="flex items-center gap-4">
                <span className={cn("transition-colors", activeSection === section.id ? "text-white" : "text-slate-400 group-hover:text-slate-900")}>
                  {section.icon}
                </span>
                {section.label}
              </div>
              <ChevronRight size={16} className={cn("transition-opacity", activeSection === section.id ? "opacity-100" : "opacity-0")} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-100 shadow-soft"
            >
              {activeSection === 'pessoal' && (
                <div className="space-y-10">
                  <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-50">
                    <div className="w-20 h-20 bg-brand-600 text-white rounded-3xl flex items-center justify-center text-3xl font-black shadow-lg">
                      {user?.firstName?.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Informações de Perfil</h2>
                      <p className="text-slate-400 font-bold">Atualize seus dados básicos de identificação.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome</label>
                        <input 
                           className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none focus:border-brand-500 focus:bg-white transition-all" 
                           value={formData.firstName}
                           onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sobrenome</label>
                        <input 
                           className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none focus:border-brand-500 focus:bg-white transition-all" 
                           value={formData.lastName}
                           onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                        <input 
                           className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none focus:border-brand-500 focus:bg-white transition-all" 
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone</label>
                        <input 
                           className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-900 outline-none focus:border-brand-500 focus:bg-white transition-all" 
                           value={formData.phone}
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="flex justify-end pt-10">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-12 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center gap-3"
                    >
                      {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : success ? <CheckCircle2 size={24} className="text-emerald-400" /> : 'Salvar Alterações'}
                    </button>
                  </div>
                </div>
              )}

              {activeSection === 'seguranca' && (
                <div className="space-y-10">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Alterar Senha</h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha Atual</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold outline-none focus:border-brand-500 focus:bg-white transition-all" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nova Senha</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold outline-none focus:border-brand-500 focus:bg-white transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar Nova Senha</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold outline-none focus:border-brand-500 focus:bg-white transition-all" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl">Atualizar Senha</button>
                  </div>
                </div>
              )}

              {activeSection === 'preferencias' && (
                <div className="space-y-10">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Configurações de Notificação</h2>
                  <div className="space-y-4">
                    {[
                      { key: 'email', label: 'Receber atualizações por e-mail', desc: 'Alertas sobre compras e vendas' },
                      { key: 'promotions', label: 'Promoções e Novidades', desc: 'Novos talentos e cupons especiais' },
                      { key: 'freelancerMessages', label: 'Mensagens de Profissionais', desc: 'Ser notificado quando alguém te chamar' },
                    ].map((pref) => (
                      <label key={pref.key} className="flex items-center justify-between p-6 bg-slate-50 border-2 border-transparent hover:border-brand-500 rounded-3xl transition-all cursor-pointer group">
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">{pref.label}</p>
                          <p className="text-xs text-slate-400 font-medium">{pref.desc}</p>
                        </div>
                        <div className="relative inline-flex h-7 w-12 items-center rounded-full bg-slate-200 transition-colors group-hover:bg-slate-300">
                           <input type="checkbox" className="sr-only peer" defaultChecked={formData.notifications[pref.key as keyof typeof formData.notifications]} />
                           <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all peer-checked:translate-x-5 peer-checked:bg-brand-600"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Idioma da Interface</label>
                        <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold outline-none flex items-center gap-3">
                           <option>Português (Brasil)</option>
                           <option>English (USA)</option>
                           <option>Español</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tema Visual</label>
                        <div className="flex gap-4">
                           <button className="flex-1 p-4 bg-slate-900 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2">
                              <Moon size={14} /> Escuro
                           </button>
                           <button className="flex-1 p-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-xs flex items-center justify-center gap-2">
                              <Globe size={14} /> Claro
                           </button>
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {activeSection === 'privacidade' && (
                <div className="space-y-10">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Privacidade dos Dados</h2>
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem] flex items-start gap-6">
                      <ShieldCheck size={32} className="text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="font-black text-amber-700 tracking-tight text-lg mb-2">Seus dados estão protegidos</p>
                        <p className="text-amber-600/80 font-medium text-sm leading-relaxed">Nós utilizamos criptografia AES-256 e seguimos rigorosamente a LGPD para garantir que sua identidade e histórico financeiro nunca sejam expostos sem seu consentimento explícito.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-6 border-2 border-slate-100 rounded-3xl">
                        <div>
                          <p className="font-black text-slate-900">Perfil Público</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Permitir que outros vejam meu portfólio de compras</p>
                        </div>
                        <input type="checkbox" className="w-6 h-6 rounded-lg border-2 border-slate-200 text-brand-600 focus:ring-brand-500" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-6 border-2 border-slate-100 rounded-3xl">
                        <div>
                          <p className="font-black text-slate-900">Receber Contatos</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Permitir mensagens diretas de novos freelancers</p>
                        </div>
                        <input type="checkbox" className="w-6 h-6 rounded-lg border-2 border-slate-200 text-brand-600 focus:ring-brand-500" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'conta' && (
                <div className="space-y-10">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Zona de Risco</h2>
                  <div className="space-y-6">
                    <div className="p-8 border-2 border-slate-100 rounded-[2.5rem] flex items-center justify-between hover:border-slate-200 transition-all">
                      <div>
                        <p className="font-black text-slate-900 text-lg">Desativar Conta Temporariamente</p>
                        <p className="text-slate-400 font-medium text-sm">Seus dados serão preservados, mas seu perfil não ficará visível.</p>
                      </div>
                      <button className="px-8 py-3 bg-slate-100 text-slate-600 font-black rounded-xl text-xs hover:bg-slate-200 transition-all">Desativar</button>
                    </div>

                    <div className="p-8 border-2 border-red-50 bg-red-50/20 rounded-[2.5rem] flex items-center justify-between">
                      <div>
                        <p className="font-black text-red-600 text-lg flex items-center gap-3">
                           Excluir Conta Permanentemente <Trash2 size={20} />
                        </p>
                        <p className="text-red-400 font-medium text-sm max-w-md">Esta ação é irreversível. Todas as suas compras, histórico e saldo serão perdidos após 30 dias se o processo não for cancelado.</p>
                      </div>
                      <button className="px-8 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-100 hover:bg-red-700 transition-all">Excluir Agora</button>
                    </div>

                    <div className="h-px bg-slate-50 my-8"></div>

                    <button 
                      onClick={() => logout()}
                      className="w-full py-6 border-4 border-slate-100 text-slate-500 rounded-[2.5rem] font-black text-lg hover:border-brand-600 hover:text-brand-600 transition-all flex items-center justify-center gap-4"
                    >
                      <LogOut size={24} /> Encerrar Sessão em Todos Dispositivos
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
