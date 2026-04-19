import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { Award, ShieldCheck, Zap, Heart } from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const RegisterClientPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userData = {
        id: result.user.uid,
        email: result.user.email || '',
        firstName: result.user.displayName?.split(' ')[0] || 'Usuário',
        lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
        role: 'buyer' as const,
        avatar: result.user.photoURL || undefined
      };

      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          ...userData,
          createdAt: serverTimestamp()
        });
      }

      login(userData);
      window.history.pushState({}, '', '/vitrine');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleManualRegister = async (data: any) => {
    setLoading(true);
    try {
      // Simulate API call for user creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'buyer' as const,
      };

      // In real scenario, we would save to Firestore here
      // await setDoc(doc(db, "users", userData.id), { ...userData, createdAt: serverTimestamp() });

      login(userData);
      
      // Direct redirection to vitrine
      window.history.pushState({}, '', '/vitrine');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-grid-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full grid lg:grid-cols-2 bg-white rounded-[4rem] shadow-premium border border-slate-100 overflow-hidden"
      >
        {/* Left Side: Branding and Benefits */}
        <div className="hidden lg:flex flex-col justify-between p-20 bg-brand-600 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-white p-2 rounded-xl text-brand-600 shadow-xl">
                <Award size={32} />
              </div>
              <span className="text-2xl font-black tracking-tight">FreelancePro</span>
            </div>
            
            <h1 className="text-5xl font-black leading-[1.1] tracking-tighter mb-8">
              Sua jornada para o sucesso começa aqui.
            </h1>
            
            <p className="text-brand-100 text-lg font-medium mb-12 opacity-80">
              Junte-se à maior rede de talentos profissionais. Compre com segurança e receba qualidade garantida.
            </p>

            <ul className="space-y-6">
              {[
                { icon: ShieldCheck, text: 'Pagamento 100% Protegido' },
                { icon: Zap, text: 'Entrega em Tempo Recorde' },
                { icon: Heart, text: 'Suporte VIP Integrado' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 font-bold">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <item.icon size={20} className="text-white" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 pt-12 border-t border-white/10 text-brand-200 font-bold text-sm">
            © 2024 FreelancePro Marketplace. Todos os direitos reservados.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-12 md:p-16">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Crie sua conta</h2>
            <p className="text-slate-500 font-medium">
              Cadastre-se para comprar produtos, contratar freelancers e acompanhar seus pedidos com segurança.
            </p>
          </div>

          <RegisterForm 
            onRegister={handleManualRegister} 
            onGoogleLogin={handleGoogleLogin} 
            isLoading={loading}
          />
        </div>
      </motion.div>
    </div>
  );
};
