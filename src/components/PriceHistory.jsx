import { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const PriceHistory = ({ gameId }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState('all');

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('price_history')
        .select('*')
        .eq('game_id', gameId)
        .order('recorded_at', { ascending: true });

      setHistory(data || []);
      setIsLoading(false);
    };

    fetchHistory();
  }, [gameId]);

  const stores = ['all', ...new Set(history.map(h => h.store))];

  const filteredHistory = selectedStore === 'all'
    ? history
    : history.filter(h => h.store === selectedStore);

  const getPriceStats = () => {
    if (filteredHistory.length === 0) return null;
    const prices = filteredHistory.map(h => h.price);
    const current = prices[prices.length - 1];
    const lowest = Math.min(...prices);
    const highest = Math.max(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const trend = prices.length > 1 ? current - prices[0] : 0;

    return { current, lowest, highest, avg, trend };
  };

  const stats = getPriceStats();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
  };

  const getChartPoints = () => {
    if (filteredHistory.length < 2) return '';
    const prices = filteredHistory.map(h => h.price);
    const minPrice = Math.min(...prices) * 0.9;
    const maxPrice = Math.max(...prices) * 1.1;
    const width = 100;
    const height = 50;

    return prices.map((price, i) => {
      const x = (i / (prices.length - 1)) * width;
      const y = height - ((price - minPrice) / (maxPrice - minPrice)) * height;
      return `${x},${y}`;
    }).join(' ');
  };

  if (isLoading) {
    return (
      <div className="bg-gamingCard rounded-2xl p-6 border border-white/5 animate-pulse">
        <div className="h-6 bg-white/5 rounded w-1/3 mb-4" />
        <div className="h-40 bg-white/5 rounded-xl" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-gamingCard rounded-2xl p-6 border border-white/5">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Historial de Precios
        </h4>
        <p className="text-gray-600 text-sm text-center py-6">No hay datos de precios aún</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gamingCard rounded-2xl p-6 border border-white/5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gamingOrange" />
          Historial de Precios
        </h4>
        {stores.length > 2 && (
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-bold text-gray-400 focus:outline-none"
          >
            <option value="all">Todas las tiendas</option>
            {stores.filter(s => s !== 'all').map(store => (
              <option key={store} value={store}>{store}</option>
            ))}
          </select>
        )}
      </div>

      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-500 uppercase font-bold">Actual</p>
            <p className="text-sm font-black text-white">{formatPrice(stats.current)}</p>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 text-center">
            <p className="text-[10px] text-green-400 uppercase font-bold">Más bajo</p>
            <p className="text-sm font-black text-green-400">{formatPrice(stats.lowest)}</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-3 text-center">
            <p className="text-[10px] text-red-400 uppercase font-bold">Más alto</p>
            <p className="text-sm font-black text-red-400">{formatPrice(stats.highest)}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-500 uppercase font-bold">Promedio</p>
            <p className="text-sm font-black text-white">{formatPrice(stats.avg)}</p>
          </div>
        </div>
      )}

      {filteredHistory.length >= 2 && (
        <div className="relative h-32 bg-white/5 rounded-xl overflow-hidden">
          <svg
            viewBox="0 0 100 50"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              points={getChartPoints()}
              fill="none"
              stroke="#ff6b00"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
            <polygon
              points={`0,50 ${getChartPoints()} 100,50`}
              fill="url(#chartGradient)"
            />
          </svg>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center">
        {filteredHistory.length} registro{filteredHistory.length !== 1 ? 's' : ''} desde {formatDate(filteredHistory[0]?.recorded_at)}
      </div>
    </motion.div>
  );
};

export default PriceHistory;
