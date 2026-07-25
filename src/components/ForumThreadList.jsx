import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus, Pin, Lock, Eye, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const ForumThreadList = ({ gameId }) => {
  const { user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(true);

  const fetchThreads = async () => {
    const { data } = await supabase
      .from('forum_threads')
      .select('*, profiles:user_id(display_name, avatar_url)')
      .eq('game_id', gameId)
      .order('is_pinned', { ascending: false })
      .order('last_reply_at', { ascending: false });
    setThreads(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchThreads();
  }, [gameId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newThread.title.trim() || !newThread.content.trim()) return;

    const { error } = await supabase.from('forum_threads').insert({
      game_id: gameId,
      user_id: user.id,
      title: newThread.title,
      content: newThread.content,
    });

    if (!error) {
      setNewThread({ title: '', content: '' });
      setShowForm(false);
      fetchThreads();
    }
  };

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `hace ${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `hace ${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `hace ${days}d`;
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
            <div className="h-3 bg-white/5 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gamingOrange" />
          Foro de Discusión ({threads.length})
        </h3>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1 text-xs font-bold text-gamingOrange hover:text-gamingOrange/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Hilo
          </button>
        )}
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSubmit}
          className="bg-white/5 rounded-xl p-4 mb-4 space-y-3"
        >
          <input
            type="text"
            placeholder="Título del hilo..."
            value={newThread.title}
            onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50"
          />
          <textarea
            placeholder="Contenido..."
            value={newThread.content}
            onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50 resize-none"
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold bg-gamingOrange text-white rounded-lg hover:bg-gamingOrange/80 transition-colors"
            >
              Publicar
            </button>
          </div>
        </motion.form>
      )}

      {threads.length === 0 ? (
        <p className="text-gray-500 text-center py-8 text-sm">No hay hilos de discusión aún. ¡Sé el primero!</p>
      ) : (
        <div className="space-y-2">
          {threads.map((thread) => (
            <Link
              key={thread.id}
              to={`/forum/${thread.id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
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
                  <span>{thread.profiles?.display_name || 'Anónimo'}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {thread.views_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> {thread.replies_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {timeAgo(thread.last_reply_at)}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gamingOrange transition-colors" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumThreadList;
