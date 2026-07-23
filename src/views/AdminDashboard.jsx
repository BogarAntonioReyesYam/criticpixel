import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Heart, Gamepad2, TrendingUp, ArrowLeft, Shield, BarChart3, Settings, Star, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import useSEO from '../hooks/useSEO';

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-gamingCard rounded-2xl p-6 border border-white/5 shadow-2xl"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-black text-white">{value}</p>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  useSEO({ title: 'Admin Dashboard', description: 'Panel de administración de CriticPixel' });

  const [stats, setStats] = useState({
    totalGames: 0,
    totalReviews: 0,
    totalUsers: 0,
    totalWishlists: 0,
  });
  const [recentReviews, setRecentReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);

      const [gamesRes, reviewsRes, usersRes, wishlistsRes, recentRes] = await Promise.all([
        supabase.from('games').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('wishlists').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        totalGames: gamesRes.count || 0,
        totalReviews: reviewsRes.count || 0,
        totalUsers: usersRes.count || 0,
        totalWishlists: wishlistsRes.count || 0,
      });

      setRecentReviews(recentRes.data || []);
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gamingCard rounded-2xl p-6 border border-white/5 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-8 w-16 bg-white/5 rounded" />
                  <div className="h-3 w-20 bg-white/5 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-gamingOrange" />
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">
            Admin <span className="text-gamingOrange">Dashboard</span>
          </h1>
        </div>
        <p className="text-gray-400 text-sm">Resumen general del sitio</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={Gamepad2} label="Juegos" value={stats.totalGames} color="#ff6b00" delay={0} />
        <StatCard icon={MessageSquare} label="Reseñas" value={stats.totalReviews} color="#facc15" delay={0.1} />
        <StatCard icon={Users} label="Usuarios" value={stats.totalUsers} color="#3b82f6" delay={0.2} />
        <StatCard icon={Heart} label="Deseados" value={stats.totalWishlists} color="#ef4444" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gamingCard rounded-2xl border border-white/5 shadow-2xl"
        >
          <div className="p-6 border-b border-white/5">
            <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gamingOrange" />
              Reseñas Recientes
            </h3>
          </div>
          <div className="p-4">
            {recentReviews.length > 0 ? (
              <div className="space-y-3">
                {recentReviews.map((review) => (
                  <div key={review.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gamingOrange/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-gamingOrange">
                        {review.user_name?.[0]?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{review.user_name}</p>
                      <p className="text-xs text-gray-500 truncate">{review.text}</p>
                    </div>
                    <span className="text-xs font-black text-gamingOrange bg-gamingOrange/10 px-2 py-0.5 rounded">
                      {review.score}/10
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 text-sm">No hay reseñas aún</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gamingCard rounded-2xl border border-white/5 shadow-2xl"
        >
          <div className="p-6 border-b border-white/5">
            <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gamingOrange" />
              Acciones Rápidas
            </h3>
          </div>
          <div className="p-4 space-y-2">
            <Link to="/admin/games" className="flex items-center gap-3 p-3 rounded-xl bg-gamingOrange/10 border border-gamingOrange/20 hover:bg-gamingOrange/20 transition-colors">
              <Gamepad2 className="w-5 h-5 text-gamingOrange" />
              <div>
                <p className="font-bold text-white text-sm">Gestionar Juegos</p>
                <p className="text-xs text-gray-500">Crear, editar, eliminar juegos</p>
              </div>
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-bold text-white text-sm">Gestionar Usuarios</p>
                <p className="text-xs text-gray-500">Roles, baneos, perfil</p>
              </div>
            </Link>
            <Link to="/admin/prices" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <DollarSign className="w-5 h-5 text-green-400" />
              <div>
                <p className="font-bold text-white text-sm">Administrar Precios</p>
                <p className="text-xs text-gray-500">Gestiona precios del mercado</p>
              </div>
            </Link>
            <Link to="/admin/analytics" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <div>
                <p className="font-bold text-white text-sm">Analytics</p>
                <p className="text-xs text-gray-500">Gráficas de tráfico</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
