import React from 'react';
import { Award, Github, Instagram, Twitter, Linkedin, Send, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const Footer = () => {
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      title: "Sobre a Plataforma",
      links: [
        { label: "O que é o FreelancePro", href: "/sobre" },
        { label: "Como funciona", href: "/#how-it-works" },
        { label: "Segurança", href: "/seguranca" },
        { label: "Taxas", href: "/taxas" },
      ]
    },
    {
      title: "Para Clientes",
      links: [
        { label: "Explorar serviços", href: "/explorar" },
        { label: "Categorias", href: "/categorias" },
        { label: "Como contratar", href: "/como-contratar" },
        { label: "Suporte ao cliente", href: "/suporte" },
      ]
    },
    {
      title: "Para Vendedores",
      links: [
        { label: "Seja um vendedor", href: "/quero-vender" },
        { label: "Como vender", href: "/como-vender" },
        { label: "Dicas para freelancers", href: "/blog/freelancer" },
        { label: "Central do vendedor", href: "/dashboard/seller" },
      ]
    },
    {
      title: "Categorias Populares",
      links: [
        { label: "Programação", href: "/categoria/programacao" },
        { label: "Design", href: "/categoria/design" },
        { label: "Marketing", href: "/categoria/marketing" },
        { label: "IA e Automação", href: "/categoria/ia" },
        { label: "Produtos Digitais", href: "/categoria/produtos" },
      ]
    }
  ];

  return (
    <footer className="bg-slate-950 pt-24 pb-12 px-6 text-white overflow-hidden relative border-t border-white/5">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 blur-[120px] rounded-full -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-6 gap-12 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="bg-brand-600 p-2 rounded-xl text-white shadow-lg shadow-brand-900/20 group-hover:scale-110 transition-transform">
                <Award size={24} />
              </div>
              <span className="text-3xl font-black tracking-tighter">FreelancePro</span>
            </div>
            <p className="text-slate-400 max-w-sm font-medium leading-relaxed mb-10 text-lg">
              A forma mais simples de comprar e vender serviços digitais no Brasil.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Twitter size={20} />, href: "#" },
                { icon: <Instagram size={20} />, href: "#" },
                { icon: <Linkedin size={20} />, href: "#" },
                { icon: <Github size={20} />, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-600 hover:-translate-y-1 transition-all border border-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Blocks */}
          <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-4 gap-12">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-black uppercase tracking-widest text-[10px] text-brand-400 mb-8 border-b border-brand-400/20 pb-2 inline-block">
                  {section.title}
                </h4>
                <div className="flex flex-col gap-4">
                  {section.links.map((link, lIdx) => (
                    <button 
                      key={lIdx}
                      onClick={() => navigate(link.href)}
                      className="text-slate-400 hover:text-white transition-colors text-left font-semibold text-sm hover:translate-x-1 transition-transform"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter & Featured Resources */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20 p-12 bg-white/5 rounded-[3rem] border border-white/5 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/5 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-600/10 transition-colors"></div>
          
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-black tracking-tighter mb-4">Mantenha-se à frente do mercado.</h3>
            <p className="text-slate-400 font-medium mb-8">Receba dicas exclusivas para ganhar dinheiro online e novidades do mundo freelancer diretamente no seu e-mail.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                />
              </div>
              <button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-brand-900/20 transition-all active:scale-95 whitespace-nowrap">
                Inscrever-se <Send size={18} />
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <h4 className="font-black uppercase tracking-widest text-[10px] text-brand-400">Recursos em Destaque</h4>
            {[
              { label: "Blog do FreelancePro", href: "/blog" },
              { label: "Guia: Como ganhar dinheiro online", href: "/blog/como-ganhar-dinheiro-online" },
              { label: "Ideias de produtos digitais", href: "/blog/ideias-produtos-digitais" },
            ].map((res, i) => (
              <button 
                key={i} 
                onClick={() => navigate(res.href)}
                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group/res"
              >
                <span className="font-bold text-sm">{res.label}</span>
                <ArrowRight size={16} className="text-brand-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              © 2026 FreelancePro • CNPJ 00.000.000/0001-00
            </p>
            <div className="flex gap-6">
              <button onClick={() => navigate('/termos')} className="text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Termos</button>
              <button onClick={() => navigate('/privacidade')} className="text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Privacidade</button>
              <button onClick={() => navigate('/cookies')} className="text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Cookies</button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Sistemas operacionais e seguros
          </div>
        </div>
      </div>
    </footer>
  );
};
