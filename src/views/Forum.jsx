import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus, Pin, Lock, Eye, Clock, ChevronRight, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import useSEO from '../hooks/useSEO';

const Forum = () => {
  useSEO({ title: 'Foro', description: 'Foro de discusión de CriticPixel' });
  const { user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchThreads = async () => {
    const { data, error } = await supabase
      .from('forum_threads')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('last_reply_at', { ascending: false });
    if (error) { console.error('Forum fetch error:', error); setIsLoading(false); return; }

    if (data && data.length > 0) {
      const userIds = [...new Set(data.map(t => t.user_id))];
      const gameIds = [...new Set(data.map(t => t.game_id).filter(Boolean))];
      const [{ data: profiles }, { data: games }] = await Promise.all([
        userIds.length ? supabase.from('profiles').select('id, display_name, avatar_url').in('id', userIds) : { data: [] },
        gameIds.length ? supabase.from('games').select('id, title').in('id', gameIds) : { data: [] },
      ]);
      const profilesMap = Object.fromEntries((profiles || []).map(p => [p.id, p]));
      const gamesMap = Object.fromEntries((games || []).map(g => [g.id, g]));
      data.forEach(t => { t.profiles = profilesMap[t.user_id] || null; t.games = gamesMap[t.game_id] || null; });
    }

    setThreads(data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchThreads(); }, []);

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `hace ${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `hace ${hrs}h`;
    return `hace ${Math.floor(hrs / 24)}d`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-gamingOrange" />
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">Foro <span className="text-gamingOrange">Discusión</span></h1>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gamingCard rounded-xl p-4 border border-white/5 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
              <div className="h-3 bg-white/5 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : threads.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500">No hay hilos de discusión aún</p>
          <p className="text-xs text-gray-600 mt-1">Los hilos aparecen cuando publicas en el foro de un juego</p>
        </div>
      ) : (
        <div className="space-y-2">
          {threads.map((thread) => (
            <Link
              key={thread.id}
              to={`/forum/${thread.id}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-gamingCard border border-white/5 hover:border-gamingOrange/20 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {thread.is_pinned && <Pin className="w-3 h-3 text-gamingOrange" />}
                  {thread.is_locked && <Lock className="w-3 h-3 text-red-400" />}
                  <p className="font-bold text-white text-sm truncate group-hover:text-gamingOrange transition-colors">
                    {thread.title}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="font-bold text-gamingOrange/70">{thread.profiles?.display_name || 'Anónimo'}</span>
                  {thread.games && (
                    <span className="flex items-center gap-1 text-purple-400">
                      <Gamepad2 className="w-3 h-3" /> {thread.games.title}
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {thread.views_count}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {thread.replies_count}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(thread.last_reply_at)}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gamingOrange transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forum;
