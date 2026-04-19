import React, { useState, useEffect } from 'react';
import { 
    Star, 
    Heart, 
    ShieldCheck, 
    Zap, 
    ArrowLeft, 
    ShoppingBag, 
    Clock, 
    MessageCircle, 
    Download,
    Share2,
    CheckCircle2,
    Lock,
    Globe,
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VITRINE_PRODUCTS, Product } from '../vitrineData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumbs } from '../components/Vitrine/VitrineComponents';
import { cn } from '../lib/utils';

export const ProductDetailPage = ({ slug }: { slug: string }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const product = VITRINE_PRODUCTS.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!product) return <div className="pt-40 text-center font-black">Produto não encontrado.</div>;

    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const breadcrumbs = [
        { label: 'Início', href: '/' },
        { label: 'Vitrine', href: '/vitrine' },
        { label: product.category, href: `/vitrine?category=${product.category}` },
        { label: product.title }
    ];

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            
            <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
                <Breadcrumbs items={breadcrumbs} />

                <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* Image Gallery Column */}
                    <div className="lg:col-span-1 flex flex-col gap-4 mt-2">
                        {product.images.map((img, i) => (
                            <button 
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={cn(
                                    "w-16 h-16 rounded-xl overflow-hidden border-2 transition-all",
                                    selectedImage === i ? "border-brand-600 shadow-lg scale-105" : "border-slate-100 opacity-60 hover:opacity-100"
                                )}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    <div className="lg:col-span-6">
                        <motion.div 
                            layoutId="product-image"
                            className="w-full aspect-square rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-soft bg-slate-50 relative group"
                        >
                            <img 
                                src={product.images[selectedImage]} 
                                alt={product.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-8 left-8">
                                <span className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black text-slate-900 tracking-widest uppercase shadow-xl">
                                    Imagens Reais do Produto
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Pricing & Actions Column */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-premium sticky top-32">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-400 fill-amber-400"><Star size={16} /></div>
                                    <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                                    <span className="text-sm text-slate-400 font-medium">({product.reviewsCount} reviews)</span>
                                </div>
                                <button className="text-slate-300 hover:text-red-500 transition-colors">
                                    <Heart size={24} />
                                </button>
                            </div>

                            <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4 tracking-tighter uppercase">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-4 mb-10">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                                    {product.category}
                                </span>
                                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                                    {product.sales} Vendas realizadas
                                </span>
                            </div>

                            <div className="mb-12">
                                {product.originalPrice && (
                                    <p className="text-lg text-slate-400 line-through font-bold mb-2">R$ {product.originalPrice}</p>
                                )}
                                <div className="flex items-end gap-4">
                                    <p className="text-6xl font-black text-slate-900 leading-none">R$ {product.price}</p>
                                    <span className="text-emerald-500 font-black text-lg mb-1">{product.discount}% OFF</span>
                                </div>
                                <p className="text-slate-400 text-xs font-bold mt-4 uppercase tracking-widest">Até 12x no cartão via Mercado Pago</p>
                            </div>

                            <div className="space-y-4 mb-12">
                                <button className="w-full bg-brand-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-brand-200 hover:bg-brand-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3">
                                    Comprar Agora <ShoppingBag size={24} />
                                </button>
                                <button className="w-full bg-white border-2 border-slate-100 text-slate-900 py-6 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all active:scale-95">
                                    Adicionar ao Carrinho
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-50">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Entrega</p>
                                        <p className="text-xs font-bold text-slate-900">Imediata (24/7)</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-sm">
                                        <Download size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Acesso</p>
                                        <p className="text-xs font-bold text-slate-900">Vitalício</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seller & Description Section */}
                <div className="mt-24 grid lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8">
                        <section className="mb-20">
                            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter uppercase">Descrição do Produto</h2>
                            <div className="prose prose-xl prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
                                <p className="mb-6">{product.description}</p>
                                <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 my-12">
                                    <h4 className="text-slate-900 font-black mb-8 uppercase tracking-widest text-sm">O que você vai receber:</h4>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {product.features.map((f, i) => (
                                            <div key={i} className="flex items-center gap-3 group">
                                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    <CheckCircle2 size={14} />
                                                </div>
                                                <span className="text-slate-900 font-bold">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p>Todos os nossos produtos digitais são verificados e garantimos a integridade dos arquivos. Após a confirmação do pagamento, você receberá o link para download ou acesso diretamente no seu painel de cliente e também via e-mail corporativo.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter uppercase">Tags Relacionadas</h2>
                            <div className="flex flex-wrap gap-3">
                                {product.tags.map(tag => (
                                    <span key={tag} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-500 hover:border-brand-600 hover:text-brand-600 transition-all cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-8">
                        {/* Seller Card */}
                        <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-8">Sobre o Vendedor</h3>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-4 border-white shadow-soft">
                                    <img src={product.author.image} alt={product.author.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-xl font-black text-slate-900">{product.author.name}</h4>
                                        {product.author.verified && <ShieldCheck size={18} className="text-brand-600" />}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1 rounded-full uppercase tracking-widest">
                                            {product.author.level}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                                            <Star size={12} className="fill-amber-500" /> {product.author.rating}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-400">Resposta Média</span>
                                    <span className="text-slate-900">{product.author.responseTime}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-400">Desde</span>
                                    <span className="text-slate-900">Junho 2024</span>
                                </div>
                            </div>

                            <button className="w-full bg-white border border-slate-200 py-4 rounded-2xl font-black text-slate-900 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                <MessageCircle size={18} /> Chat com Vendedor
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="space-y-4">
                            {[
                                { icon: <ShieldCheck className="text-brand-600" />, title: "Compra Garantida", desc: "Receba o produto ou seu dinheiro de volta." },
                                { icon: <Lock className="text-emerald-600" />, title: "Pagamento Protegido", desc: "Seus dados estão 100% seguros com encriptação SSL." },
                                { icon: <Globe className="text-blue-600" />, title: "Suporte 24h", desc: "Dúvidas? Nosso time de suporte está aqui." }
                            ].map((badge, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-50 flex gap-4 items-start shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                                        {badge.icon}
                                    </div>
                                    <div>
                                        <h5 className="font-black text-slate-900 text-sm leading-none mb-1">{badge.title}</h5>
                                        <p className="text-slate-400 text-xs font-medium leading-relaxed">{badge.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-32 pt-24 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Pode te <span className="text-brand-600">interessar.</span></h2>
                        <button className="hidden sm:flex items-center gap-2 text-brand-600 font-bold hover:underline">
                            Ver toda a vitrine <ExternalLink size={18} />
                        </button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {VITRINE_PRODUCTS.slice(0, 3).map(p => (
                           <div key={p.id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden hover:shadow-premium transition-all">
                                <div className="h-48 overflow-hidden">
                                     <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                </div>
                                <div className="p-8">
                                    <h4 className="font-bold text-slate-900 mb-2 truncate uppercase tracking-tight">{p.title}</h4>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-black text-slate-900">R$ {p.price}</p>
                                        <button onClick={() => navigate(`/vitrine/${p.slug}`)} className="text-brand-600 font-bold text-sm">Ver Agora</button>
                                    </div>
                                </div>
                           </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
