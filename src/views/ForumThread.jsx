import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Eye, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import useSEO from '../hooks/useSEO';

const ForumThread = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useSEO({
    title: thread?.title || 'Hilo del Foro',
    description: thread?.content?.substring(0, 160) || 'Discusión en el foro de CriticPixel',
  });

  const fetchThread = async () => {
    const { data: threadData } = await supabase
      .from('forum_threads')
      .select('*, profiles:user_id(display_name, avatar_url)')
      .eq('id', id)
      .single();

    if (threadData) {
      setThread(threadData);
      await supabase.from('forum_threads').update({ views_count: threadData.views_count + 1 }).eq('id', id);
    }

    const { data: repliesData } = await supabase
      .from('forum_replies')
      .select('*, profiles:user_id(display_name, avatar_url)')
      .eq('thread_id', id)
      .order('created_at', { ascending: true });

    setReplies(repliesData || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchThread();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const { error } = await supabase.from('forum_replies').insert({
      thread_id: id,
      user_id: user.id,
      content: newReply,
    });

    if (!error) {
      setNewReply('');
      fetchThread();
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-2/3" />
          <div className="h-4 bg-white/5 rounded w-1/3" />
          <div className="h-20 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Hilo no encontrado</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to={-1} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gamingOrange transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Volver
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gamingCard rounded-2xl border border-white/5 shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-black text-white mb-2">{thread.title}</h1>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="font-bold text-gamingOrange">{thread.profiles?.display_name || 'Anónimo'}</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {thread.views_count}</span>
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {thread.replies_count}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(thread.created_at)}</span>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{thread.content}</p>
        </div>
      </motion.div>

      <div className="mt-8">
        <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gamingOrange" />
          Respuestas ({replies.length})
        </h3>

        <div className="space-y-3">
          {replies.map((reply) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-4 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gamingOrange/20 flex items-center justify-center flex-shrink-0">
                  {reply.profiles?.avatar_url ? (
                    <img src={reply.profiles.avatar_url} alt="" className="w-8 h-8 rounded-full" />
                  ) : (
                    <span className="text-xs font-bold text-gamingOrange">
                      {reply.profiles?.display_name?.[0]?.toUpperCase() || '?'}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{reply.profiles?.display_name || 'Anónimo'}</p>
                  <p className="text-xs text-gray-500">{timeAgo(reply.created_at)}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm whitespace-pre-wrap">{reply.content}</p>
            </motion.div>
          ))}
        </div>

        {user ? (
          <form onSubmit={handleReply} className="mt-6 bg-white/5 rounded-xl p-4 border border-white/5">
            <textarea
              placeholder="Escribe tu respuesta..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50 resize-none mb-3"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newReply.trim()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-gamingOrange text-white rounded-lg hover:bg-gamingOrange/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" /> Responder
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-500 text-center py-6 text-sm">
            <Link to="/login" className="text-gamingOrange hover:underline">Inicia sesión</Link> para responder.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForumThread;
