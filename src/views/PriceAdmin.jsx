import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Settings, RefreshCw, Trash2, Plus, ExternalLink } from 'lucide-react';

export default function PriceAdmin() {
  const [marketPrices, setMarketPrices] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [pricesRes, gamesRes] = await Promise.all([
      supabase.from('market_prices').select('*, games(title)').order('game_id'),
      supabase.from('games').select('id, title').order('title'),
    ]);
    setMarketPrices(pricesRes.data || []);
    setGames(gamesRes.data || []);
    setLoading(false);
  }

  async function updatePrice(id, newPrice) {
    setSaving(id);
    const { error } = await supabase
      .from('market_prices')
      .update({ price: parseInt(newPrice), updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMarketPrices(prev =>
        prev.map(p => (p.id === id ? { ...p, price: parseInt(newPrice) } : p))
      );
      setMessage({ type: 'success', text: 'Precio actualizado' });
    }
    setSaving(null);
    setTimeout(() => setMessage(null), 3000);
  }

  async function deletePrice(id) {
    if (!confirm('¿Eliminar este precio?')) return;
    const { error } = await supabase.from('market_prices').delete().eq('id', id);
    if (!error) {
      setMarketPrices(prev => prev.filter(p => p.id !== id));
      setMessage({ type: 'success', text: 'Precio eliminado' });
    }
  }

  async function addPrice(gameId, store, platform, price, storeUrl, editionName) {
    const { error } = await supabase.from('market_prices').insert({
      game_id: parseInt(gameId),
      store,
      platform,
      price: parseInt(price),
      store_url: storeUrl,
      edition_name: editionName,
    });
    if (!error) {
      setMessage({ type: 'success', text: 'Precio agregado' });
      loadData();
    }
  }

  const groupedByGame = marketPrices.reduce((acc, mp) => {
    const gameTitle = mp.games?.title || `Game ${mp.game_id}`;
    if (!acc[gameTitle]) acc[gameTitle] = [];
    acc[gameTitle].push(mp);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gamingBg text-white flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-gamingOrange" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gamingBg text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black uppercase tracking-wider flex items-center gap-2">
            <Settings className="text-gamingOrange" />
            Admin de Precios
          </h1>
          <Link to="/" className="text-gamingOrange hover:text-white transition-colors text-sm font-bold">
            Volver al sitio
          </Link>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${
            message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-8">
          {Object.entries(groupedByGame).map(([gameTitle, prices]) => (
            <div key={gameTitle} className="bg-gamingCard rounded-2xl border border-white/5 p-6">
              <h2 className="text-lg font-black uppercase tracking-wider mb-4 text-gamingOrange">
                {gameTitle}
              </h2>
              <div className="space-y-3">
                {prices.map((mp) => (
                  <div key={mp.id} className="flex items-center gap-4 bg-white/5 rounded-xl p-3">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 uppercase">{mp.store} - {mp.platform}</div>
                      <div className="text-xs text-gray-600">{mp.edition_name}</div>
                    </div>
                    <input
                      type="number"
                      defaultValue={mp.price}
                      onBlur={(e) => updatePrice(mp.id, e.target.value)}
                      className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 w-32 text-right font-bold text-gamingOrange focus:border-gamingOrange focus:outline-none"
                      disabled={saving === mp.id}
                    />
                    {mp.store_url && (
                      <a href={mp.store_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gamingOrange">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button onClick={() => deletePrice(mp.id)} className="text-gray-500 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gamingCard rounded-2xl border border-white/5 p-6">
          <h2 className="text-lg font-black uppercase tracking-wider mb-4 flex items-center gap-2">
            <Plus className="text-gamingOrange" />
            Agregar Nuevo Precio
          </h2>
          <AddPriceForm games={games} onAdd={addPrice} />
        </div>
      </div>
    </div>
  );
}

function AddPriceForm({ games, onAdd }) {
  const [gameId, setGameId] = useState('');
  const [store, setStore] = useState('PlayStation Store');
  const [platform, setPlatform] = useState('PS5');
  const [price, setPrice] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [editionName, setEditionName] = useState('Standard');

  function handleSubmit(e) {
    e.preventDefault();
    if (!gameId || !price) return;
    onAdd(gameId, store, platform, price, storeUrl, editionName);
    setPrice('');
    setStoreUrl('');
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <select
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gamingOrange focus:outline-none"
      >
        <option value="">Seleccionar juego</option>
        {games.map(g => (
          <option key={g.id} value={g.id}>{g.title}</option>
        ))}
      </select>
      <select
        value={store}
        onChange={(e) => setStore(e.target.value)}
        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gamingOrange focus:outline-none"
      >
        <option>PlayStation Store</option>
        <option>Microsoft Store</option>
        <option>Steam</option>
        <option>Epic Games</option>
        <option>Nintendo eShop</option>
      </select>
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gamingOrange focus:outline-none"
      >
        <option>PS5</option>
        <option>PS4</option>
        <option>Xbox Series X</option>
        <option>Xbox One</option>
        <option>PC</option>
        <option>Nintendo Switch</option>
      </select>
      <input
        type="text"
        value={editionName}
        onChange={(e) => setEditionName(e.target.value)}
        placeholder="Edición"
        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gamingOrange focus:outline-none"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Precio (MXN)"
        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-gamingOrange focus:outline-none"
      />
      <input
        type="url"
        value={storeUrl}
        onChange={(e) => setStoreUrl(e.target.value)}
        placeholder="URL de la tienda"
        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm col-span-2 focus:border-gamingOrange focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gamingOrange text-white font-bold py-2 px-4 rounded-lg hover:bg-gamingOrange/80 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Agregar
      </button>
    </form>
  );
}
