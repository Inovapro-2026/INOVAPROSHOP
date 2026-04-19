import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { 
  LogIn, 
  ShoppingBag, 
  Package, 
  User as UserIcon, 
  LayoutDashboard, 
  TrendingUp, 
  Plus, 
  Search,
  CheckCircle,
  Clock,
  ExternalLink,
  Github,
  Award,
  Zap,
  ShieldCheck,
  Users,
  Star,
  ArrowRight,
  Code,
  Palette,
  Megaphone,
  Cpu,
  Video,
  Monitor,
  Download,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { auth, db } from "./lib/firebase";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "./lib/utils";

import { BlogListPage, BlogPostPage } from "./pages/BlogPages";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { VitrinePage, FreelasPage } from "./pages/CatalogPages";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { RegisterClientPage } from "./pages/RegisterClientPage";
import { ClientLoginPage } from "./pages/ClientLoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ClientLayout } from "./components/Client/ClientLayout";
import { ProfilePage } from "./pages/Client/ProfilePage";
import { CartPage } from "./pages/Client/CartPage";
import { OrdersPage } from "./pages/Client/OrdersPage";
import { NotificationsPage } from "./pages/Client/NotificationsPage";
import { MessagesPage } from "./pages/Client/MessagesPage";
import { FavoritesPage } from "./pages/Client/FavoritesPage";
import { SettingsPage } from "./pages/Client/SettingsPage";
import { WalletPage } from "./pages/Client/WalletPage";
import { HistoryPage } from "./pages/Client/HistoryPage";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Components ---

// --- Customer View Components ---

const Hero = () => {
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-50/50 -z-10 blur-3xl opacity-50 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-accent-blue/10 -z-10 blur-3xl opacity-50 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 text-brand-700 text-xs font-bold rounded-full mb-8 shadow-sm">
            <Users size={14} />
            <span>MAIS DE 10.000 FREELANCERS VERIFICADOS</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.95] mb-8">
            Encontre o talento certo em <span className="text-brand-600 bg-gradient-to-r from-brand-600 to-accent-purple bg-clip-text text-transparent">segundos.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-xl font-medium">
            O marketplace de elite para serviços freelancers e produtos digitais. Pague apenas pelo que receber com a maior segurança do Brasil.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button onClick={() => navigate('/login-cliente')} className="bg-brand-600 text-white px-10 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-brand-200 hover:bg-brand-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2">
              Contratar Agora
              <ArrowRight size={20} />
            </button>
            <button className="bg-white text-slate-900 px-10 py-5 rounded-3xl font-black text-lg border-2 border-slate-100 hover:border-brand-100 hover:bg-brand-50 transition-all flex items-center justify-center gap-2">
              Explorar Serviços
            </button>
          </div>
          <div className="mt-12 flex items-center gap-4 text-slate-400 font-bold text-sm tracking-tight">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/customer${i}/200/200`} className="w-10 h-10 rounded-full border-4 border-white shadow-soft" alt="User" />
              ))}
            </div>
            <span>Aprovado por gestores de startups unicórnio.</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 p-4 bg-white/50 backdrop-blur-md rounded-[3.5rem] border border-white/20 shadow-2xl overflow-hidden">
            <img 
              src="https://picsum.photos/seed/studio/1200/1000" 
              className="rounded-[3rem] shadow-premium" 
              alt="Plataforma" 
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating cards */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-12 -right-8 glass-card p-6 rounded-3xl z-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-lg"><Monitor size={24} /></div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Dev Ativo</p>
                <p className="font-bold text-slate-900 leading-none">Frontend React</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -bottom-8 -left-8 glass-card p-6 rounded-3xl z-20"
          >
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"><CheckCircle size={24} /></div>
                <div>
                   <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Segurança</p>
                   <p className="font-bold text-slate-900 leading-none">Checkout Verificado</p>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const CategoriesList = () => {
  const cats = [
    { name: "Design", icon: <Palette size={32} />, color: "bg-pink-50 text-pink-600" },
    { name: "Coding", icon: <Code size={32} />, color: "bg-indigo-50 text-indigo-600" },
    { name: "Marketing", icon: <Megaphone size={32} />, color: "bg-blue-50 text-blue-600" },
    { name: "IA & Auto", icon: <Cpu size={32} />, color: "bg-amber-50 text-amber-600" },
    { name: "Vídeo", icon: <Video size={32} />, color: "bg-emerald-50 text-emerald-600" }
  ];
  return (
    <div className="py-20 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {cats.map((c, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100 flex flex-col items-center gap-6 cursor-pointer transition-all hover:bg-brand-50/30 group"
            >
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center shadow-sm transition-transform group-hover:rotate-12", c.color)}>
                {c.icon}
              </div>
              <span className="font-bold text-slate-900 text-lg">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MarketplaceCatalog = () => {
  const products: any[] = [];

  return (
    <div id="marketplace" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 px-4">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Escolha entre o melhor.</h2>
            <p className="text-lg text-slate-500 font-medium">Filtramos os melhores freelancers para que você não precise se preocupar.</p>
          </div>
          <div className="flex gap-4 p-2 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-2xl shadow-sm text-slate-900 font-bold text-sm">
                <Filter size={16} /> Filtros
             </button>
             <button className="hidden sm:block px-6 py-2.5 text-slate-400 font-bold text-sm hover:text-slate-600">Preço</button>
             <button className="hidden sm:block px-6 py-2.5 text-slate-400 font-bold text-sm hover:text-slate-600">Avaliação</button>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all group cursor-pointer"
              >
                <div className="relative h-56 bg-slate-100 rounded-[1.8rem] mb-6 overflow-hidden">
                  <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-slate-900 tracking-widest uppercase shadow-sm">
                      {p.badge}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                   <div className="flex text-amber-400 fill-amber-400">
                      <Star size={14} /> <Star size={14} /> <Star size={14} /> <Star size={14} /> <Star size={14} />
                   </div>
                   <span className="text-xs font-bold text-slate-400">{p.rating}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-xl leading-tight mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 font-medium mb-6">por <span className="text-slate-600 font-bold">{p.author}</span></p>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">A partir de</p>
                      <p className="text-2xl font-black text-brand-600 leading-none">R$ {p.price}</p>
                   </div>
                   <button className="bg-brand-600 text-white p-4 rounded-2xl hover:bg-brand-700 shadow-lg shadow-brand-100 transition-all active:scale-90">
                     <ShoppingBag size={20} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
            <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-soft flex items-center justify-center mb-6 text-slate-300">
               <Package size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Nenhum talento encontrado</h3>
            <p className="text-slate-500 font-medium max-w-sm">Estamos limpando os dados de teste para preparar a entrada de profissionais reais.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Encontre o Serviço", desc: "Navegue por centenas de categorias ou busque pelo talento ideal.", icon: <Search size={32} /> },
    { title: "Compre com Segurança", desc: "Seu dinheiro fica protegido em escrow. O vendedor só recebe após sua aprovação.", icon: <ShieldCheck size={32} /> },
    { title: "Receba o Resultado", desc: "Acompanhe tudo pelo chat e baixe seus arquivos ou receba o serviço finalizado.", icon: <Download size={32} /> }
  ];
  return (
    <div id="how-it-works" className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-accent-purple"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-5xl font-black tracking-tighter mb-6">Como o FreelancePro funciona.</h2>
          <p className="text-slate-400 text-lg">Sem burocracia, sem estresse. Apenas resultados de alto nível.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:scale-110 transition-all duration-500">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">0{i+1}. {s.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed px-6">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Benefits = ({ isSeller = false }) => {
  const customerBenefits = [
    { title: "Zero Mensalidade", desc: "Crie sua conta e explore gratuitamente. Pague taxas apenas em compras.", icon: <Clock /> },
    { title: "Escrow Automático", desc: "Liberação do pagamento somente após você aprovar a entrega final.", icon: <ShieldCheck /> },
    { title: "Verificado pela Pro", desc: "Freelancers passam por triagem rigorosa de qualidade e prazos.", icon: <Award /> }
  ];
  const sellerBenefits = [
    { title: "Plataforma Grátis", desc: "Anuncie serviços e produtos sem custos mensais. Taxa fixa de venda.", icon: <TrendingUp /> },
    { title: "Pagamentos Ágeis", desc: "Receba seus ganhos de forma automatizada via Mercado Pago.", icon: <Zap /> },
    { title: "Suporte VIP", desc: "Time dedicado para ajudar você a escalar suas vendas digitais.", icon: <Users /> }
  ];
  const data = isSeller ? sellerBenefits : customerBenefits;
  return (
    <div className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {data.map((b, i) => (
          <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col gap-6 hover:shadow-premium transition-all">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center shadow-lg">
               {React.cloneElement(b.icon as React.ReactElement, { size: 28 })}
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{b.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Seller View Landing Page ---

const SellerLanding = () => {
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 text-xs font-bold rounded-full mb-8 uppercase tracking-widest">
            SUA LOJA DIGITAL EM MINUTOS
          </span>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.95] mb-8 max-w-4xl mx-auto">
             Transforme seu <span className="text-brand-600">talento</span> em renda recorrente.
          </h1>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
             Venda serviços freelancers ou produtos digitais (Ebooks, Templates, Cursos) sem mensalidade e com checkout automático.
          </p>
          <button onClick={() => navigate('/login-vendedor')} className="bg-brand-600 text-white px-12 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-brand-200 hover:bg-brand-700 hover:-translate-y-1 transition-all">
            Começar a Vender Agora
          </button>
        </motion.div>
      </div>

      <Benefits isSeller={true} />

      <div className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="bg-white p-12 rounded-[3.5rem] shadow-premium border border-slate-100">
             <h3 className="text-3xl font-black mb-8 text-slate-900">Simulação de Ganhos</h3>
             <div className="space-y-8">
               <div className="flex justify-between items-end">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Valor da Venda</span>
                  <span className="text-3xl font-black text-slate-900">R$ 100,00</span>
               </div>
               <div className="flex justify-between items-end text-red-500">
                  <span className="font-bold uppercase tracking-widest text-xs opacity-70">Taxa FreelancePro (10%)</span>
                  <span className="text-lg font-bold">- R$ 10,00</span>
               </div>
               <div className="h-px bg-slate-100"></div>
               <div className="flex justify-between items-end text-emerald-600">
                  <span className="font-bold uppercase tracking-widest text-xs">Você recebe líquido</span>
                  <span className="text-5xl font-black">R$ 90,00</span>
               </div>
               <p className="text-center text-xs text-slate-400 py-4">* Sem mensalidades. Sem taxas escondidas. Você só paga quando vende.</p>
             </div>
          </div>
          <div>
             <h2 className="text-5xl font-black tracking-tighter mb-8 leading-tight">Vender nunca foi tão tecnológico e simples.</h2>
             <div className="space-y-8">
                {[
                  { t: "Crie seu perfil profissional", d: "Monte seu portfólio em minutos com nossa interface moderna." },
                  { t: "Publique seus Gig's ou Arquivos", d: "Aceitamos qualquer formato digital ou proposta de serviço." },
                  { t: "Receba pedidos no Automático", d: "Ficamos responsáveis por todo o processamento de pagamento." }
                ].map((x, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-black flex-shrink-0">{i+1}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">{x.t}</h4>
                      <p className="text-slate-500 font-medium">{x.d}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="py-32 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto bg-brand-600 p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
          <h2 className="text-5xl font-black tracking-tighter mb-8 relative z-10">Pronto para sua nova fonte de renda?</h2>
          <button onClick={() => navigate('/login-vendedor')} className="bg-white text-brand-600 px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all relative z-10 shadow-lg">
             Quero Abrir Minha Loja
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Core App Logic ---

const PlaceholderPage = ({ title }: { title: string }) => {
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto text-center py-20">
        <h1 className="text-6xl font-black tracking-tighter mb-8">{title}</h1>
        <p className="text-xl text-slate-500 mb-12">Esta página está em construção para ser um hub de alto nível.</p>
        <button onClick={() => navigate('/')} className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-black">
          Voltar para Home
        </button>
      </div>
      <Footer />
    </div>
  );
};

const LoginPage = ({ role }: { role: 'buyer' | 'seller' | 'admin', key?: string }) => {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: role,
          createdAt: serverTimestamp()
        });
      }
      window.location.href = `/dashboard/${role}`;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 bg-grid-slate-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-premium max-w-md w-full text-center border border-slate-100 relative"
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 transition-transform hover:scale-110">
          <div className="w-24 h-24 bg-brand-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-200">
            <Award size={48} />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">
            {role === 'seller' ? 'Venda sua expertise' : 'Contrate como Pro'}
          </h2>
          <p className="text-slate-500 mb-10 font-medium leading-relaxed">
            Faça login e junte-se à maior comunidade de freelancers certificados do Brasil.
          </p>
          <button onClick={handleLogin} className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl flex items-center justify-center gap-4 hover:shadow-2xl transition-all active:scale-95 shadow-lg group">
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
            Continuar com Google
          </button>
          
          <div className="mt-10 pt-8 border-t border-slate-50">
            <p className="text-slate-500 font-medium">
              Não tem uma conta?{' '}
              <button 
                onClick={() => {
                  window.history.pushState({}, '', role === 'seller' ? '/login-vendedor' : '/register-cliente');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="text-brand-600 font-black hover:underline underline-offset-4"
              >
                {role === 'seller' ? 'Torne-se Vendedor' : 'Criar Conta Grátis'}
              </button>
            </p>
          </div>
          <p className="mt-8 text-[10px] font-black tracking-widest text-slate-300 uppercase leading-none">Proteção por criptografia de ponta a ponta</p>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ role }: { role: 'seller' | 'buyer', key?: string }) => {
  const { userProfile, user } = useAuth();
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
         <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-brand-600 p-1.5 rounded-lg text-white"><Award size={20} /></div>
            <span className="font-bold">FreelancePro</span>
         </div>
         <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400 hidden sm:inline">{user?.email}</span>
            <button onClick={() => signOut(auth)} className="p-2 text-slate-400 hover:text-red-500"><LogIn size={20} /></button>
         </div>
      </nav>
      
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
           <div>
              <p className="text-brand-600 font-black text-[10px] uppercase tracking-widest mb-2">Seja bem-vindo</p>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                 Olá, {user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase() : 'Bem-vindo'}!
              </h1>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-8 py-4 bg-white border border-slate-200 rounded-3xl font-black text-slate-900 shadow-soft hover:bg-slate-50 transition-all">
                {role === 'seller' ? 'Meus Produtos' : 'Mensagens'}
              </button>
              <button className="flex-1 md:flex-none px-8 py-4 bg-brand-600 text-white rounded-3xl font-black shadow-lg shadow-brand-100 hover:bg-brand-700 transition-all">
                {role === 'seller' ? 'Criar Anúncio' : 'Explorar'}
              </button>
           </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft">
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">Volume Operado</p>
              <h3 className="text-5xl font-black text-slate-900 tracking-tighter">R$ 0<span className="text-slate-300">,00</span></h3>
           </div>
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft">
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">Reputação</p>
              <div className="flex items-center gap-2">
                 <div className="flex text-amber-400 fill-amber-400"><Star size={24} /></div>
                 <h3 className="text-5xl font-black text-slate-900 tracking-tighter">0.0</h3>
              </div>
           </div>
           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft">
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">Atividades</p>
              <h3 className="text-5xl font-black text-brand-600 tracking-tighter">0</h3>
           </div>
        </div>
        
        <div className="mt-12 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-soft">
           <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                <Clock size={24} />
              </div>
              <h2 className="text-3xl font-black tracking-tighter">Seu Histórico</h2>
           </div>
           <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
                 <Search size={32} />
              </div>
              <p className="text-slate-400 font-bold text-lg">Nada por aqui ainda.</p>
              <p className="text-slate-300 text-sm">Suas transações recentes aparecerão aqui.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

import { 
  BrowserRouter,
  Routes, 
  Route, 
  Navigate,
  useLocation
} from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { ProtectedAdminRoute } from "./components/Admin/ProtectedAdminRoute";
import { AdminLayout } from "./components/Admin/AdminLayout";
import { AdminLoginPage } from "./pages/Admin/AdminLoginPage";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { BannerManagement } from "./pages/Admin/BannerManagement";
import { AnnouncementManagement } from "./pages/Admin/AnnouncementManagement";

const HomePage = () => (
  <motion.div key="customer-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Navbar />
    <Hero />
    <CategoriesList />
    <MarketplaceCatalog />
    <HowItWorks />
    <Benefits />
    <div className="py-32 px-6 flex justify-center">
        <motion.div whileHover={{ scale: 1.02 }} className="max-w-4xl w-full bg-brand-600 rounded-[4rem] p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-6xl font-black tracking-tighter mb-8 relative z-10">Sua próxima grande entrega começa aqui.</h2>
          <a href="/login-cliente" className="inline-block bg-white text-brand-600 px-12 py-6 rounded-3xl font-black text-xl hover:shadow-2xl transition-all relative z-10">
              Começar Gratuitamente
          </a>
        </motion.div>
    </div>
    <Footer />
  </motion.div>
);

export default function App() {
  useEffect(() => {
    // Smooth scroll polyfill for safari etc.
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <BrowserRouter>
      <AdminProvider>
        <AuthProvider>
          <div className="min-h-screen bg-white">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/quero-vender" element={
                  <motion.div key="seller-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Navbar />
                    <SellerLanding />
                    <Footer />
                  </motion.div>
                } />
                <Route path="/blog" element={
                  <motion.div key="blog-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Navbar />
                    <BlogListPage />
                    <Footer />
                  </motion.div>
                } />
                <Route path="/blog/:slug" element={<BlogPostWithNavbar />} />
                <Route path="/vitrine" element={
                  <motion.div key="vitrine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Navbar />
                    <VitrinePage />
                    <Footer />
                  </motion.div>
                } />
                <Route path="/vitrine/:slug" element={<ProductDetailWithMotion />} />
                <Route path="/freelas" element={
                  <motion.div key="freelas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Navbar />
                    <FreelasPage />
                    <Footer />
                  </motion.div>
                } />

                {/* Placeholders */}
                <Route path="/explorar" element={<PlaceholderPage title="Explorar Marketplace" />} />
                <Route path="/categoria/:cat" element={<PlaceholderPage title="Explorar Marketplace" />} />
                <Route path="/categorias" element={<PlaceholderPage title="Todas as Categorias" />} />
                <Route path="/sobre" element={<PlaceholderPage title="Sobre Nós" />} />
                <Route path="/suporte" element={<PlaceholderPage title="Suporte ao Cliente" />} />
                <Route path="/como-contratar" element={<PlaceholderPage title="Como Contratar" />} />
                <Route path="/como-vender" element={<PlaceholderPage title="Como Vender Seu Talento" />} />
                <Route path="/seguranca" element={<PlaceholderPage title="Segurança e Escrow" />} />
                <Route path="/taxas" element={<PlaceholderPage title="Transparência de Taxas" />} />
                <Route path="/termos" element={<PlaceholderPage title="Termos de Uso" />} />
                <Route path="/privacidade" element={<PlaceholderPage title="Política de Privacidade" />} />
                <Route path="/cookies" element={<PlaceholderPage title="Uso de Cookies" />} />

                {/* Login Routes */}
                <Route path="/login-cliente" element={<ClientLoginPage />} />
                <Route path="/login-vendedor" element={<LoginPage role="seller" />} />
                <Route path="/register-cliente" element={<RegisterClientPage />} />
                <Route path="/register" element={<Navigate to="/register-cliente" replace />} />
                
                {/* Dashboards Redirects */}
                <Route path="/dashboard/buyer" element={<Navigate to="/vitrine" replace />} />
                <Route path="/dashboard/seller" element={<Dashboard role="seller" />} />

                 {/* Client Area Routes */}
                <Route path="/cliente/*" element={
                  <ProtectedRoute allowedRoles={['buyer']}>
                    <ClientLayout>
                      <Routes>
                        <Route path="perfil" element={<ProfilePage />} />
                        <Route path="carrinho" element={<CartPage />} />
                        <Route path="pedidos" element={<OrdersPage />} />
                        <Route path="notificacoes" element={<NotificationsPage />} />
                        <Route path="mensagens" element={<MessagesPage />} />
                        <Route path="favoritos" element={<FavoritesPage />} />
                        <Route path="configuracoes" element={<SettingsPage />} />
                        <Route path="carteira" element={<WalletPage />} />
                        <Route path="historico" element={<HistoryPage />} />
                        <Route path="*" element={<Navigate to="perfil" replace />} />
                      </Routes>
                    </ClientLayout>
                  </ProtectedRoute>
                } />

                {/* Legacy / Compatibility Redirects */}
                <Route path="/carrinho" element={<Navigate to="/cliente/carrinho" replace />} />
                <Route path="/pedidos" element={<Navigate to="/cliente/pedidos" replace />} />
                <Route path="/notificacoes" element={<Navigate to="/cliente/notificacoes" replace />} />
                <Route path="/mensagens" element={<Navigate to="/cliente/mensagens" replace />} />
                <Route path="/favoritos" element={<Navigate to="/cliente/favoritos" replace />} />
                <Route path="/configuracoes" element={<Navigate to="/cliente/configuracoes" replace />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />
                <Route path="/admin/banners" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <BannerManagement />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />
                <Route path="/admin/anuncios" element={
                  <ProtectedAdminRoute>
                    <AdminLayout>
                      <AnnouncementManagement />
                    </AdminLayout>
                  </ProtectedAdminRoute>
                } />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </div>
        </AuthProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}

const BlogPostWithNavbar = () => {
  const { slug } = useParams() as { slug: string };
  return (
    <motion.div key="blog-post" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <BlogPostPage slug={slug} />
    </motion.div>
  );
};

const ProductDetailWithMotion = () => {
  const { slug } = useParams() as { slug: string };
  return (
    <motion.div key="product-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ProductDetailPage slug={slug} />
    </motion.div>
  );
};

import { useParams } from "react-router-dom";
