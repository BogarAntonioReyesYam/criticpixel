import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Star, MessageSquare, Heart, Award, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const rankColors = {
  'Leyenda': 'text-yellow-400 bg-yellow-400/10',
  'Maestro Crítico': 'text-purple-400 bg-purple-400/10',
  'Crítico Veterano': 'text-blue-400 bg-blue-400/10',
  'Crítico Experto': 'text-green-400 bg-green-400/10',
  'Crítico Activo': 'text-gamingOrange bg-gamingOrange/10',
  'Crítico Novel': 'text-gray-300 bg-white/10',
  'Novato': 'text-gray-500 bg-white/5',
};

const Leaderboard = ({ sortBy = 'reputation', limit = 20 }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSort, setActiveSort] = useState(sortBy);

  useEffect(() => {
    fetchLeaderboard();
  }, [activeSort]);

  const fetchLeaderboard = async () => {
    const sortMap = {
      reputation: 'reputation',
      reviews: 'review_count',
      followers: 'follower_count',
      likes: 'review_count',
    };

    const { data } = await supabase
      .from('profiles')
      .select('id, display_name, avatar_url, reputation, rank_title, review_count, follower_count')
      .order(sortMap[activeSort] || 'reputation', { ascending: false })
      .limit(limit);

    setUsers(data || []);
    setIsLoading(false);
  };

  const getMedalIcon = (index) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-300" />;
    if (index === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-xs text-gray-500 w-5 text-center">{index + 1}</span>;
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl animate-pulse">
            <div className="w-5 h-5 bg-white/10 rounded" />
            <div className="w-8 h-8 bg-white/10 rounded-full" />
            <div className="flex-1">
              <div className="h-3 bg-white/10 rounded w-1/3 mb-1" />
              <div className="h-2 bg-white/5 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { key: 'reputation', label: 'Reputación', icon: Star },
          { key: 'reviews', label: 'Reseñas', icon: MessageSquare },
          { key: 'followers', label: 'Seguidores', icon: Heart },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => { setActiveSort(key); setIsLoading(true); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeSort === key
                ? 'bg-gamingOrange text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {users.map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              i < 3 ? 'bg-gamingOrange/5 border border-gamingOrange/10' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex-shrink-0">{getMedalIcon(i)}</div>
            <Link to={`/profile/${u.id}`} className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gamingOrange/20 flex items-center justify-center flex-shrink-0">
                {u.avatar_url ? (
                  <img src={u.avatar_url} alt="" className="w-8 h-8 rounded-full" />
                ) : (
                  <span className="text-xs font-bold text-gamingOrange">
                    {u.display_name?.[0]?.toUpperCase() || '?'}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{u.display_name || 'Anónimo'}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${rankColors[u.rank_title] || rankColors['Novato']}`}>
                    {u.rank_title}
                  </span>
                </div>
              </div>
            </Link>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-black text-gamingOrange">{u.reputation || 0}</p>
              <p className="text-[10px] text-gray-500">pts</p>
            </div>
          </motion.div>
        ))}
      </div>

      {users.length === 0 && (
        <p className="text-gray-500 text-center py-8 text-sm">No hay usuarios en el leaderboard aún</p>
      )}
    </div>
  );
};

export default Leaderboard;
