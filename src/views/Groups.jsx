import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Gamepad2, Monitor, Globe, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import GroupList from '../components/GroupList';
import useSEO from '../hooks/useSEO';

const Groups = () => {
  useSEO({ title: 'Grupos', description: 'Únete a grupos de la comunidad por género o plataforma' });
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', type: 'genre', icon: '' });
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const { error } = await supabase.from('groups').insert({
      name: form.name, slug, description: form.description, type: form.type,
      icon: form.icon || null, created_by: user.id,
    });
    setSubmitting(false);
    if (!error) { setForm({ name: '', description: '', type: 'genre', icon: '' }); setShowForm(false); setRefreshKey(k => k + 1); }
  };

  const filters = [
    { key: 'all', label: 'Todos', icon: Globe },
    { key: 'genre', label: 'Por Género', icon: Gamepad2 },
    { key: 'platform', label: 'Por Plataforma', icon: Monitor },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gamingOrange transition-colors mb-6">
        ← Volver a Comunidad
      </Link>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-gamingOrange" />
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Grupos <span className="text-gamingOrange">Comunidad</span></h1>
        </div>
        {user && (
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-gamingOrange text-white rounded-lg hover:bg-gamingOrange/80 transition-colors">
            <Plus className="w-4 h-4" /> Crear Grupo
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            onSubmit={handleCreate} className="bg-gamingCard rounded-2xl border border-white/5 p-6 mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">Nuevo Grupo</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <input type="text" placeholder="Nombre del grupo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" required />
            <input type="text" placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gamingOrange/50">
                <option value="genre">Género</option><option value="platform">Plataforma</option>
              </select>
              <input type="text" placeholder="Icono (emoji o texto)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50" />
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={submitting} className="px-6 py-2 text-sm font-bold bg-gamingOrange text-white rounded-lg hover:bg-gamingOrange/80 transition-colors disabled:opacity-50">
                {submitting ? 'Creando...' : 'Crear Grupo'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => {
          const Icon = f.icon;
          return (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === f.key ? 'bg-gamingOrange text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
              <Icon className="w-3 h-3" /> {f.label}
            </button>
          );
        })}
      </div>

      <GroupList type={filter === 'all' ? null : filter} key={refreshKey} />
    </div>
  );
};

export default Groups;
