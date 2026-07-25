import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    todayViews: 0,
    topPages: [],
    viewsByDay: [],
    topGames: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('7d');

  const fetchAnalytics = async () => {
    setIsLoading(true);

    const daysAgo = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const since = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

    const [totalRes, todayRes, pagesRes, dailyRes, gamesRes] = await Promise.all([
      supabase.from('page_views').select('id', { count: 'exact', head: true }),
      supabase.from('page_views').select('id', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
      supabase.from('page_views').select('page')
        .gte('created_at', since),
      supabase.from('page_views').select('created_at')
        .gte('created_at', since),
      supabase.from('page_views').select('game_id')
        .not('game_id', 'is', null)
        .gte('created_at', since),
    ]);

    const pageCounts = {};
    pagesRes.data?.forEach(p => {
      pageCounts[p.page] = (pageCounts[p.page] || 0) + 1;
    });
    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));

    const dayCounts = {};
    dailyRes.data?.forEach(p => {
      const day = new Date(p.created_at).toLocaleDateString('es-MX', { weekday: 'short' });
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    const viewsByDay = Object.entries(dayCounts).map(([day, count]) => ({ day, count }));

    const gameCounts = {};
    gamesRes.data?.forEach(p => {
      gameCounts[p.game_id] = (gameCounts[p.game_id] || 0) + 1;
    });
    const topGames = Object.entries(gameCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, count]) => ({ id: parseInt(id), count }));

    setStats({
      totalViews: totalRes.count || 0,
      todayViews: todayRes.count || 0,
      topPages,
      viewsByDay,
      topGames,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const maxDailyViews = Math.max(...(stats.viewsByDay.map(d => d.count) || [1]));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gamingCard rounded-xl p-6 border border-white/5 animate-pulse">
              <div className="h-8 w-16 bg-white/5 rounded mb-2" />
              <div className="h-3 w-20 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-gamingOrange" />
            <span className="text-gamingOrange">Analytics</span>
          </h2>
          <p className="text-gray-500 text-sm">Métricas de tráfico del sitio</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-gamingCard border border-white/10 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 focus:outline-none focus:border-gamingOrange"
        >
          <option value="7d">Últimos 7 días</option>
          <option value="30d">Últimos 30 días</option>
          <option value="90d">Últimos 90 días</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gamingCard rounded-xl p-6 border border-white/5"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gamingOrange/10">
              <Eye className="w-5 h-5 text-gamingOrange" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stats.totalViews}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold">Visitas totales</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gamingCard rounded-xl p-6 border border-white/5"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500/10">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stats.todayViews}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold">Visitas hoy</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gamingCard rounded-xl p-6 border border-white/5"
      >
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gamingOrange" />
          Visitas por día
        </h3>
        {stats.viewsByDay.length > 0 ? (
          <div className="flex items-end gap-2 h-32">
            {stats.viewsByDay.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-gray-500 font-bold">{d.count}</span>
                <div
                  className="w-full bg-gamingOrange rounded-t transition-all duration-500"
                  style={{ height: `${(d.count / maxDailyViews) * 100}%`, minHeight: '4px' }}
                />
                <span className="text-[9px] text-gray-500 uppercase">{d.day}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8 text-sm">Sin datos para este período</p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gamingCard rounded-xl p-6 border border-white/5"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Páginas más visitadas</h3>
          <div className="space-y-3">
            {stats.topPages.length > 0 ? stats.topPages.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-300 truncate">{p.page}</span>
                <span className="text-xs font-bold text-gamingOrange bg-gamingOrange/10 px-2 py-0.5 rounded">
                  {p.count}
                </span>
              </div>
            )) : (
              <p className="text-gray-500 text-sm text-center py-4">Sin datos</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gamingCard rounded-xl p-6 border border-white/5"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Juegos más vistos</h3>
          <div className="space-y-3">
            {stats.topGames.length > 0 ? stats.topGames.map((g, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Juego #{g.id}</span>
                <span className="text-xs font-bold text-gamingOrange bg-gamingOrange/10 px-2 py-0.5 rounded">
                  {g.count} vistas
                </span>
              </div>
            )) : (
              <p className="text-gray-500 text-sm text-center py-4">Sin datos</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
