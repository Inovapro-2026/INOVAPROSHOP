import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Send, MoreVertical, Phone, Video, Image, Paperclip, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const MOCK_CONVERSATIONS = [
  { 
    id: '1', 
    name: 'Design Studio Pro', 
    avatar: 'https://picsum.photos/seed/studio/100/100',
    lastMessage: 'Olá Maicon! Já comecei os esboços iniciais...',
    time: '14:20',
    unreadCount: 2,
    online: true
  },
  { 
    id: '2', 
    name: 'Mídia Max', 
    avatar: 'https://picsum.photos/seed/agency/100/100',
    lastMessage: 'A campanha de tráfego já está performando.',
    time: 'Ontem',
    unreadCount: 0,
    online: false
  },
  { 
    id: '3', 
    name: 'Dev Master', 
    avatar: 'https://picsum.photos/seed/code/100/100',
    lastMessage: 'O bug no checkout foi resolvido.',
    time: 'Segunda',
    unreadCount: 0,
    online: true
  }
];

const MOCK_MESSAGES: Record<string, any[]> = {
  '1': [
    { id: 1, sender: 'them', text: 'Olá Maicon! Como você está?', time: '14:10' },
    { id: 2, sender: 'me', text: 'Tudo ótimo por aqui! Ansioso para ver os esboços.', time: '14:12' },
    { id: 3, sender: 'them', text: 'Já comecei os esboços iniciais do seu logo. Qual sua cor preferida?', time: '14:20' }
  ]
};

export const MessagesPage = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeChatInfo = conversations.find(c => c.id === activeChat);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const msg = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages({
      ...messages,
      [activeChat]: [...(messages[activeChat] || []), msg]
    });
    setNewMessage('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-premium overflow-hidden h-[750px] flex">
      {/* Sidebar - Conversations List */}
      <div className="w-96 border-r border-slate-100 flex flex-col">
        <div className="p-8 border-b border-slate-50">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Mensagens</h2>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar conversas..."
              className="w-full bg-slate-50 border-2 border-transparent rounded-[1.25rem] pl-12 pr-4 py-3 font-bold text-sm text-slate-900 outline-none focus:bg-white focus:border-brand-500 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-4">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv.id)}
              className={cn(
                "w-full px-8 py-5 flex items-center gap-4 transition-all relative group",
                activeChat === conv.id ? "bg-brand-50" : "hover:bg-slate-50"
              )}
            >
              <div className="relative">
                <img src={conv.avatar} alt={conv.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                {conv.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-slate-900 tracking-tight">{conv.name}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{conv.time}</span>
                </div>
                <p className="text-slate-500 text-xs font-bold line-clamp-1 truncate w-40 leading-relaxed font-medium">
                  {conv.lastMessage}
                </p>
              </div>

              {conv.unreadCount > 0 && (
                <span className="bg-brand-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-brand-100">
                  {conv.unreadCount}
                </span>
              )}

              {activeChat === conv.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-brand-600 rounded-r-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {activeChatInfo ? (
          <>
            {/* Chat Header */}
            <div className="px-10 py-6 bg-white border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={activeChatInfo.avatar} alt={activeChatInfo.name} className="w-12 h-12 rounded-2xl object-cover shadow-sm" referrerPolicy="no-referrer" />
                  {activeChatInfo.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 tracking-tight">{activeChatInfo.name}</h4>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mt-1">
                    {activeChatInfo.online ? 'Online agora' : 'Offline'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-3 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-2xl transition-all">
                  <Phone size={20} />
                </button>
                <button className="p-3 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-2xl transition-all">
                  <Video size={20} />
                </button>
                <button className="p-3 text-slate-400 hover:text-slate-900 transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-10 py-10 scrollbar-hide space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.9]">
              <div className="flex justify-center mb-10">
                <span className="px-4 py-1.5 bg-slate-100 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 shadow-sm backdrop-blur-sm">
                  Criptografia de ponta a ponta ativa
                </span>
              </div>

              {messages[activeChat]?.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "flex flex-col max-w-[70%]",
                    msg.sender === 'me' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "px-6 py-4 rounded-[1.75rem] shadow-sm font-medium leading-relaxed mb-1",
                    msg.sender === 'me' 
                      ? "bg-brand-600 text-white rounded-tr-none shadow-brand-100/30" 
                      : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest px-2">{msg.time}</span>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Footer / Input */}
            <div className="p-8 bg-white border-t border-slate-50">
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-[2rem] border-2 border-slate-100 focus-within:border-brand-500 focus-within:bg-white transition-all shadow-inner">
                <div className="flex items-center gap-1 pl-2">
                   <button className="p-3 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-2xl transition-all"><Image size={20} /></button>
                   <button className="p-3 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-2xl transition-all"><Paperclip size={20} /></button>
                </div>
                
                <input 
                  type="text" 
                  placeholder="Digite sua mensagem aqui..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-transparent border-none outline-none font-bold text-slate-800 placeholder:text-slate-300 px-2"
                />

                <button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-slate-900 text-white p-4 rounded-3xl hover:bg-brand-600 transition-all active:scale-95 disabled:opacity-50 shadow-lg"
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-20 opacity-30">
             <MessageSquare size={120} strokeWidth={1} className="mb-8" />
             <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Escolha uma conversa</h3>
             <p className="text-slate-500 font-bold max-w-sm">Deseje boas-vindas aos seus parceiros e comece sua jornada de sucesso agora.</p>
          </div>
        )}
      </div>
    </div>
  );
};
