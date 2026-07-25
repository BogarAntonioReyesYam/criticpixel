import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Search, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

const emptyGame = {
  id: '',
  title: '',
  image: '',
  global_score: '',
  platforms: [],
  description: '',
  about: '',
  developer: '',
  publisher: '',
  genre: '',
  release_year: '',
  multiplayer: '',
  rating: '',
};

const GameCrud = () => {
  const { addToast } = useToast();
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [formData, setFormData] = useState(emptyGame);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchGames = async () => {
    setIsLoading(true);
    const { data } = await supabase.from('games').select('*').order('title');
    setGames(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const filteredGames = games.filter(g =>
    g.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.developer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (game) => {
    setEditingGame(game);
    setFormData({
      id: game.id,
      title: game.title || '',
      image: game.image || '',
      global_score: game.global_score || '',
      platforms: game.platforms || [],
      description: game.description || '',
      about: game.about || '',
      developer: game.developer || '',
      publisher: game.publisher || '',
      genre: game.genre || '',
      release_year: game.release_year || '',
      multiplayer: game.multiplayer || '',
      rating: game.rating || '',
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingGame(null);
    setFormData(emptyGame);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      addToast('El título es obligatorio', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const gameData = {
        title: formData.title,
        image: formData.image || null,
        global_score: formData.global_score ? parseFloat(formData.global_score) : null,
        platforms: formData.platforms,
        description: formData.description || null,
        about: formData.about || null,
        developer: formData.developer || null,
        publisher: formData.publisher || null,
        genre: formData.genre || null,
        release_year: formData.release_year || null,
        multiplayer: formData.multiplayer || null,
        rating: formData.rating || null,
      };

      if (editingGame) {
        const { error } = await supabase
          .from('games')
          .update(gameData)
          .eq('id', editingGame.id);
        if (error) throw error;
        addToast('Juego actualizado', 'success');
      } else {
        gameData.id = parseInt(formData.id) || Date.now();
        const { error } = await supabase.from('games').insert(gameData);
        if (error) throw error;
        addToast('Juego creado', 'success');
      }

      setShowForm(false);
      fetchGames();
    } catch (err) {
      addToast('Error al guardar: ' + err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (gameId) => {
    if (!confirm('¿Eliminar este juego?')) return;

    try {
      const { error } = await supabase.from('games').delete().eq('id', gameId);
      if (error) throw error;
      addToast('Juego eliminado', 'success');
      fetchGames();
    } catch (err) {
      addToast('Error al eliminar: ' + err.message, 'error');
    }
  };

  const handlePlatformToggle = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const platformOptions = ['PC', 'PS5', 'Xbox Series X', 'Switch'];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gamingCard rounded-xl p-4 border border-white/5 animate-pulse flex items-center gap-4">
            <div className="w-16 h-16 bg-white/5 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/5 rounded w-1/3" />
              <div className="h-3 bg-white/5 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-gamingOrange" />
            Gestionar <span className="text-gamingOrange">Juegos</span>
          </h2>
          <p className="text-gray-500 text-sm">{games.length} juegos en la base de datos</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 bg-gamingOrange text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-gamingOrange/80 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Juego
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gamingCard border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gamingOrange transition-colors"
        />
      </div>

      <div className="space-y-2">
        {filteredGames.map((game) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gamingCard rounded-xl p-4 border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop';
              }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">{game.title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{game.genre}</span>
                <span>•</span>
                <span>{game.developer}</span>
                {game.global_score && (
                  <>
                    <span>•</span>
                    <span className="text-gamingOrange font-bold">{game.global_score}/10</span>
                  </>
                )}
              </div>
              <div className="flex gap-1 mt-1">
                {game.platforms?.slice(0, 3).map(p => (
                  <span key={p} className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400">{p}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(game)}
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-gamingOrange hover:bg-gamingOrange/10 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(game.id)}
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <div className="relative bg-gamingCard border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gamingCard border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-white uppercase tracking-wider">
                  {editingGame ? 'Editar Juego' : 'Nuevo Juego'}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">ID *</label>
                    <input
                      type="number"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      disabled={!!editingGame}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Título *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">URL de Imagen</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Score Global</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={formData.global_score}
                      onChange={(e) => setFormData({ ...formData, global_score: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Género</label>
                    <input
                      type="text"
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Desarrollador</label>
                    <input
                      type="text"
                      value={formData.developer}
                      onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Editor</label>
                    <input
                      type="text"
                      value={formData.publisher}
                      onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Plataformas</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {platformOptions.map(p => (
                      <button
                        key={p}
                        onClick={() => handlePlatformToggle(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          formData.platforms.includes(p)
                            ? 'bg-gamingOrange text-white'
                            : 'bg-white/5 text-gray-500 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Acerca de</label>
                  <textarea
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Año</label>
                    <input
                      type="text"
                      value={formData.release_year}
                      onChange={(e) => setFormData({ ...formData, release_year: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Multijugador</label>
                    <input
                      type="text"
                      value={formData.multiplayer}
                      onChange={(e) => setFormData({ ...formData, multiplayer: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Clasificación</label>
                    <input
                      type="text"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:outline-none focus:border-gamingOrange"
                    />
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gamingCard border-t border-white/10 px-6 py-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-gamingOrange text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-gamingOrange/80 disabled:opacity-50 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCrud;
