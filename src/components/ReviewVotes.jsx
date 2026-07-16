import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const ReviewVotes = ({ reviewId, likesCount = 0, dislikesCount = 0 }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(likesCount);
  const [dislikes, setDislikes] = useState(dislikesCount);
  const [userVote, setUserVote] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchUserVote = async () => {
      const { data } = await supabase
        .from('review_votes')
        .select('vote_type')
        .eq('review_id', reviewId)
        .eq('user_id', user.id)
        .single();

      if (data) setUserVote(data.vote_type);
    };

    fetchUserVote();
  }, [reviewId, user]);

  const handleVote = async (voteType) => {
    if (!user || isUpdating) return;

    setIsUpdating(true);
    const wasVote = userVote;
    const newVote = wasVote === voteType ? null : voteType;

    if (wasVote) {
      await supabase
        .from('review_votes')
        .delete()
        .eq('review_id', reviewId)
        .eq('user_id', user.id);

      if (wasVote === 'like') setLikes(prev => prev - 1);
      else setDislikes(prev => prev - 1);
    }

    if (newVote) {
      const { error } = await supabase
        .from('review_votes')
        .insert({
          review_id: reviewId,
          user_id: user.id,
          vote_type: newVote,
        });

      if (!error) {
        if (newVote === 'like') setLikes(prev => prev + 1);
        else setDislikes(prev => prev + 1);
      }
    }

    setUserVote(newVote);
    setIsUpdating(false);
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleVote('like')}
        disabled={isUpdating}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          userVote === 'like'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-white/5 text-gray-500 hover:text-green-400 hover:bg-green-500/10 border border-transparent'
        }`}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
        {likes > 0 && likes}
      </button>
      <button
        onClick={() => handleVote('dislike')}
        disabled={isUpdating}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          userVote === 'dislike'
            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : 'bg-white/5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent'
        }`}
      >
        <ThumbsDown className="w-3.5 h-3.5" />
        {dislikes > 0 && dislikes}
      </button>
    </div>
  );
};

export default ReviewVotes;
