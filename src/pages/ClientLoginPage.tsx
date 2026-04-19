import React from 'react';
import { LoginCard } from '../components/Auth/LoginCard';
import { LoginForm } from '../components/Auth/LoginForm';
import { GoogleLoginButton } from '../components/Auth/GoogleLoginButton';
import { SocialDivider } from '../components/Auth/SocialDivider';
import { motion } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const ClientLoginPage = () => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      
      const userData = {
        id: result.user.uid,
        email: result.user.email || '',
        firstName: result.user.displayName?.split(' ')[0] || 'Usuário',
        lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
        role: 'buyer' as const,
        avatar: result.user.photoURL || undefined
      };

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
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-grid-slate-100">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-600/5 to-transparent pointer-events-none"></div>
      
      <LoginCard 
        title="Acesse sua conta"
        subtitle="Entre para comprar produtos, contratar freelancers e gerenciar seus pedidos com segurança."
      >
        <LoginForm />
        
        <SocialDivider />
        
        <GoogleLoginButton onClick={handleGoogleLogin} />
      </LoginCard>
    </div>
  );
};
