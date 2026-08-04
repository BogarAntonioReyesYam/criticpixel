import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, Plus, X, Gamepad2, Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import useSEO from '../hooks/useSEO';

const Screenshots = () => {
  useSEO({ title: 'Screenshots', description: 'Capturas compartidas por la comunidad' });
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [screenshots, setScreenshots] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ image_url: '', caption: '', game_id: '' });

  const fetchScreenshots = async () => {
    const { data, error } = await supabase
      .from('screenshots')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) { setIsLoading(false); return; }

    if (data && data.length > 0) {
      const userIds = [...new Set(data.map(s => s.user_id))];
      const gameIds = [...new Set(data.map(s => s.game_id).filter(Boolean))];
      const [{ data: profiles }, { data: games }] = await Promise.all([
        userIds.length ? supabase.from('profiles').select('id, display_name, avatar_url').in('id', userIds) : { data: [] },
        gameIds.length ? supabase.from('games').select('id, title, slug').in('id', gameIds) : { data: [] },
      ]);
      const profilesMap = Object.fromEntries((profiles || []).map(p => [p.id, p]));
      const gamesMap = Object.fromEntries((games || []).map(g => [g.id, g]));
      data.forEach(s => { s.profiles = profilesMap[s.user_id] || null; s.games = gamesMap[s.game_id] || null; });
    }

    setScreenshots(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchScreenshots(); }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
    setForm({ ...form, _file: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form._file && !form.image_url.trim()) return;
    setUploading(true);

    let imageUrl = form.image_url;

    if (form._file) {
      const ext = form._file.name.split('.').pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('screenshots').upload(path, form._file);
      if (uploadError) { setUploading(false); return; }
      const { data: urlData } = supabase.storage.from('screenshots').getPublicUrl(path);
      imageUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from('screenshots').insert({
      user_id: user.id, image_url: imageUrl, caption: form.caption || null,
      game_id: form.game_id || null,
    });
    if (!error) { setForm({ image_url: '', caption: '', game_id: '' }); setPreview(null); setShowForm(false); fetchScreenshots(); }
    setUploading(false);
  };

  const toggleLike = async (screenshotId) => {
    if (!user) return;
    const existing = await supabase.from('screenshot_likes').select('id').eq('screenshot_id', screenshotId).eq('user_id', user.id).single();
    if (existing.data) {
      await supabase.from('screenshot_likes').delete().eq('id', existing.data.id);
    } else {
      await supabase.from('screenshot_likes').insert({ screenshot_id: screenshotId, user_id: user.id });
    }
    fetchScreenshots();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gamingOrange transition-colors mb-6">
        ← Volver a Comunidad
      </Link>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-gamingOrange" />
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Screenshots <span className="text-gamingOrange">Comunidad</span></h1>
        </div>
        {user && (
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 text-sm font-bold text-gamingOrange hover:text-gamingOrange/80 transition-colors">
            <Plus className="w-4 h-4" /> Subir Captura
          </button>
        )}
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit}
          className="bg-gamingCard rounded-2xl border border-white/5 p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white">Nueva Captura</h3>
            <button type="button" onClick={() => { setShowForm(false); setPreview(null); setForm({ image_url: '', caption: '', game_id: '' }); }} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

          {preview ? (
            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <img src={preview} alt="Preview" className="w-full max-h-64 object-cover" />
              <button type="button" onClick={() => { setPreview(null); setForm({ ...form, _file: null }); }}
                className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white hover:bg-black/80">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center gap-2 hover:border-gamingOrange/40 transition-colors">
              <ImageIcon className="w-10 h-10 text-gray-600" />
              <p className="text-sm text-gray-400 font-bold">Haz clic para seleccionar una imagen</p>
              <p className="text-xs text-gray-600">JPG, PNG, GIF, WebP (max 10MB)</p>
            </button>
          )}

          <p className="text-xs text-gray-500 text-center -my-2">— o —</p>
          <input type="text" placeholder="URL de la imagen (alternativo)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
          <input type="text" placeholder="Caption (opcional)" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
          <input type="text" placeholder="Game ID (opcional)" value={form.game_id} onChange={(e) => setForm({ ...form, game_id: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
          <div className="flex justify-end">
            <button type="submit" disabled={uploading || (!form._file && !form.image_url.trim())}
              className="px-6 py-2 text-sm font-bold bg-gamingOrange text-white rounded-lg hover:bg-gamingOrange/80 transition-colors disabled:opacity-50 flex items-center gap-2">
              {uploading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Subiendo...</>) : (<><Upload className="w-4 h-4" /> Subir</>)}
            </button>
          </div>
        </motion.form>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gamingCard rounded-2xl aspect-square animate-pulse" />
          ))}
        </div>
      ) : screenshots.length === 0 ? (
        <p className="text-gray-500 text-center py-16 text-sm">No hay capturas compartidas aún</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {screenshots.map((ss, i) => (
            <motion.div key={ss.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
              className="bg-gamingCard rounded-2xl overflow-hidden border border-white/5 hover:border-gamingOrange/20 transition-all group">
              <div className="aspect-square overflow-hidden relative">
                <img src={ss.image_url} alt={ss.caption || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div>
                    {ss.games && <p className="text-xs text-gamingOrange font-bold flex items-center gap-1"><Gamepad2 className="w-3 h-3" /> {ss.games.title}</p>}
                    {ss.caption && <p className="text-xs text-white mt-1">{ss.caption}</p>}
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">{ss.profiles?.display_name || 'Anónimo'}</span>
                <button onClick={() => toggleLike(ss.id)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors">
                  <Heart className="w-3 h-3" /> {ss.likes_count || 0}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Screenshots;
