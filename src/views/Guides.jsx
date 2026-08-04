import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Eye, Heart, Bookmark, X, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import useSEO from '../hooks/useSEO';

const Guides = () => {
  useSEO({ title: 'Guías', description: 'Guías creadas por la comunidad CriticPixel' });
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', difficulty: 'beginner', tags: '', cover_image: '', game_id: '',
  });

  const fetchGuides = async () => {
    let query = supabase.from('guides').select('*').eq('published', true).order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('difficulty', filter);
    const { data, error } = await query;
    if (error) { setIsLoading(false); return; }

    if (data && data.length > 0) {
      const userIds = [...new Set(data.map(g => g.user_id))];
      const gameIds = [...new Set(data.map(g => g.game_id).filter(Boolean))];
      const [{ data: profiles }, { data: games }] = await Promise.all([
        userIds.length ? supabase.from('profiles').select('id, display_name, avatar_url').in('id', userIds) : { data: [] },
        gameIds.length ? supabase.from('games').select('id, title, slug').in('id', gameIds) : { data: [] },
      ]);
      const profilesMap = Object.fromEntries((profiles || []).map(p => [p.id, p]));
      const gamesMap = Object.fromEntries((games || []).map(g => [g.id, g]));
      data.forEach(g => { g.profiles = profilesMap[g.user_id] || null; g.games = gamesMap[g.game_id] || null; });
    }

    setGuides(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchGuides(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const { error } = await supabase.from('guides').insert({
      user_id: user.id, title: form.title, slug, excerpt: form.excerpt,
      content: form.content, difficulty: form.difficulty,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      cover_image: form.cover_image || null, game_id: form.game_id || null, published: true,
    });
    if (!error) { setForm({ title: '', excerpt: '', content: '', difficulty: 'beginner', tags: '', cover_image: '', game_id: '' }); setShowForm(false); fetchGuides(); }
  };

  const diffColors = { beginner: 'text-green-400 bg-green-400/10', intermediate: 'text-yellow-400 bg-yellow-400/10', advanced: 'text-red-400 bg-red-400/10' };
  const diffLabels = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gamingOrange transition-colors mb-6">
        ← Volver a Comunidad
      </Link>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-gamingOrange" />
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Guías <span className="text-gamingOrange">Comunidad</span></h1>
        </div>
        {user && (
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 text-sm font-bold text-gamingOrange hover:text-gamingOrange/80 transition-colors">
            <Plus className="w-4 h-4" /> Crear Guía
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ key: 'all', label: 'Todas' }, { key: 'beginner', label: 'Principiante' }, { key: 'intermediate', label: 'Intermedio' }, { key: 'advanced', label: 'Avanzado' }].map((d) => (
          <button key={d.key} onClick={() => { setFilter(d.key); setIsLoading(true); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === d.key ? 'bg-gamingOrange text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
            {d.label}
          </button>
        ))}
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit}
          className="bg-gamingCard rounded-2xl border border-white/5 p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">Nueva Guía</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <input type="text" placeholder="Título de la guía" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
          <input type="text" placeholder="Extracto" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
          <textarea placeholder="Contenido de la guía (markdown)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50 resize-none" />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gamingOrange/50">
              <option value="beginner">Principiante</option><option value="intermediate">Intermedio</option><option value="advanced">Avanzado</option>
            </select>
            <input type="text" placeholder="Tags (coma separados)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
            <input type="text" placeholder="URL imagen (opcional)" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
            <input type="text" placeholder="Game ID (opcional)" value={form.game_id} onChange={(e) => setForm({ ...form, game_id: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 text-sm font-bold bg-gamingOrange text-white rounded-lg hover:bg-gamingOrange/80 transition-colors">Publicar Guía</button>
          </div>
        </motion.form>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gamingCard rounded-2xl p-5 border border-white/5 animate-pulse">
              <div className="h-40 bg-white/5 rounded-xl mb-4" />
              <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
              <div className="h-3 bg-white/5 rounded w-full" />
            </div>
          ))}
        </div>
      ) : guides.length === 0 ? (
        <p className="text-gray-500 text-center py-16 text-sm">No hay guías publicadas aún</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, i) => (
            <motion.div key={guide.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/guides/${guide.slug}`} className="block bg-gamingCard rounded-2xl border border-white/5 hover:border-gamingOrange/20 overflow-hidden transition-all group">
                {guide.cover_image && (
                  <div className="h-40 overflow-hidden">
                    <img src={guide.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${diffColors[guide.difficulty]}`}>
                      {diffLabels[guide.difficulty]}
                    </span>
                    {guide.games && (
                      <span className="text-[10px] text-gray-500 flex items-center gap-1"><Gamepad2 className="w-3 h-3" /> {guide.games.title}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-white group-hover:text-gamingOrange transition-colors mb-1">{guide.title}</h3>
                  {guide.excerpt && <p className="text-xs text-gray-500 line-clamp-2">{guide.excerpt}</p>}
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                    <span>{guide.profiles?.display_name || 'Anónimo'}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {guide.views_count}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {guide.likes_count}</span>
                    <span className="flex items-center gap-1"><Bookmark className="w-3 h-3" /> {guide.bookmarks_count}</span>
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

export default Guides;
