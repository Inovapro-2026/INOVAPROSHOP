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
  Star
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Announcement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  active: boolean;
  highlighted: boolean;
}

export const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const initialFormData: Omit<Announcement, 'id'> = {
    title: '',
    description: '',
    image: '',
    link: '#',
    active: true,
    highlighted: false,
  };

  const [formData, setFormData] = useState<Omit<Announcement, 'id'>>(initialFormData);

  useEffect(() => {
    const saved = localStorage.getItem('freelancepro_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      const defaults: Announcement[] = [
        {
          id: '1',
          title: 'PRECISA DE LOGO?',
          description: 'Encontre designers de alto nível com preços acessíveis.',
          image: 'https://picsum.photos/seed/ann1/400/300',
          link: '/catalog',
          active: true,
          highlighted: true
        }
      ];
      setAnnouncements(defaults);
      localStorage.setItem('freelancepro_announcements', JSON.stringify(defaults));
    }
  }, []);

  const saveToLocal = (updated: Announcement[]) => {
    setAnnouncements(updated);
    localStorage.setItem('freelancepro_announcements', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnnouncement) {
      const updated = announcements.map(a => a.id === editingAnnouncement.id ? { ...formData, id: a.id } : a);
      saveToLocal(updated);
    } else {
      const newAnn: Announcement = {
        ...formData,
        id: Date.now().toString(),
      };
      saveToLocal([...announcements, newAnn]);
    }
    setIsFormOpen(false);
    setEditingAnnouncement(null);
    setFormData(initialFormData);
  };

  const handleEdit = (ann: Announcement) => {
    setEditingAnnouncement(ann);
    setFormData({
      title: ann.title,
      description: ann.description,
      image: ann.image,
      link: ann.link,
      active: ann.active,
      highlighted: ann.highlighted,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Excluir este anúncio?')) {
      saveToLocal(announcements.filter(a => a.id !== id));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar anúncios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600 transition-all shadow-sm font-bold text-sm"
          />
        </div>
        <button 
          onClick={() => {
            setEditingAnnouncement(null);
            setFormData(initialFormData);
            setIsFormOpen(true);
          }}
          className="bg-accent-purple text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-accent-purple/20"
        >
          <Plus size={18} /> Novo Anúncio
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {announcements.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase())).map(ann => (
          <div key={ann.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden group hover:shadow-premium transition-all">
            <div className="relative h-48 bg-slate-50 border-b border-slate-100 overflow-hidden">
               <img src={ann.image || "https://picsum.photos/seed/placeholder/400/300"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Ann" />
               <div className="absolute top-4 left-4 flex gap-2">
                 {ann.highlighted && (
                   <span className="bg-amber-400 text-white p-2 rounded-xl shadow-lg border border-white/20"><Star size={14} className="fill-current" /></span>
                 )}
                 <span className={cn(
                  "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm",
                  ann.active ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
                 )}>
                   {ann.active ? 'Ativo' : 'Pausado'}
                 </span>
               </div>
            </div>

            <div className="p-8">
               <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none mb-3">{ann.title}</h3>
               <p className="text-sm text-slate-400 font-medium line-clamp-2 mb-6">{ann.description}</p>
               
               <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(ann)} className="w-10 h-10 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center hover:bg-brand-50 hover:text-brand-600 transition-colors shadow-sm"><Edit3 size={18} /></button>
                    <button onClick={() => handleDelete(ann.id)} className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm"><Trash2 size={18} /></button>
                  </div>
                  <NavLink to={ann.link} className="text-slate-400 hover:text-brand-600 transition-colors"><LinkIcon size={18} /></NavLink>
               </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsFormOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{editingAnnouncement ? 'Editar Anúncio' : 'Novo Anúncio'}</h2>
                  <button onClick={() => setIsFormOpen(false)} className="p-3 bg-slate-50 rounded-full text-slate-400"><X size={20} /></button>
               </div>
               <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Título</label>
                          <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="block w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 font-bold" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Descrição</label>
                          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="block w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 font-bold min-h-[80px]" />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Thumbnail</label>
                        <div className="relative group aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden">
                            {formData.image ? (
                               <img src={formData.image} className="w-full h-full object-cover" />
                            ) : (
                               <Upload className="text-slate-200" size={32} />
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Link</label>
                        <input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="block w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold" />
                     </div>
                     <div className="flex items-end gap-4">
                        <button type="button" onClick={() => setFormData({...formData, highlighted: !formData.highlighted})} className={cn("flex-1 p-3.5 rounded-2xl border font-bold text-xs uppercase transition-all", formData.highlighted ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-slate-50 border-slate-100 text-slate-400")}>Destaque</button>
                        <button type="button" onClick={() => setFormData({...formData, active: !formData.active})} className={cn("flex-1 p-3.5 rounded-2xl border font-bold text-xs uppercase transition-all", formData.active ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-red-50 border-red-200 text-red-600")}>{formData.active ? 'Ativo' : 'Pausado'}</button>
                     </div>
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl">Salvar Anúncio</button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
