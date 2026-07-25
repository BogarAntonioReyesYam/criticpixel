import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Eye, Heart, MessageSquare, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import useSEO from '../hooks/useSEO';

const Articles = () => {
  useSEO({ title: 'Artículos', description: 'Noticias, guías y opiniones de la comunidad CriticPixel' });
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: 'news', tags: '', cover_image: '',
  });

  const fetchArticles = async () => {
    let query = supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('category', filter);
    const { data, error } = await query;
    if (error) { setIsLoading(false); return; }

    if (data && data.length > 0) {
      const userIds = [...new Set(data.map(a => a.user_id))];
      const { data: profiles } = userIds.length ? await supabase.from('profiles').select('id, display_name, avatar_url').in('id', userIds) : { data: [] };
      const profilesMap = Object.fromEntries((profiles || []).map(p => [p.id, p]));
      data.forEach(a => { a.profiles = profilesMap[a.user_id] || null; });
    }

    setArticles(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchArticles(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const { error } = await supabase.from('articles').insert({
      user_id: user.id, title: form.title, slug, excerpt: form.excerpt,
      content: form.content, category: form.category,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      cover_image: form.cover_image || null, published: true,
    });
    if (!error) { setForm({ title: '', excerpt: '', content: '', category: 'news', tags: '', cover_image: '' }); setShowForm(false); fetchArticles(); }
  };

  const categories = [
    { key: 'all', label: 'Todos' }, { key: 'news', label: 'Noticias' }, { key: 'review', label: 'Reseñas' },
    { key: 'guide', label: 'Guías' }, { key: 'opinion', label: 'Opinión' }, { key: 'tutorial', label: 'Tutoriales' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-gamingOrange" />
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Artículos <span className="text-gamingOrange">Comunidad</span></h1>
        </div>
        {user && (
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 text-sm font-bold text-gamingOrange hover:text-gamingOrange/80 transition-colors">
            <Plus className="w-4 h-4" /> Escribir
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button key={c.key} onClick={() => { setFilter(c.key); setIsLoading(true); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === c.key ? 'bg-gamingOrange text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {c.label}
          </button>
        ))}
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit}
          className="bg-gamingCard rounded-2xl border border-white/5 p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">Nuevo Artículo</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <input type="text" placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
          <input type="text" placeholder="Extracto (resumen corto)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
          <textarea placeholder="Contenido (usa markdown)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50 resize-none" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gamingOrange/50">
              <option value="news">Noticias</option><option value="review">Reseñas</option>
              <option value="guide">Guías</option><option value="opinion">Opinión</option><option value="tutorial">Tutoriales</option>
            </select>
            <input type="text" placeholder="Tags (separados por coma)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
            <input type="text" placeholder="URL de imagen (opcional)" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 text-sm font-bold bg-gamingOrange text-white rounded-lg hover:bg-gamingOrange/80 transition-colors">Publicar</button>
          </div>
        </motion.form>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gamingCard rounded-2xl p-5 border border-white/5 animate-pulse">
              <div className="h-40 bg-white/5 rounded-xl mb-4" />
              <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
              <div className="h-3 bg-white/5 rounded w-full mb-2" />
              <div className="h-3 bg-white/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-gray-500 text-center py-16 text-sm">No hay artículos publicados aún</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/articles/${article.slug}`} className="block bg-gamingCard rounded-2xl border border-white/5 hover:border-gamingOrange/20 overflow-hidden transition-all group">
                {article.cover_image && (
                  <div className="h-40 overflow-hidden">
                    <img src={article.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-gamingOrange bg-gamingOrange/10 px-2 py-0.5 rounded uppercase">{article.category}</span>
                    {article.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-white group-hover:text-gamingOrange transition-colors mb-1">{article.title}</h3>
                  {article.excerpt && <p className="text-xs text-gray-500 line-clamp-2">{article.excerpt}</p>}
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                    <span>{article.profiles?.display_name || 'Anónimo'}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views_count}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {article.likes_count}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {article.comments_count}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
