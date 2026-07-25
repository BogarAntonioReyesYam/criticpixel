import { useState, useEffect } from 'react';
import { MessageSquare, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const ReviewComments = ({ reviewId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('review_comments')
      .select('*, profiles:user_id(display_name, avatar_url)')
      .eq('review_id', reviewId)
      .order('created_at', { ascending: true });
    setComments(data || []);
  };

  useEffect(() => {
    fetchComments();
  }, [reviewId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase.from('review_comments').insert({
      review_id: reviewId,
      user_id: user.id,
      parent_id: replyTo,
      content: newComment,
    });

    if (!error) {
      setNewComment('');
      setReplyTo(null);
      fetchComments();
    }
  };

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `hace ${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `hace ${hrs}h`;
    return `hace ${Math.floor(hrs / 24)}d`;
  };

  const topLevelComments = comments.filter((c) => !c.parent_id);
  const getReplies = (parentId) => comments.filter((c) => c.parent_id === parentId);

  const renderComment = (comment, depth = 0) => {
    const replies = getReplies(comment.id);
    return (
      <motion.div
        key={comment.id}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${depth > 0 ? 'ml-6 pl-4 border-l border-white/10' : ''}`}
      >
        <div className="bg-white/5 rounded-xl p-3 mb-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-gamingOrange/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-gamingOrange">
                {comment.profiles?.display_name?.[0]?.toUpperCase() || '?'}
              </span>
            </div>
            <span className="text-xs font-bold text-white">{comment.profiles?.display_name || 'Anónimo'}</span>
            <span className="text-xs text-gray-500">{timeAgo(comment.created_at)}</span>
          </div>
          <p className="text-sm text-gray-300 whitespace-pre-wrap">{comment.content}</p>
          {user && (
            <button
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="text-xs text-gamingOrange hover:text-gamingOrange/80 mt-1 font-bold"
            >
              {replyTo === comment.id ? 'Cancelar' : 'Responder'}
            </button>
          )}
        </div>
        {replies.map((r) => renderComment(r, depth + 1))}
      </motion.div>
    );
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gamingOrange transition-colors"
      >
        <MessageSquare className="w-3 h-3" />
        {comments.length} comentario{comments.length !== 1 ? 's' : ''}
        {showComments ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2"
          >
            {topLevelComments.map((c) => renderComment(c))}

            {user ? (
              <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
                {replyTo && (
                  <span className="text-xs text-gamingOrange self-center">Respondiendo...</span>
                )}
                <input
                  type="text"
                  placeholder="Escribe un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gamingOrange/50"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="p-1.5 text-gamingOrange hover:text-gamingOrange/80 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <p className="text-xs text-gray-500">Inicia sesión para comentar</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewComments;
