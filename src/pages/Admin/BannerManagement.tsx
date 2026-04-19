import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  XCircle,
  Save,
  X,
  Upload,
  Link as LinkIcon,
  Search,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  image: string;
  active: boolean;
  order: number;
}

export const BannerManagement = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial Form State
  const initialFormData: Omit<Banner, 'id'> = {
    title: '',
    subtitle: '',
    cta: 'Saiba Mais',
    link: '#',
    image: '',
    active: true,
    order: 0,
  };

  const [formData, setFormData] = useState<Omit<Banner, 'id'>>(initialFormData);

  useEffect(() => {
    const saved = localStorage.getItem('freelancepro_banners');
    if (saved) {
      setBanners(JSON.parse(saved));
    } else {
      // Default banners
      const defaults: Banner[] = [
        {
          id: '1',
          title: 'PRECISANDO DE UM PROFISSIONAL?',
          subtitle: 'Os melhores talentos do Brasil em um só lugar.',
          cta: 'Contratar Agora',
          link: '/freelas',
          image: 'https://picsum.photos/seed/admin1/1200/400',
          active: true,
          order: 1
        }
      ];
      setBanners(defaults);
      localStorage.setItem('freelancepro_banners', JSON.stringify(defaults));
    }
  }, []);

  const saveToLocal = (updated: Banner[]) => {
    setBanners(updated);
    localStorage.setItem('freelancepro_banners', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      const updated = banners.map(b => b.id === editingBanner.id ? { ...formData, id: b.id } : b);
      saveToLocal(updated);
    } else {
      const newBanner: Banner = {
        ...formData,
        id: Date.now().toString(),
      };
      saveToLocal([...banners, newBanner]);
    }
    setIsFormOpen(false);
    setEditingBanner(null);
    setFormData(initialFormData);
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      cta: banner.cta,
      link: banner.link,
      image: banner.image,
      active: banner.active,
      order: banner.order,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este banner?')) {
      const updated = banners.filter(b => b.id !== id);
      saveToLocal(updated);
    }
  };

  const toggleStatus = (id: string) => {
    const updated = banners.map(b => b.id === id ? { ...b, active: !b.active } : b);
    saveToLocal(updated);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredBanners = banners.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar banners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600 transition-all shadow-sm font-bold text-sm"
          />
        </div>
        <button 
          onClick={() => {
            setEditingBanner(null);
            setFormData(initialFormData);
            setIsFormOpen(true);
          }}
          className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-700 transition-all active:scale-95 shadow-xl shadow-brand-600/20"
        >
          <Plus size={18} /> Novo Banner
        </button>
      </div>

      <div className="grid gap-6">
        {filteredBanners.map(banner => (
          <div key={banner.id} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-soft flex flex-col lg:flex-row gap-8 items-center lg:items-center">
            {/* Preview Img */}
            <div className="w-full lg:w-72 h-40 bg-slate-50 rounded-[1.8rem] overflow-hidden border border-slate-100 relative group">
              <img src={banner.image || "https://picsum.photos/seed/placeholder/800/400"} className="w-full h-full object-cover" alt="Banner" />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button className="p-3 bg-white rounded-full text-slate-900 shadow-xl"><Eye size={20} /></button>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                  banner.active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                )}>
                  {banner.active ? 'Ativo' : 'Inativo'}
                </span>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Ordem: {banner.order}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">{banner.title}</h3>
              <p className="text-sm text-slate-400 font-medium line-clamp-1">{banner.subtitle}</p>
              <div className="flex items-center gap-4 pt-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100">
                   <LinkIcon size={12} /> {banner.link}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 rounded-lg text-[10px] font-bold text-brand-600 border border-brand-100">
                   Botão: {banner.cta}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 lg:border-l border-slate-100 lg:pl-8">
              <button 
                onClick={() => toggleStatus(banner.id)}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                  banner.active ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-red-50 text-red-600 hover:bg-red-100"
                )}
                title={banner.active ? 'Desativar' : 'Ativar'}
              >
                {banner.active ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
              </button>
              <button 
                onClick={() => handleEdit(banner)}
                className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-brand-50 hover:text-brand-600 transition-all shadow-sm"
              >
                <Edit3 size={22} />
              </button>
              <button 
                onClick={() => handleDelete(banner.id)}
                className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all shadow-sm"
              >
                <Trash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                    {editingBanner ? 'Editar Banner' : 'Novo Banner'}
                  </h2>
                  <p className="text-sm text-slate-400 font-medium">Preencha as informações para atualizar a vitrine principal.</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="p-4 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 md:p-12 overflow-y-auto max-h-[70vh]">
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Título do Banner</label>
                         <input 
                            required
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            className="block w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold"
                            placeholder="EX: PROMOÇÃO DE LANÇAMENTO"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Subtítulo</label>
                         <textarea 
                            value={formData.subtitle}
                            onChange={e => setFormData({...formData, subtitle: e.target.value})}
                            className="block w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold min-h-[100px]"
                            placeholder="Breve descrição do banner..."
                         />
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-4">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Imagem do Banner</label>
                        <div className="relative group aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden hover:border-brand-300 transition-colors">
                           {formData.image ? (
                             <>
                               <img src={formData.image} className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <label className="bg-white px-5 py-3 rounded-xl font-bold text-xs uppercase cursor-pointer hover:bg-slate-50">Trocar Imagem</label>
                                  <button onClick={() => setFormData({...formData, image: ''})} className="bg-red-500 text-white p-3 rounded-xl"><Trash2 size={16} /></button>
                               </div>
                             </>
                           ) : (
                             <>
                               <Upload className="text-slate-300 mb-3" size={32} />
                               <p className="text-xs font-bold text-slate-400 uppercase">Fazer upload manual</p>
                             </>
                           )}
                           <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Texto do Botão</label>
                      <input 
                         value={formData.cta}
                         onChange={e => setFormData({...formData, cta: e.target.value})}
                         className="block w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Link de Destino</label>
                      <input 
                         value={formData.link}
                         onChange={e => setFormData({...formData, link: e.target.value})}
                         className="block w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Ordem (Prioridade)</label>
                      <input 
                         type="number"
                         value={formData.order}
                         onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                         className="block w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold"
                      />
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="w-full sm:w-auto px-10 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
                  >
                    Descartar
                  </button>
                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-brand-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 active:scale-95"
                  >
                    Salvar Banner <Save size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
