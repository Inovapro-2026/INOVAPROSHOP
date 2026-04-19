import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../blogData';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BlogCard } from '../components/Cards';

const SEO = ({ title, description }: { title: string; description: string }) => {
  useEffect(() => {
    document.title = `${title} | FreelancePro`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [title, description]);
  return null;
};

export const BlogListPage = () => {
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Blog: Dicas de Freelance e Produtos Digitais" 
        description="Aprenda a ganhar dinheiro online, como contratar os melhores freelancers e as tendências do mercado digital em 2026." 
      />
      
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-3xl">
              <span className="text-brand-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">Central de Conhecimento</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                Onde a <span className="bg-gradient-to-r from-brand-600 to-accent-purple bg-clip-text text-transparent">estratégia</span> encontra o lucro.
              </h1>
            </div>
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogPostPage = ({ slug }: { slug: string }) => {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  
  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!post) return <div className="pt-40 text-center font-black">Post não encontrado.</div>;

  return (
    <div className="bg-white min-h-screen">
      <SEO title={post.title} description={post.excerpt} />
      
      <article className="pt-40 max-w-4xl mx-auto px-6">
        <motion.header 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <button 
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-brand-600 transition-colors mb-12"
          >
            <ArrowLeft size={16} /> Voltar ao Blog
          </button>
          
          <div className="flex gap-4 mb-8">
            <span className="px-6 py-2 bg-slate-50 text-brand-600 font-black text-xs rounded-full border border-slate-100 italic uppercase">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[1.1] mb-10">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between border-y border-slate-100 py-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-white shadow-soft overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt="Author" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Publicado por</p>
                <p className="font-bold text-slate-900">{post.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-12 text-slate-400 font-bold text-xs uppercase tracking-widest hidden sm:flex">
                <span className="flex items-center gap-2"><Calendar size={18} /> {post.date}</span>
                <span className="flex items-center gap-2"><Clock size={18} /> {post.readTime} de leitura</span>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-brand-50 transition-all text-slate-400 hover:text-brand-600">
              <Share2 size={20} />
            </button>
          </div>
        </motion.header>

        <motion.figure 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-16 -mx-6 md:-mx-12 lg:-mx-20"
        >
          <img src={post.image} alt={post.title} className="w-full h-auto md:rounded-[4rem] shadow-premium" />
        </motion.figure>

        <div 
          className="prose prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-blockquote:border-l-brand-600 prose-blockquote:bg-brand-50/30 prose-blockquote:py-8 prose-blockquote:px-12 prose-blockquote:rounded-r-3xl prose-blockquote:not-italic prose-blockquote:font-bold prose-strong:text-slate-900 mb-24"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post Footer CTA */}
        <div className="p-12 md:p-16 bg-slate-900 rounded-[3.5rem] text-white relative overflow-hidden mb-24 group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-4xl font-black tracking-tighter mb-6 leading-tight">Gostou do conteúdo? <br/><span className="text-brand-400 italic">Aplique isso agora mesmo.</span></h3>
            <p className="text-slate-400 text-lg font-medium mb-10">Junte-se a milhares de profissionais que estão escalando seus negócios digitais no FreelancePro.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/login-vendedor')}
                className="bg-brand-600 hover:bg-brand-700 text-white px-10 py-5 rounded-[1.8rem] font-black text-lg transition-all shadow-lg shadow-brand-950/20 active:scale-95"
              >
                Começar a Vender
              </button>
              <button 
                onClick={() => navigate('/explorar')}
                className="bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-[1.8rem] font-black text-lg transition-all border border-white/10"
              >
                Explorar Categorias
              </button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};
